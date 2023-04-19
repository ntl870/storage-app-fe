import {
  useGetUserSharedFoldersQuery,
  useGetUserSharedFilesQuery,
  File as FileSchema,
  Folder,
  useGetStarredFoldersQuery,
  useGetStarredFilesQuery,
} from "@generated/schemas";
import useRouter from "@hooks/useRouter";
import { FileSection } from "@pages/FolderPage/components/FileSection";
import { FolderSection } from "@pages/FolderPage/components/FolderSection";
import { SelectedItemType } from "@pages/SharedFoldersPage/ShareFoldersPage";
import { Spin, Typography } from "antd";
import { useState } from "react";

export const StarredPage = () => {
  const { navigate } = useRouter();
  const [selectedItem, setSelectedItem] = useState<SelectedItemType>(null);

  const {
    data: foldersData,
    loading: getFolderLoading,
    refetch: refetchFolders,
  } = useGetStarredFoldersQuery({
    fetchPolicy: "network-only",
  });

  const {
    data: filesData,
    loading: getFilesLoading,
    refetch: refetchFiles,
  } = useGetStarredFilesQuery({
    fetchPolicy: "network-only",
  });

  const navigateToFolder = (folderID: string) => {
    navigate(`/folder/${folderID}`);
  };

  const handleClickFolder = (item: Folder) => {
    if (selectedItem && selectedItem.ID === item?.ID) {
      navigateToFolder(String(selectedItem.ID));
      return;
    }

    if (!item) {
      setSelectedItem(null);
      return;
    }
    setSelectedItem({ ...item, type: "folder" });
  };

  const handleClickFile = (item: FileSchema | null) => {
    if (selectedItem && selectedItem.ID === item?.ID) {
      return;
    }

    if (!item) {
      setSelectedItem(null);
      return;
    }
    setSelectedItem({ ...item, type: "file" } as SelectedItemType);
  };

  if (getFolderLoading || getFilesLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col pt-5">
        <Typography.Title level={4} className="ml-4 font-normal">
          Shared with me
        </Typography.Title>
        {!!foldersData?.getStarredFolders.length && (
          <Typography.Text className="inline-block p-4 font-semibold">
            Folders
          </Typography.Text>
        )}

        <FolderSection
          folders={(foldersData?.getStarredFolders as Folder[]) || []}
          handleClickFolder={handleClickFolder}
          selectedItem={selectedItem as Folder & { type: "file" | "folder" }}
          refetch={refetchFolders}
        />

        {!!filesData?.getStarredFiles.length && (
          <Typography.Text className="inline-block p-4 font-semibold">
            Files
          </Typography.Text>
        )}

        <FileSection
          files={(filesData?.getStarredFiles as FileSchema[]) || []}
          handleClickItem={handleClickFile}
          selectedItem={
            selectedItem as FileSchema & { type: "file" | "folder" }
          }
          isFilterTrash={false}
          refetch={refetchFiles}
        />
      </div>
    </>
  );
};
