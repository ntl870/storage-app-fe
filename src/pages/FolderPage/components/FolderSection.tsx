import {
  CloudDownloadOutlined,
  DeleteOutlined,
  FolderFilled,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Row, Col, Typography, Dropdown, MenuProps } from "antd";
import {
  Folder,
  useMoveFolderToTrashMutation,
} from "../../../generated/schemas";
import styled from "styled-components";
import { downloadURI } from "@utils/tools";
import { useMemo, useState } from "react";
import { useAlert } from "@hooks/useAlert";
import { ShareFolderModal } from "./ShareFolderModal";

const StyledItem = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const { Text } = Typography;

interface Props {
  folders: Folder[];
  handleClickFolder?: (item: Folder) => void;
  selectedItem: (Folder & { type: "folder" | "file" }) | null;
  refetch: () => void;
}

export const FolderSection = ({
  folders,
  selectedItem,
  handleClickFolder,
  refetch,
}: Props) => {
  const [moveFolderToTrash] = useMoveFolderToTrashMutation();
  const { showErrorNotification, showSuccessNotification } = useAlert();
  const [shareModalFolder, setShareModalFolder] = useState<Folder | null>(null);

  const getItems = (item: Folder): MenuProps["items"] => [
    {
      label: "Download",
      key: "1",
      icon: <CloudDownloadOutlined />,
      onClick: () => {
        downloadURI(String(item.ID), "folders", item.name);
      },
    },
    {
      label: "Move to trash",
      key: "2",
      icon: <DeleteOutlined />,
      onClick: async () => {
        try {
          await moveFolderToTrash({
            variables: {
              folderID: item.ID,
            },
          });
          showSuccessNotification("Folder moved to trash successfully");
          refetch();
        } catch (err) {
          showErrorNotification((err as Error).message);
        }
      },
    },
    {
      label: "Share this folder",
      key: "3",
      icon: <ShareAltOutlined />,
      onClick: () => {
        setShareModalFolder(item);
      },
    },
  ];

  const handleCloseShareFolderModal = () => {
    setShareModalFolder(null);
  };

  const filteredFolders = useMemo(
    () => folders.filter((folder) => !folder.isTrash),
    [folders]
  );

  return (
    <>
      <Row className="ml-7">
        {filteredFolders?.map((folder) => (
          <Dropdown
            menu={{ items: getItems(folder) }}
            key={folder.ID}
            trigger={["contextMenu"]}
          >
            <Col className="m-4">
              <StyledItem
                className={`p-3 flex flex-row items-center min-w-56 max-w-56 ${
                  selectedItem?.ID === folder.ID &&
                  selectedItem.type === "folder"
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
      {!!shareModalFolder && (
        <ShareFolderModal
          open={!!shareModalFolder}
          handleClose={handleCloseShareFolderModal}
          folder={shareModalFolder}
        />
      )}
    </>
  );
};
