import {
  CloudDownloadOutlined,
  DeleteOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import ItemCard from "@components/FileCard";
import ItemCardContent from "@components/FileCardContent";
import { File, useMoveFileToTrashMutation } from "@generated/schemas";
import { useAlert } from "@hooks/useAlert";
import useRouter from "@hooks/useRouter";
import { downloadURI, renderIconByFileType } from "@utils/tools";
import { Col, Dropdown, MenuProps, Row, Typography } from "antd";
import { useMemo, useState } from "react";
import { ShareFileModal } from "./ShareFileModal";

interface Props {
  files: File[];
  selectedItem: (File & { type: "file" | "folder" }) | null;
  handleClickItem: (file: File | null) => void;
  isFilterTrash?: boolean;
  refetch: () => void;
}

export const FileSection = ({
  files,
  handleClickItem,
  selectedItem,
  refetch,
}: Props) => {
  const { navigate } = useRouter();
  const { showSuccessNotification, showErrorNotification } = useAlert();
  const [moveFileToTrash] = useMoveFileToTrashMutation();
  const [shareModalFile, setShareModalFile] = useState<File | null>(null);

  const handlePreviewClick = () => {
    navigate(`/file/${selectedItem?.ID}`);
  };

  const getItems = (item: File): MenuProps["items"] => [
    {
      label: "Download",
      key: "1",
      icon: <CloudDownloadOutlined />,
      onClick: () => {
        downloadURI(String(item.ID), "files", item.name);
      },
    },
    {
      label: "Move to trash",
      key: "2",
      icon: <DeleteOutlined />,
      onClick: async () => {
        try {
          await moveFileToTrash({
            variables: {
              fileID: item.ID,
            },
          });
          refetch();
          showSuccessNotification("File moved to trash");
        } catch (err) {
          showErrorNotification((err as Error).message);
        }
      },
    },
    {
      label: "Share this file",
      key: "3",
      icon: <ShareAltOutlined />,
      onClick: () => {
        setShareModalFile(item);
      },
    },
  ];

  const filteredFiles = useMemo(
    () => files.filter((file) => !file.isTrash),
    [files]
  );

  return (
    <>
      <Row className="ml-7">
        {filteredFiles.map((file) => (
          <Dropdown
            menu={{ items: getItems(file) }}
            key={file.ID}
            trigger={["contextMenu"]}
          >
            <Col className="m-4">
              <ItemCard
                cover={renderIconByFileType(file)}
                className="w-60"
                onClick={() => {
                  if (selectedItem && file.ID === selectedItem.ID) {
                    handlePreviewClick();
                  } else {
                    handleClickItem(file as File);
                  }
                }}
              >
                <ItemCardContent
                  className={`${
                    selectedItem?.ID === file.ID && selectedItem.type === "file"
                      ? "bg-blue-100"
                      : ""
                  }`}
                >
                  <Typography.Text className="w-full font-semibold pointer-events-none truncate inline-block select-none">
                    {file.name}
                  </Typography.Text>
                </ItemCardContent>
              </ItemCard>
            </Col>
          </Dropdown>
        ))}
      </Row>

      {!!shareModalFile && (
        <ShareFileModal
          file={shareModalFile}
          open={!!shareModalFile}
          handleClose={() => setShareModalFile(null)}
        />
      )}
    </>
  );
};
