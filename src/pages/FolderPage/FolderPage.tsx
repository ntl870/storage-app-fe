import useRouter from "@hooks/useRouter";
import {
  useGetUserFoldersQuery,
  Folder,
  useGetFilesByFolderQuery,
  File as FileSchema,
  useCreateFolderMutation,
  useUploadFileMutation,
  useUploadFolderMutation,
} from "@generated/schemas";
import {
  Button,
  Dropdown,
  Input,
  InputRef,
  MenuProps,
  Modal,
  Typography,
} from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { FileSection } from "./components/FileSection";
import useCurrentUser from "@hooks/useCurrentUser";
import { FolderSection } from "./components/FolderSection";
import {
  FolderAddFilled,
  UploadOutlined,
  FolderOpenFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { groupFilesByFolder } from "@utils/tools";

type SelectedItemType =
  | ((Folder | FileSchema) & { type: "file" | "folder" })
  | null;

export const FolderPage = () => {
  const { params, navigate } = useRouter();
  const { rootFolderID } = useCurrentUser();
  const [isShownNewFolderDialog, setIsShownNewFolderDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SelectedItemType>(null);
  const createFolderInputRef = useRef<InputRef>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const [uploadFolder] = useUploadFolderMutation();

  const [createFolder, { loading: createFolderLoading }] =
    useCreateFolderMutation({
      onCompleted: () => {
        setIsShownNewFolderDialog(false);
        refetchFolders();
      },
    });

  const [uploadFile] = useUploadFileMutation();

  const currentFolderID = useMemo(
    () => params.folderID || rootFolderID || "",
    [params.folderID, rootFolderID]
  );

  const { data: foldersData, refetch: refetchFolders } = useGetUserFoldersQuery(
    {
      variables: {
        folderID: currentFolderID,
      },
      skip: !currentFolderID,
      fetchPolicy: "network-only",
    }
  );

  const { data: filesData, refetch: refetchFiles } = useGetFilesByFolderQuery({
    variables: {
      folderID: currentFolderID,
    },
    skip: !currentFolderID,
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
    setSelectedItem({ ...item, type: "folder" });
  };

  const handleClickFile = (item: FileSchema | null) => {
    if (selectedItem && selectedItem.ID === item?.ID) {
      return;
    }
    setSelectedItem({ ...item, type: "file" } as SelectedItemType);
  };

  const handleUploadFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      event.preventDefault();
      const file = event?.target?.files?.[0];
      await uploadFile({
        variables: { file: file, folderID: currentFolderID },
      });
      refetchFolders();
      refetchFiles();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUploadFolder = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const files = event?.target?.files;
      await uploadFolder({
        variables: {
          input: {
            rootFolderID: currentFolderID,
            folder: groupFilesByFolder(files as unknown as File[])[0],
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addMenuItems: MenuProps["items"] = useMemo(
    () => [
      {
        label: "New Folder",
        key: "0",
        icon: <FolderAddFilled />,
        onClick: () => {
          setIsShownNewFolderDialog(true);
        },
      },
      {
        type: "divider",
      },
      {
        label: "Upload File",
        key: "1",
        icon: <UploadOutlined />,
        onClick: () => {
          fileInputRef.current?.click();
        },
      },
      {
        label: "Upload Folder",
        key: "3",
        icon: <FolderOpenFilled />,
        onClick: () => {
          folderInputRef.current?.click();
        },
      },
    ],
    []
  );

  const onOkCreateFolder = async () => {
    try {
      await createFolder({
        variables: {
          input: {
            name: createFolderInputRef.current?.input?.value || "",
            rootFolderID: params.folderID || rootFolderID || "",
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelCreateFolderModal = () => {
    setIsShownNewFolderDialog(false);
  };

  useEffect(() => {
    if (folderInputRef.current !== null) {
      folderInputRef.current.setAttribute("directory", "");
      folderInputRef.current.setAttribute("webkitdirectory", "");
    }
  }, [folderInputRef]);

  return (
    <div className="flex flex-col pt-5">
      <div className="ml-4">
        <Dropdown menu={{ items: addMenuItems }} trigger={["click"]}>
          <Button className="" size="large">
            <PlusOutlined />
            Add
          </Button>
        </Dropdown>
      </div>

      {!!foldersData?.getUserFolders.length && (
        <Typography.Text className="inline-block p-4 font-semibold">
          Folders
        </Typography.Text>
      )}

      <FolderSection
        folders={(foldersData?.getUserFolders as Folder[]) || []}
        handleClickFolder={handleClickFolder}
        selectedItem={selectedItem as Folder & { type: "file" | "folder" }}
        refetch={refetchFolders}
      />

      {!!filesData?.getFilesByFolder.length && (
        <Typography.Text className="inline-block p-4 font-semibold">
          Files
        </Typography.Text>
      )}

      <FileSection
        files={(filesData?.getFilesByFolder as FileSchema[]) || []}
        handleClickItem={handleClickFile}
        selectedItem={selectedItem as FileSchema & { type: "file" | "folder" }}
        isFilterTrash={false}
        refetch={refetchFiles}
      />
      {isShownNewFolderDialog && (
        <Modal
          title="Create Folder"
          open={isShownNewFolderDialog}
          onOk={onOkCreateFolder}
          confirmLoading={createFolderLoading}
          onCancel={handleCancelCreateFolderModal}
        >
          <Input
            size="large"
            placeholder="Enter folder name"
            allowClear
            ref={createFolderInputRef}
          />
        </Modal>
      )}
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleUploadFile}
      />
      <input
        type="file"
        className="hidden"
        ref={folderInputRef}
        multiple
        onChange={handleUploadFolder}
      />
    </div>
  );
};
