import { DownOutlined } from "@ant-design/icons";
import { SearchableSelector } from "@components/SearchableSelector";
import {
  User,
  GetUsersBySearchPaginationQueryVariables,
  GetUsersBySearchPaginationDocument,
  useAddSharedUserToFolderMutation,
  useAddUserToFolderReadOnlyUsersMutation,
  useAddUsersToSharedUserFileMutation,
  useAddUsersToReadonlyFileMutation,
} from "@generated/schemas";
import { useAlert } from "@hooks/useAlert";
import {
  Button,
  Checkbox,
  Col,
  Dropdown,
  Input,
  MenuProps,
  Modal,
  Row,
  Space,
} from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useState } from "react";

interface Props {
  open: boolean;
  handleClose: () => void;
  initialUser:
    | { label: string; value: string }
    | { label: string; value: string }[];
  ID: string;
  refetchAccessPeople: () => void;
  type: "folder" | "file";
}

export const AddUserModal = ({
  open,
  handleClose,
  initialUser,
  ID,
  refetchAccessPeople,
  type,
}: Props) => {
  const { showErrorNotification, showSuccessNotification } = useAlert();
  const [currentSelectedRole, setCurrentSelectedRole] = useState<
    "Editor" | "Viewer"
  >("Editor");
  const [selectedUsers, setSelectedUsers] = useState(initialUser);
  const [isCheckedNotifyCheckbox, setIsCheckedNotifyCheckbox] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [addUserToModifyFolder] = useAddSharedUserToFolderMutation();
  const [addUserToReadOnlyFolder] = useAddUserToFolderReadOnlyUsersMutation();

  const [addUserToModifyFile] = useAddUsersToSharedUserFileMutation();
  const [addUserToReadOnlyFile] = useAddUsersToReadonlyFileMutation();

  const items: MenuProps["items"] = [
    {
      label: "Editor",
      key: "0",
      onClick: () => setCurrentSelectedRole("Editor"),
    },
    {
      label: "Viewer",
      key: "1",
      onClick: () => setCurrentSelectedRole("Viewer"),
    },
  ];

  const addUsersToModify = async () => {
    try {
      const arrayOfUsersIDs = !Array.isArray(selectedUsers)
        ? [String(selectedUsers?.value)]
        : selectedUsers.map((user) => user.value);

      if (type === "folder") {
        const { data } = await addUserToModifyFolder({
          variables: {
            folderID: ID,
            sharedUserIDs: arrayOfUsersIDs,
            shouldSendMail: isCheckedNotifyCheckbox,
            userMessage,
          },
        });
        showSuccessNotification(data?.addSharedUserToFolder || "");
        refetchAccessPeople();
      }

      if (type === "file") {
        const { data } = await addUserToModifyFile({
          variables: {
            fileID: ID,
            sharedUserIDs: arrayOfUsersIDs,
            shouldSendMail: isCheckedNotifyCheckbox,
            userMessage,
          },
        });
        showSuccessNotification(data?.addUsersToSharedUserFile || "");
        refetchAccessPeople();
      }
    } catch (err) {
      showErrorNotification((err as Error).message);
    } finally {
      handleClose();
    }
  };

  const addUsersToReadonly = async () => {
    try {
      const arrayOfUsersIDs = !Array.isArray(selectedUsers)
        ? [String(selectedUsers?.value)]
        : selectedUsers.map((user) => user.value);

      if (type === "folder") {
        const { data } = await addUserToReadOnlyFolder({
          variables: {
            folderID: ID,
            readOnlyUserIDs: arrayOfUsersIDs,
            shouldSendMail: isCheckedNotifyCheckbox,
            userMessage,
          },
        });
        showSuccessNotification(data?.addUserToFolderReadOnlyUsers || "");
        refetchAccessPeople();
      }

      if (type === "file") {
        const { data } = await addUserToReadOnlyFile({
          variables: {
            fileID: ID,
            readonlyUserIDs: arrayOfUsersIDs,
            shouldSendMail: isCheckedNotifyCheckbox,
            userMessage,
          },
        });
        showSuccessNotification(data?.addUsersToReadonlyFile || "");
        refetchAccessPeople();
      }
    } catch (err) {
      showErrorNotification((err as Error).message);
    } finally {
      handleClose();
    }
  };

  const onSubmit = () => {
    if (currentSelectedRole === "Editor") addUsersToModify();
    if (currentSelectedRole === "Viewer") addUsersToReadonly();
  };

  const onToggleNotifyCheckbox = (e: CheckboxChangeEvent) => {
    setIsCheckedNotifyCheckbox(e.target.checked);
  };

  const handleChangeUserMessage = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUserMessage(e.target.value);
  };

  return (
    <Modal
      title="Add User"
      open={open}
      onCancel={handleClose}
      centered
      onOk={onSubmit}
    >
      <Row gutter={[16, 16]}>
        <Col span={18}>
          <SearchableSelector<User, GetUsersBySearchPaginationQueryVariables>
            query={GetUsersBySearchPaginationDocument}
            multiple
            format={(user) => ({
              label: `${user.name} - ${user.email}`,
              value: user.ID,
            })}
            onChange={setSelectedUsers}
            value={selectedUsers as any}
          />
        </Col>
        <Col span={4}>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Button>
              <Space>
                {currentSelectedRole}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Col>
      </Row>

      <Checkbox onChange={onToggleNotifyCheckbox} className="my-4">
        Notify user via email
      </Checkbox>

      <Input.TextArea
        placeholder="Add a message"
        onChange={handleChangeUserMessage}
      />
    </Modal>
  );
};
