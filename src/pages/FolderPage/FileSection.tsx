import { FileFilled } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
import ItemCard from "../../components/ItemCard";
import ItemCardContent from "../../components/ItemCardContent";
import { File, Folder } from "../../generated/schemas";

interface Props {
  files: File[];
  selectedItem: Folder | File | null;
  handleClickItem: (file: File | null) => void;
}

export const FileSection = ({
  files,
  handleClickItem,
  selectedItem,
}: Props) => {
  return (
    <Row className="ml-7">
      {files.map((file) => (
        <Col className="m-4" key={file.ID}>
          <ItemCard
            cover={<FileFilled className="text-7xl mt-6" />}
            className="w-60"
            onClick={() => handleClickItem(file as File)}
          >
            <ItemCardContent
              className={`${selectedItem?.ID === file.ID ? "bg-blue-100" : ""}`}
            >
              <Typography.Text className="w-full font-semibold pointer-events-none truncate inline-block">
                {file.name}
              </Typography.Text>
            </ItemCardContent>
          </ItemCard>
        </Col>
      ))}
    </Row>
  );
};
