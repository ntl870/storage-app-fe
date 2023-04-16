import { DownOutlined } from "@ant-design/icons";
import {
  useChangeUserRoleInFileMutation,
  useChangeUserRoleInFolderMutation,
  useRemoveUserFromFileMutation,
  useRemoveUserFromFolderMutation,
} from "@generated/schemas";
import { useAlert } from "@hooks/useAlert";
import { Button, Dropdown, MenuProps, Space } from "antd";
import { useState } from "react";
import { UserRole } from "src/common/types";
interface Props {
  userID: string;
  initialRole: UserRole;
  ID: string;
  type: "file" | "folder";
  refetchAccessPeople: () => void;
}
export const SwitchRoleDropdown = ({
  userID,
  initialRole,
  ID,
  type,
  refetchAccessPeople,
}: Props) => {
  const { showErrorNotification, showSuccessNotification } = useAlert();
  const [currentSelectedRole, setCurrentSelectedRole] =
    useState<UserRole>(initialRole);
  const [switchUserRoleFolder] = useChangeUserRoleInFolderMutation();
  const [switchUserRoleFile] = useChangeUserRoleInFileMutation();
  const [removeUserFromFolder] = useRemoveUserFromFolderMutation();
  const [removeUserFromFile] = useRemoveUserFromFileMutation();

  const handleSwitchUserRole = async (targetRole: UserRole) => {
    try {
      if (type === "folder") {
        const { data } = await switchUserRoleFolder({
          variables: {
            targetUserID: userID,
            targetRole,
            folderID: ID,
          },
        });
        refetchAccessPeople();
        showSuccessNotification(data?.changeUserRoleInFolder || "");
      }

      if (type === "file") {
        const { data } = await switchUserRoleFile({
          variables: {
            targetUserID: userID,
            targetRole,
            fileID: ID,
          },
        });
        refetchAccessPeople();
        showSuccessNotification(data?.changeUserRoleInFile || "");
      }
    } catch (err) {
      showErrorNotification((err as Error).message);
    }
  };

  const handleRemoveUserFromFolder = async () => {
    try {
      if (type === "folder") {
        const { data } = await removeUserFromFolder({
          variables: {
            targetUserID: userID,
            folderID: ID,
          },
        });
        refetchAccessPeople();
        showSuccessNotification(data?.removeUserFromFolder || "");
      }

      if (type === "file") {
        const { data } = await removeUserFromFile({
          variables: {
            targetUserID: userID,
            fileID: ID,
          },
        });
        refetchAccessPeople();
        showSuccessNotification(data?.removeUserFromFile || "");
      }
    } catch (err) {
      showErrorNotification((err as Error).message);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "Editor",
      key: "0",
      onClick: async () => {
        if (currentSelectedRole === UserRole.EDITOR) return;

        setCurrentSelectedRole(UserRole.EDITOR);
        await handleSwitchUserRole(UserRole.EDITOR);
      },
    },
    {
      label: "Viewer",
      key: "1",
      onClick: async () => {
        if (currentSelectedRole === UserRole.VIEWER) return;

        setCurrentSelectedRole(UserRole.VIEWER);
        await handleSwitchUserRole(UserRole.VIEWER);
      },
    },
    {
      label: "Remove Access",
      key: "2",
      onClick: handleRemoveUserFromFolder,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button>
        <Space>
          {currentSelectedRole}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};
