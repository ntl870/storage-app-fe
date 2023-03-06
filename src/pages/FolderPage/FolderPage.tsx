import useRouter from "@hooks/useRouter";
import {
  useGetUserFoldersQuery,
  Folder,
  useGetFilesByFolderQuery,
  File,
} from "@generated/schemas";
import { Typography } from "antd";
import { useState } from "react";
import { FileSection } from "./components/FileSection";
import useCurrentUser from "@hooks/useCurrentUser";
import { FolderSection } from "./components/FolderSection";

export const FolderPage = () => {
  const { params, navigate } = useRouter();
  const { rootFolderID } = useCurrentUser();
  const [selectedItem, setSelectedItem] = useState<Folder | File | null>(null);

  const { data: foldersData, refetch: refetchFolders } = useGetUserFoldersQuery(
    {
      variables: {
        folderID: params.folderID || rootFolderID || "",
      },
      skip: !params.folderID && !rootFolderID,
      fetchPolicy: "network-only",
    }
  );

  const { data: filesData, refetch: refetchFiles } = useGetFilesByFolderQuery({
    variables: {
      folderID: params.folderID || rootFolderID || "",
    },
    skip: !params.folderID && !rootFolderID,
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
    setSelectedItem(item);
  };

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
      <FolderSection
        folders={(foldersData?.getUserFolders as Folder[]) || []}
        handleClickFolder={handleClickFolder}
        selectedItem={selectedItem as Folder}
        refetch={refetchFolders}
      />
      <Typography.Text className="inline-block p-4 font-semibold">
        Files
      </Typography.Text>
      <FileSection
        files={(filesData?.getFilesByFolder as File[]) || []}
        handleClickItem={handleClickFile}
        selectedItem={selectedItem}
        isFilterTrash={false}
        refetch={refetchFiles}
      />
    </>
  );
};
