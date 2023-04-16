import {
  Folder,
  File,
  useGetUserTrashFilesQuery,
  useGetUserTrashFolderQuery,
  useEmptyUserTrashMutation,
} from "@generated/schemas";
import { Button, Empty, Modal, Typography } from "antd";
import { useState } from "react";
import { TrashFileSection } from "./components/TrashFileSection";
import { TrashFolderSection } from "./components/TrashFolderSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "@hooks/useAlert";

export const Trash = () => {
  const { showErrorNotification, showSuccessNotification } = useAlert();
  const [isShowEmptyTrashConfirmModal, setIsShowEmptyTrashConfirmModal] =
    useState(false);

  const [emptyTrash] = useEmptyUserTrashMutation();
  const { data: foldersData, refetch: refetchFolders } =
    useGetUserTrashFolderQuery({
      fetchPolicy: "network-only",
    });

  const { data: filesData, refetch: refetchFiles } = useGetUserTrashFilesQuery({
    fetchPolicy: "network-only",
  });
  const [selectedItem, setSelectedItem] = useState<Folder | File | null>(null);

  const handleClickFile = (item: File | null) => {
    if (selectedItem && selectedItem.ID === item?.ID) {
      return;
    }
    setSelectedItem(item);
  };

  const handleEmptyTrash = async () => {
    try {
      const { data } = await emptyTrash();
      await refetchFolders();
      await refetchFiles();
      if (data?.emptyUserTrash) {
        showSuccessNotification(data?.emptyUserTrash);
        setIsShowEmptyTrashConfirmModal(false);
      }
    } catch (err) {
      showErrorNotification((err as Error).message);
    }
  };

  return (
    <>
      <div className="bg-gray-200 m-4 px-4 py-2 flex justify-between items-center rounded-xl">
        <Typography.Text>Trash</Typography.Text>
        <Button
          type="text"
          onClick={() => setIsShowEmptyTrashConfirmModal(true)}
        >
          Empty Trash
        </Button>
      </div>
      {!!foldersData?.getUserTrashFolder.length && (
        <Typography.Text className="inline-block p-4 font-semibold">
          Folders
        </Typography.Text>
      )}

      <TrashFolderSection
        folders={(foldersData?.getUserTrashFolder as Folder[]) || []}
        selectedItem={selectedItem as Folder}
        refetch={refetchFolders}
      />
      {!!filesData?.getUserTrashFiles.length && (
        <Typography.Text className="inline-block p-4 font-semibold">
          Files
        </Typography.Text>
      )}

      <TrashFileSection
        files={(filesData?.getUserTrashFiles as File[]) || []}
        handleClickItem={handleClickFile}
        selectedItem={selectedItem}
        refetch={refetchFiles}
      />

      {!foldersData?.getUserTrashFolder.length &&
        !filesData?.getUserTrashFiles.length && (
          <div className="h-full flex justify-center items-center">
            <Empty
              description="Trash is empty"
              image={
                <FontAwesomeIcon
                  icon={faTrashCan}
                  style={{ color: "#1264f3" }}
                />
              }
            />
          </div>
        )}

      {isShowEmptyTrashConfirmModal && (
        <Modal
          onOk={handleEmptyTrash}
          onCancel={() => setIsShowEmptyTrashConfirmModal(false)}
          open={isShowEmptyTrashConfirmModal}
          title="Confirm Empty Trash"
        >
          <div className="flex justify-center items-center">
            <Typography.Text className="">Are you sure?</Typography.Text>
          </div>
        </Modal>
      )}
    </>
  );
};
