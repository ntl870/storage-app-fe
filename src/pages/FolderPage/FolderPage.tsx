import useRouter from "@hooks/useRouter";
import {
  useGetFoldersOfFolderQuery,
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
  Empty,
  Input,
  InputRef,
  MenuProps,
  Modal,
  Spin,
  Typography,
  Upload,
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
  InboxOutlined,
} from "@ant-design/icons";
import { groupFilesByFolder } from "@utils/tools";
import NavigateBreadCrumb from "@components/NavigateBreadCrumb";
import { useAlert } from "@hooks/useAlert";
import useIsDraggingFile from "@hooks/useIsDraggingFile";
import FileDragDrop from "@components/FileDragDrop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

type SelectedItemType =
  | ((Folder | FileSchema) & { type: "file" | "folder" })
  | null;

export const FolderPage = () => {
  const { params, navigate } = useRouter();
  const { rootFolderID } = useCurrentUser();
  const isDraggingFile = useIsDraggingFile();
  const { showErrorNotification, showSuccessNotification } = useAlert();
  const [isShownNewFolderDialog, setIsShownNewFolderDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SelectedItemType>(null);
  const [isShowAccessDeniedModal, setIsShowAccessDeniedModal] = useState(false);
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

  const {
    data: foldersData,
    loading: getFolderLoading,
    refetch: refetchFolders,
    error: getFolderError,
  } = useGetFoldersOfFolderQuery({
    variables: {
      folderID: currentFolderID,
    },
    skip: !currentFolderID,
    fetchPolicy: "network-only",
  });

  const {
    data: filesData,
    loading: getFilesLoading,
    refetch: refetchFiles,
    error: getFilesError,
  } = useGetFilesByFolderQuery({
    variables: {
      folderID: currentFolderID,
    },
    skip: !currentFolderID,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (getFolderError?.graphQLErrors[0]?.extensions?.exception?.status ===
        403 ||
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        getFilesError?.graphQLErrors[0]?.extensions?.exception?.status ===
          403) &&
      !getFilesLoading &&
      !getFolderLoading
    ) {
      setIsShowAccessDeniedModal(true);
    }
  }, [getFolderError, getFilesError, getFilesLoading, getFolderLoading]);

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

  const handleUploadFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event?.target?.files?.[0];
      await uploadFile({
        variables: { file: file, folderID: currentFolderID },
      });
      refetchFolders();
      refetchFiles();
      showSuccessNotification("File uploaded successfully");
    } catch (err) {
      showErrorNotification((err as Error).message);
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
      refetchFolders();
      showSuccessNotification("Folder uploaded successfully");
    } catch (err) {
      showErrorNotification((err as Error).message);
    }
  };

  const handleDragUploadFile = async (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    try {
      const file = event?.dataTransfer?.files?.[0];
      await uploadFile({
        variables: { file: file, folderID: currentFolderID },
      });
      refetchFolders();
      refetchFiles();
      showSuccessNotification("File uploaded successfully");
    } catch (err) {
      showErrorNotification((err as Error).message);
    }
  };

  const fireFileUpload = () => {
    fileInputRef.current?.click();
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
          fireFileUpload();
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
      showSuccessNotification("Folder created successfully");
    } catch (err) {
      showErrorNotification((err as Error).message);
    }
  };

  const handleCancelCreateFolderModal = () => {
    setIsShownNewFolderDialog(false);
  };

  const onOkAccessDeniedModal = () => {
    setIsShowAccessDeniedModal(false);
    navigate("/");
  };

  const isEmpty = useMemo(() => {
    return (
      (!foldersData?.getFoldersOfFolder.length ||
        foldersData?.getFoldersOfFolder.every((folder) => folder.isTrash)) &&
      (!filesData?.getFilesByFolder.length ||
        filesData?.getFilesByFolder.every((file) => file.isTrash))
    );
  }, [foldersData, filesData]);

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
        <div className="ml-4">
          <Dropdown menu={{ items: addMenuItems }} trigger={["click"]}>
            <Button size="large">
              <PlusOutlined />
              Add
            </Button>
          </Dropdown>
        </div>
        {(() => {
          if (isEmpty) {
            return (
              <>
                <FileDragDrop
                  handleDropFile={handleDragUploadFile}
                  className="flex justify-center items-center flex-col mt-28"
                >
                  <FontAwesomeIcon
                    icon={faCloudArrowUp}
                    style={{ color: "#256fef" }}
                    className="text-7xl"
                  />
                  <Typography.Text className="font-bold">
                    Drag file here or use the Add button
                  </Typography.Text>
                </FileDragDrop>
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
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  // eslint-disable-next-line react/no-unknown-property
                  directory=""
                  webkitdirectory=""
                  onChange={handleUploadFolder}
                />
              </>
            );
          }

          return (
            <>
              <NavigateBreadCrumb />
              {!!foldersData?.getFoldersOfFolder.length &&
                !foldersData?.getFoldersOfFolder.every(
                  (folder) => folder.isTrash
                ) && (
                  <Typography.Text className="inline-block p-4 font-semibold">
                    Folders
                  </Typography.Text>
                )}

              <FolderSection
                folders={(foldersData?.getFoldersOfFolder as Folder[]) || []}
                handleClickFolder={handleClickFolder}
                selectedItem={
                  selectedItem as Folder & { type: "file" | "folder" }
                }
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
                selectedItem={
                  selectedItem as FileSchema & { type: "file" | "folder" }
                }
                isFilterTrash={false}
                refetch={refetchFiles}
              />
            </>
          );
        })()}
      </div>
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
      {isShowAccessDeniedModal && (
        <Modal
          title="Access Denied"
          open={isShowAccessDeniedModal}
          onOk={onOkAccessDeniedModal}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <Typography.Text>{`You don't have access to this folder`}</Typography.Text>
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line react/no-unknown-property
        directory=""
        webkitdirectory=""
        onChange={handleUploadFolder}
      />
    </>
  );
};
