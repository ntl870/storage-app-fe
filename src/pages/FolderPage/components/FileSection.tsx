import { FileFilled } from "@ant-design/icons";
import { Col, Dropdown, MenuProps, Row, Typography } from "antd";
import ItemCard from "@components/FileCard";
import ItemCardContent from "@components/FileCardContent";
import { File, Folder } from "@generated/schemas";
import { downloadURI } from "@utils/tools";

interface Props {
  files: File[];
  selectedItem: Folder | File | null;
  handleClickItem: (file: File | null) => void;
}

const getItems = (item: File): MenuProps["items"] => [
  {
    label: "Download",
    key: "1",
    onClick: () => {
      downloadURI(String(item.ID), "files");
    },
  },
];

export const FileSection = ({
  files,
  handleClickItem,
  selectedItem,
}: Props) => {
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
