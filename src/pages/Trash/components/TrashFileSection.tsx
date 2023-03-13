import { DeleteOutlined, FileFilled, RedoOutlined } from "@ant-design/icons";
import {
  Folder,
  File,
  useRestoreFileFromTrashMutation,
  useDeleteFileMutation,
} from "@generated/schemas";
import { Row, Dropdown, Col, Typography, MenuProps } from "antd";
import ItemCard from "@components/FileCard";
import ItemCardContent from "@components/FileCardContent";
import { useAlert } from "@hooks/useAlert";

interface Props {
  files: File[];
  selectedItem: Folder | File | null;
  handleClickItem: (file: File | null) => void;
  isFilterTrash?: boolean;
  refetch: () => void;
}

export const TrashFileSection = ({
  files,
  handleClickItem,
  selectedItem,
  refetch,
}: Props) => {
  const { showSuccessNotification, showErrorNotification } = useAlert();
  const [restoreFileFromTrash] = useRestoreFileFromTrashMutation();
  const [deleteFile] = useDeleteFileMutation();

  const getItems = (item: File): MenuProps["items"] => [
    {
      label: "Restore",
      key: "1",
      icon: <RedoOutlined />,
      onClick: async () => {
        try {
          await restoreFileFromTrash({
            variables: {
              fileID: item.ID,
            },
          });
          refetch();
          showSuccessNotification("File restored");
        } catch (err) {
          showErrorNotification((err as Error).message);
        }
      },
    },
    {
      label: "Delete Forever",
      key: "2",
      icon: <DeleteOutlined />,
      onClick: async () => {
        try {
          const { data } = await deleteFile({
            variables: {
              fileID: item.ID,
            },
          });
          refetch();
          showSuccessNotification(data?.deleteFile || "");
        } catch (err) {
          showErrorNotification((err as Error).message);
        }
      },
    },
  ];

  return (
    <Row className="ml-7">
      {files.map((file) => (
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
                  selectedItem?.ID === file.ID ? "bg-blue-100" : ""
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
