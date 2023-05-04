import {
  File,
  useRenameFileMutation,
  useRenameFolderMutation,
} from "@generated/schemas";
import { useAlert } from "@hooks/useAlert";
import { Input, Modal } from "antd";
import { useState } from "react";

interface Props {
  open: boolean;
  selectedFile: File | null;
  refetch: () => Promise<void>;
  handleClose: () => void;
}

export const RenameFileModal = ({
  open,
  selectedFile,
  refetch,
  handleClose,
}: Props) => {
  const { showErrorNotification, showSuccessNotification } = useAlert();
  const [newName, setNewName] = useState<string>(
    selectedFile?.name.split(".")[0] || ""
  );

  const [renameFile] = useRenameFileMutation();

  const handleRenameFolder = async () => {
    try {
      if (selectedFile?.ID) {
        const { data } = await renameFile({
          variables: {
            fileID: selectedFile?.ID,
            newName,
          },
        });
        showSuccessNotification(data?.renameFile || "");
        refetch();
        handleClose();
      }
    } catch (err) {
      showErrorNotification((err as Error).message);
    }
  };

  return (
    <Modal
      open={open}
      title="Rename File"
      onOk={handleRenameFolder}
      onCancel={handleClose}
    >
      <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
    </Modal>
  );
};
