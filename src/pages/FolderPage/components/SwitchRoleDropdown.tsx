import { DownOutlined } from "@ant-design/icons";
import {
  useChangeUserRoleInFolderMutation,
  useRemoveUserFromFolderMutation,
} from "@generated/schemas";
import { useAlert } from "@hooks/useAlert";
import { Button, Dropdown, MenuProps, Space } from "antd";
import { useState } from "react";
import { UserRole } from "src/common/types";
interface Props {
  userID: string;
  initialRole: UserRole;
  folderID: string;
  refetchAccessPeople: () => void;
}
export const SwitchRoleDropdown = ({
  userID,
  initialRole,
  folderID,
  refetchAccessPeople,
}: Props) => {
  const { showErrorNotification, showSuccessNotification } = useAlert();
  const [currentSelectedRole, setCurrentSelectedRole] =
    useState<UserRole>(initialRole);
  const [switchUserRole] = useChangeUserRoleInFolderMutation();
  const [removeUserFromFolder] = useRemoveUserFromFolderMutation();

  const handleSwitchUserRole = async (targetRole: UserRole) => {
    try {
      const { data } = await switchUserRole({
        variables: {
          targetUserID: userID,
          targetRole,
          folderID,
        },
      });
      refetchAccessPeople();
      showSuccessNotification(data?.changeUserRoleInFolder || "");
    } catch (err) {
      showErrorNotification((err as Error).message);
    }
  };

  const handleRemoveUserFromFolder = async () => {
    try {
      const { data } = await removeUserFromFolder({
        variables: {
          targetUserID: userID,
          folderID,
        },
      });
      refetchAccessPeople();
      showSuccessNotification(data?.removeUserFromFolder || "");
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
