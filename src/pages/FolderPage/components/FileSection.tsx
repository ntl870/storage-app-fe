import { CloudDownloadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Col, Dropdown, MenuProps, Row, Typography, Image, Modal } from "antd";
import ItemCard from "@components/FileCard";
import ItemCardContent from "@components/FileCardContent";
import { File, useMoveFileToTrashMutation } from "@generated/schemas";
import { downloadURI, getFileURL, renderIconByFileType } from "@utils/tools";
import { useMemo, useState } from "react";
import { useAlert } from "@hooks/useAlert";
import { Document, Page } from "react-pdf/dist/esm/entry.vite";

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
  const { showSuccessNotification, showErrorNotification } = useAlert();
  const [moveFileToTrash] = useMoveFileToTrashMutation();
  const [previewModalVisible, setPreviewModalVisible] = useState(false);

  const handlePreviewClick = () => {
    setPreviewModalVisible(true);
  };

  const handleClosePreviewModal = () => {
    setPreviewModalVisible(false);
  };

  const renderPreview = () => {
    const url = getFileURL(selectedItem?.ID);
    if (selectedItem?.fileType === "png" || selectedItem?.fileType === "jpg") {
      return <Image src={url} preview={false} />;
    }
    if (selectedItem?.fileType === "pdf") {
      return (
        <div className="flex justify-center">
          <Document file={url}>
            <Page pageNumber={1} renderTextLayer={false} />
          </Document>
        </div>
      );
    }
    return null;
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
                cover={
                  renderIconByFileType(file)
                  // <FileFilled className="text-7xl mt-6" />
                }
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
      {previewModalVisible && (
        <Modal
          open={previewModalVisible}
          onCancel={handleClosePreviewModal}
          footer={null}
          width={selectedItem?.fileType === "pdf" ? "100%" : undefined}
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          {renderPreview()}
        </Modal>
      )}
    </>
  );
};
