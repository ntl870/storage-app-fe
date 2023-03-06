import {
  Folder,
  File,
  useGetUserTrashFilesQuery,
  useGetUserTrashFolderQuery,
} from "@generated/schemas";
import { Typography } from "antd";
import { useState } from "react";
import { TrashFileSection } from "./components/TrashFileSection";
import { TrashFolderSection } from "./components/TrashFolderSection";

export const Trash = () => {
  const { data: foldersData, refetch: refetchFolders } =
    useGetUserTrashFolderQuery({
      fetchPolicy: "network-only",
    });

  const { data: filesData, refetch: refetchFiles } = useGetUserTrashFilesQuery({
    fetchPolicy: "network-only",
  });
  const [selectedItem, setSelectedItem] = useState<Folder | File | null>(null);

  if (!foldersData?.getUserTrashFolder) {
    return <div>Empty</div>;
  }

  const handleClickFile = (item: File | null) => {
    if (selectedItem && selectedItem.ID === item?.ID) {
      return;
    }
    setSelectedItem(item);
  };

  return (
    <>
      <Typography.Text className="inline-block p-4 font-semibold">
        Folders
      </Typography.Text>
      <TrashFolderSection
        folders={(foldersData?.getUserTrashFolder as Folder[]) || []}
        // handleClickFolder={handleClickFolder}
        selectedItem={selectedItem as Folder}
        refetch={refetchFolders}
      />
      <Typography.Text className="inline-block p-4 font-semibold">
        Files
      </Typography.Text>
      <TrashFileSection
        files={(filesData?.getUserTrashFiles as File[]) || []}
        handleClickItem={handleClickFile}
        selectedItem={selectedItem}
        refetch={refetchFiles}
      />
    </>
  );
};
