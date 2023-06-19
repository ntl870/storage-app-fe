import {
  CloudDownloadOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  FolderFilled,
  ShareAltOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { faArrowTurnRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAlert } from "@hooks/useAlert";
import { downloadURI } from "@utils/tools";
import {
  Col,
  Dropdown,
  MenuProps,
  Row,
  Tooltip,
  Typography,
  message,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {
  Folder,
  useMakeCopyOfFolderMutation,
  useMoveFolderToTrashMutation,
  useStarFolderMutation,
  useUnstarFolderMutation,
} from "../../../generated/schemas";
import { MoveToFolderModal } from "./MoveToFolderModal";
import { RenameFolderModal } from "./RenameFolderModal";
import { ShareFolderModal } from "./ShareFolderModal";

export const StyledItem = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const { Text } = Typography;

interface Props {
  folders: Folder[];
  handleClickFolder?: (item: Folder) => void;
  selectedItem: (Folder & { type: "folder" | "file" }) | null;
  refetch: () => Promise<any>;
  isStarred?: boolean;
}

export const FolderSection = ({
  folders,
  selectedItem,
  handleClickFolder,
  refetch,
  isStarred,
}: Props) => {
  const [moveFolderToTrash] = useMoveFolderToTrashMutation();
  const [makeCopyOfFolder] = useMakeCopyOfFolderMutation();
  const { showErrorNotification, showSuccessNotification } = useAlert();
  const [shareModalFolder, setShareModalFolder] = useState<Folder | null>(null);
  const [currentRenameFolder, setCurrentRenameFolder] = useState<Folder | null>(
    null
  );
  const [currentMoveToFolder, setCurrentMoveToFolder] = useState<Folder | null>(
    null
  );
  const [starFolder] = useStarFolderMutation();
  const [unstarFolder] = useUnstarFolderMutation();

  const getItems = (item: Folder): MenuProps["items"] => [
    {
      label: "Download",
      key: "1",
      icon: <CloudDownloadOutlined />,
      onClick: () => {
        downloadURI(String(item.ID), "folders", item.name);
      },
    },
    ...(!isStarred
      ? [
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
                await refetch();
                showSuccessNotification("Folder moved to trash successfully");
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
          {
            label: "Add to starred",
            key: "4",
            icon: <StarOutlined />,
            onClick: async () => {
              try {
                await starFolder({
                  variables: {
                    folderID: item.ID,
                  },
                });
                await refetch();
                showSuccessNotification("Folder added to starred successfully");
              } catch (err) {
                showErrorNotification((err as Error).message);
              }
            },
          },
          {
            label: "Rename",
            key: "5",
            icon: <EditOutlined />,
            onClick: async () => {
              setCurrentRenameFolder(item);
            },
          },
          {
            label: "Make a copy",
            key: "6",
            icon: <CopyOutlined />,
            onClick: async () => {
              try {
                const { data } = await makeCopyOfFolder({
                  variables: {
                    folderID: item.ID,
                  },
                });
                if (data?.makeCopyOfFolder) {
                  await refetch();
                  showSuccessNotification(data?.makeCopyOfFolder);
                }
              } catch (err) {
                showErrorNotification((err as Error).message);
              }
            },
          },
          {
            label: "Move to",
            key: "7",
            icon: <FontAwesomeIcon icon={faArrowTurnRight} />,
            onClick: async () => {
              setCurrentMoveToFolder(item);
            },
          },
        ]
      : []),
    ...(isStarred
      ? [
          {
            label: "Remove from starred",
            key: "5",
            icon: <StarOutlined />,
            onClick: async () => {
              try {
                const { data } = await unstarFolder({
                  variables: {
                    folderID: item.ID,
                  },
                });
                showSuccessNotification(data?.unstarFolder || "");
                refetch();
              } catch (err) {
                showErrorNotification((err as Error).message);
              }
            },
          },
        ]
      : []),
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
              <Tooltip title={folder.name}>
                <StyledItem
                  className={`p-3 flex flex-row items-center min-w-[17rem] max-w-[17rem] ${
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
              </Tooltip>
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
      {!!currentRenameFolder && (
        <RenameFolderModal
          open={!!currentRenameFolder}
          selectedFolder={currentRenameFolder}
          refetch={refetch}
          handleClose={() => setCurrentRenameFolder(null)}
        />
      )}
      {!!currentMoveToFolder && (
        <MoveToFolderModal
          open={!!currentMoveToFolder}
          movingFolderID={currentMoveToFolder.ID}
          handleClose={() => setCurrentMoveToFolder(null)}
          refetch={refetch}
        />
      )}
    </>
  );
};
