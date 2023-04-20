import { Folder, useRenameFolderMutation } from "@generated/schemas";
import { useAlert } from "@hooks/useAlert";
import { Input, Modal } from "antd";
import { useState } from "react";

interface Props {
  open: boolean;
  selectedFolder: Folder | null;
  refetch: () => void;
  handleClose: () => void;
}

export const RenameFolderModal = ({
  open,
  selectedFolder,
  refetch,
  handleClose,
}: Props) => {
  const { showErrorNotification, showSuccessNotification } = useAlert();
  const [newName, setNewName] = useState<string>(selectedFolder?.name || "");

  const [renameFolder] = useRenameFolderMutation();

  const handleRenameFolder = async () => {
    try {
      if (selectedFolder?.ID) {
        const { data } = await renameFolder({
          variables: {
            folderID: selectedFolder?.ID,
            name: newName,
          },
        });
        showSuccessNotification(data?.renameFolder || "");
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
      title="Rename Folder"
      onOk={handleRenameFolder}
      onCancel={handleClose}
    >
      <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
    </Modal>
  );
};
