import {
  CloudDownloadOutlined,
  CopyOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  StarOutlined,
} from "@ant-design/icons";
import ItemCard from "@components/FileCard";
import ItemCardContent from "@components/FileCardContent";
import {
  File,
  GetFilesByFolderQuery,
  useMakeCopyOfFolderMutation,
  useMoveFileToTrashMutation,
  useStarFileMutation,
  useUnstarFileMutation,
} from "@generated/schemas";
import { useAlert } from "@hooks/useAlert";
import useRouter from "@hooks/useRouter";
import { downloadURI, renderIconByFileType } from "@utils/tools";
import { Col, Dropdown, MenuProps, Row, Typography } from "antd";
import { useMemo, useState } from "react";
import { ShareFileModal } from "./ShareFileModal";
import { ApolloQueryResult } from "@apollo/client";

interface Props {
  files: File[];
  selectedItem: (File & { type: "file" | "folder" }) | null;
  handleClickItem: (file: File | null) => void;
  isFilterTrash?: boolean;
  refetch: () => Promise<any>;
  isStarred?: boolean;
}

export const FileSection = ({
  files,
  handleClickItem,
  selectedItem,
  refetch,
  isStarred,
}: Props) => {
  const { navigate } = useRouter();
  const { showSuccessNotification, showErrorNotification } = useAlert();
  const [moveFileToTrash] = useMoveFileToTrashMutation();
  const [starFile] = useStarFileMutation();
  const [unstarFile] = useUnstarFileMutation();
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
    ...(!isStarred
      ? [
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
                await refetch();
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
          {
            label: "Star this file",
            key: "4",
            icon: <StarOutlined />,
            onClick: async () => {
              try {
                const { data } = await starFile({
                  variables: {
                    fileID: item.ID,
                  },
                });
                if (data?.starFile) {
                  await refetch();
                  showSuccessNotification(data?.starFile);
                }
              } catch (err) {
                showErrorNotification((err as Error).message);
              }
            },
          },
        ]
      : []),
    ...(isStarred
      ? [
          {
            label: "Un-star this file",
            key: "4",
            icon: <StarOutlined />,
            onClick: async () => {
              try {
                const { data } = await unstarFile({
                  variables: {
                    fileID: item.ID,
                  },
                });
                if (data?.unstarFile) {
                  await refetch();
                  showSuccessNotification(data?.unstarFile);
                }
              } catch (err) {
                showErrorNotification((err as Error).message);
              }
            },
          },
        ]
      : []),
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
                className="w-[17rem]"
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
