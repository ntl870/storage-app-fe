import { FolderFilled } from "@ant-design/icons";
import { Row, Col, Typography, Dropdown, MenuProps } from "antd";
import { Folder } from "../../generated/schemas";
import styled from "styled-components";
import { downloadURI } from "@utils/tools";

const StyledItem = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const { Text } = Typography;

interface Props {
  folders: Folder[];
  handleClickFolder?: (item: Folder) => void;
  selectedItem: Folder | null;
}

const getItems = (item: Folder): MenuProps["items"] => [
  {
    label: "Download",
    key: "1",
    onClick: () => {
      downloadURI(String(item.ID), "folders");
    },
  },
];

export const FolderSection = ({
  folders,
  selectedItem,
  handleClickFolder,
}: Props) => {
  return (
    <Row className="ml-7">
      {folders?.map((folder) => (
        <Dropdown
          menu={{ items: getItems(folder) }}
          key={folder.ID}
          trigger={["contextMenu"]}
        >
          <Col className="m-4">
            <StyledItem
              className={`p-3 flex flex-row items-center min-w-56 max-w-56 ${
                selectedItem?.ID === folder.ID
                  ? "bg-blue-100"
                  : "bg-white hover:bg-neutral-100"
              }`}
              onClick={() => handleClickFolder?.(folder as Folder)}
            >
              <FolderFilled className="text-xl mr-3 flex items-center" />
              <Text className="inline-block truncate select-none font-semibold">
                {folder.name}
              </Text>
            </StyledItem>
          </Col>
        </Dropdown>
      ))}
    </Row>
  );
};
