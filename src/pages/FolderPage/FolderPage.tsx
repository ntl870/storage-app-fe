import {
  FolderAddFilled,
  FolderOpenFilled,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { FileDetail } from "@components/FileDetail";
import FileDragDrop from "@components/FileDragDrop";
import { FolderDetail } from "@components/FolderDetail";
import NavigateBreadCrumb from "@components/NavigateBreadCrumb";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  File as FileSchema,
  Folder,
  useCreateFolderMutation,
  useGetFilesByFolderQuery,
  useGetFoldersOfFolderQuery,
  useUploadFileMutation,
  useUploadFolderMutation,
} from "@generated/schemas";
import { useAlert } from "@hooks/useAlert";
import useCurrentUser from "@hooks/useCurrentUser";
import useRouter from "@hooks/useRouter";
import {
  convertGibToBytes,
  getTotalSizeOfFolder,
  isEnoughSpaceLeft,
} from "@utils/tools";
import {
  Button,
  Col,
  Dropdown,
  Input,
  InputRef,
  MenuProps,
  Modal,
  Row,
  Spin,
  Typography,
  message,
} from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { uploadFileRestful } from "src/api/rest/filesApi";
import { uploadFolderRestful } from "src/api/rest/folderApi";
import { FileSection } from "./components/FileSection";
import { FolderSection } from "./components/FolderSection";

type SelectedItemType =
  | ((Folder | FileSchema) & { type: "file" | "folder" })
  | null;

export const FolderPage = () => {
  const { params, navigate } = useRouter();
  const { rootFolderID, maxStorage, storageUsed } = useCurrentUser();
  const { showErrorNotification, showSuccessNotification } = useAlert();
  const [isShownNewFolderDialog, setIsShownNewFolderDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SelectedItemType>(null);
  const [isShowAccessDeniedModal, setIsShowAccessDeniedModal] = useState(false);
  const [isProcessingFiles, setIsProcessingFiles] = useState(false);
  const createFolderInputRef = useRef<InputRef>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const [createFolder, { loading: createFolderLoading }] =
    useCreateFolderMutation({
      onCompleted: () => {
        setIsShownNewFolderDialog(false);
        refetchFolders();
      },
    });

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
    fetchPolicy: "cache-and-network",
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
    fetchPolicy: "cache-and-network",
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
    setIsProcessingFiles(true);
    const file = event?.target?.files?.[0];
    const isEnoughSpace = isEnoughSpaceLeft(
      convertGibToBytes(Number(maxStorage)),
      Number(storageUsed),
      file?.size || 0
    );

    if (!isEnoughSpace) {
      showErrorNotification("Not enough space left");
      setIsProcessingFiles(false);
      return;
    }
    const formData = new FormData();
    formData.append("file", file as Blob);

    try {
      // await uploadFile({
      //   variables: { file: file, folderID: currentFolderID },
      // });
      await uploadFileRestful(formData, currentFolderID);
      refetchFolders();
      refetchFiles();
      showSuccessNotification("File uploaded successfully");
    } catch (err) {
      showErrorNotification((err as Error).message);
    } finally {
      setIsProcessingFiles(false);
    }
  };

  const handleUploadFolder = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsProcessingFiles(true);
    const files = event?.target?.files;
    const isEnoughSpace = isEnoughSpaceLeft(
      convertGibToBytes(Number(maxStorage)),
      Number(storageUsed),
      Number(getTotalSizeOfFolder(files))
    );

    if (!isEnoughSpace) {
      showErrorNotification("Not enough space left");
      setIsProcessingFiles(false);
      return;
    }

    try {
      // const folderEntries = await getFolderEntries(files);
      // console.log(folderEntries);
      const formData = new FormData();

      for (const file of files as FileList) {
        console.log(file);
        formData.append("files", file);
      }
      // await uploadFolder({
      //   variables: {
      //     input: {
      //       rootFolderID: currentFolderID,
      //       folder: groupFilesByFolder(files as unknown as File[])[0],
      //     },
      //   },
      // });
      await uploadFolderRestful(formData, currentFolderID);
      refetchFolders();
      showSuccessNotification("Folder uploaded successfully");
    } catch (err) {
      showErrorNotification((err as Error).message);
    } finally {
      setIsProcessingFiles(false);
    }
  };

  const handleDragUploadFile = async (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    try {
      const file = event?.dataTransfer?.files?.[0];
      const formData = new FormData();
      formData.append("file", file as Blob);
      await uploadFileRestful(formData, currentFolderID);
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

  useEffect(() => {
    if (isProcessingFiles)
      message.loading({
        content: "Uploading files...",
        key: "uploading",
        duration: 0,
      });
    else message.destroy();
  }, [isProcessingFiles]);

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
      <div className="flex flex-col pt-5 h-full">
        <div className="ml-4">
          <Dropdown menu={{ items: addMenuItems }} trigger={["click"]}>
            <Button size="large">
              <PlusOutlined />
              Add
            </Button>
          </Dropdown>
        </div>
        <NavigateBreadCrumb />
        {(() => {
          if (isEmpty) {
            return (
              <>
                <FileDragDrop
                  handleDropFile={handleDragUploadFile}
                  className="flex justify-center items-center flex-col mt-28 h-full"
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
            <Row gutter={[16, 16]}>
              <Col span={selectedItem ? 18 : undefined}>
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
              </Col>
              {selectedItem && selectedItem.type === "file" && (
                <Col span={6}>
                  <FileDetail fileID={selectedItem?.ID} />
                </Col>
              )}

              {selectedItem && selectedItem.type === "folder" && (
                <Col span={6}>
                  <FolderDetail folderID={selectedItem?.ID} />
                </Col>
              )}
            </Row>
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
