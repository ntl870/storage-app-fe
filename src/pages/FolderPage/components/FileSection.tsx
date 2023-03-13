import {
  CloudDownloadOutlined,
  DeleteOutlined,
  FileFilled,
} from "@ant-design/icons";
import { Col, Dropdown, MenuProps, Row, Typography } from "antd";
import ItemCard from "@components/FileCard";
import ItemCardContent from "@components/FileCardContent";
import { File, useMoveFileToTrashMutation } from "@generated/schemas";
import { downloadURI } from "@utils/tools";
import { useMemo } from "react";
import { useAlert } from "@hooks/useAlert";

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

  const getItems = (item: File): MenuProps["items"] => [
    {
      label: "Download",
      key: "1",
      icon: <CloudDownloadOutlined />,
      onClick: () => {
        downloadURI(String(item.ID), "files");
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
    <Row className="ml-7">
      {filteredFiles.map((file) => (
        <Dropdown
          menu={{ items: getItems(file) }}
          key={file.ID}
          trigger={["contextMenu"]}
        >
          <Col className="m-4">
            <ItemCard
              cover={<FileFilled className="text-7xl mt-6" />}
              className="w-60"
              onClick={() => handleClickItem(file as File)}
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
  );
};
