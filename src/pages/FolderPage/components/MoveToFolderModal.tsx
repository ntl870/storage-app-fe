import { FileOutlined, FolderOutlined, LeftOutlined } from "@ant-design/icons";
import {
  Folder,
  useGetFilesByFolderQuery,
  useGetFoldersOfFolderQuery,
  useMoveFolderMutation,
} from "@generated/schemas";
import { useAlert } from "@hooks/useAlert";
import useCurrentUser from "@hooks/useCurrentUser";
import { Button, List, Modal, Spin } from "antd";
import { useState } from "react";

interface Props {
  open: boolean;
  movingFolderID: string;
  handleClose: () => void;
  refetch: () => void;
}

export const MoveToFolderModal = ({
  open,
  movingFolderID,
  handleClose,
  refetch,
}: Props) => {
  const { showErrorNotification, showSuccessNotification } = useAlert();
  const { rootFolderID, rootFolder } = useCurrentUser();
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(
    rootFolder as Folder
  );

  const [moveFolder] = useMoveFolderMutation();

  const { data: foldersData, loading: getFolderLoading } =
    useGetFoldersOfFolderQuery({
      variables: {
        folderID: selectedFolder?.ID || rootFolderID || "",
      },
      skip: !selectedFolder?.ID && !rootFolderID,
      fetchPolicy: "cache-and-network",
    });

  const { data: filesData, loading: getFilesLoading } =
    useGetFilesByFolderQuery({
      variables: {
        folderID: selectedFolder?.ID || rootFolderID || "",
      },
      skip: !selectedFolder?.ID && !rootFolderID,
      fetchPolicy: "cache-and-network",
    });

  const handleBack = () => {
    if (selectedFolder?.ID === rootFolder?.ID) {
      return;
    }

    setSelectedFolder(selectedFolder?.rootFolder as Folder);
  };

  const handleConfirm = async () => {
    try {
      const { data } = await moveFolder({
        variables: {
          folderID: movingFolderID,
          targetFolderID: selectedFolder?.ID || "",
        },
      });
      showSuccessNotification(data?.moveFolder || "");
      handleClose();
      refetch();
    } catch (err) {
      showErrorNotification((err as Error).message);
    }
  };

  return (
    <Modal
      open={open}
      onOk={handleConfirm}
      onCancel={handleClose}
      closable={false}
      okText="Move"
      title={
        <div>
          {selectedFolder?.ID !== rootFolder?.ID && (
            <Button
              icon={<LeftOutlined />}
              shape="circle"
              className="mr-4"
              onClick={handleBack}
            />
          )}

          {selectedFolder?.ID === rootFolder?.ID
            ? "My Storage"
            : selectedFolder?.name}
        </div>
      }
    >
      {getFolderLoading || getFilesLoading ? (
        <div className="h-[40rem] flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <List
          className="max-h-[40rem] overflow-auto"
          itemLayout="horizontal"
          dataSource={[
            ...(foldersData?.getFoldersOfFolder ?? []),
            ...(filesData?.getFilesByFolder ?? []),
          ]}
          renderItem={(item) => (
            <List.Item>
              <Button
                type="text"
                className="w-full text-left"
                /* 
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment 
                  @ts-ignore */
                disabled={!!item?.fileType}
                /* 
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment 
                  @ts-ignore */
                onClick={() => setSelectedFolder(item)}
              >
                {/* 
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment 
                  @ts-ignore */}
                {item?.fileType ? <FileOutlined /> : <FolderOutlined />}
                {item.name}
              </Button>
            </List.Item>
          )}
        />
      )}
    </Modal>
  );
};
