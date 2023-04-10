import { DownOutlined } from "@ant-design/icons";
import { SearchableSelector } from "@components/SearchableSelector";
import {
  User,
  GetUsersBySearchPaginationQueryVariables,
  GetUsersBySearchPaginationDocument,
  useAddSharedUserToFolderMutation,
  useAddUserToFolderReadOnlyUsersMutation,
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
import { useMemo, useState } from "react";

interface Props {
  open: boolean;
  handleClose: () => void;
  initialUser:
    | { label: string; value: string }
    | { label: string; value: string }[];
  currentFolderID: string;
  refetchAccessPeople: () => void;
}

export const AddUserModal = ({
  open,
  handleClose,
  initialUser,
  currentFolderID,
  refetchAccessPeople,
}: Props) => {
  const { showErrorNotification, showSuccessNotification } = useAlert();
  const [currentSelectedRole, setCurrentSelectedRole] = useState<
    "Editor" | "Viewer"
  >("Editor");
  const [selectedUsers, setSelectedUsers] = useState(initialUser);
  const [isCheckedNotifyCheckbox, setIsCheckedNotifyCheckbox] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [addUserToModify] = useAddSharedUserToFolderMutation();
  const [addUserToReadOnly] = useAddUserToFolderReadOnlyUsersMutation();

  const items: MenuProps["items"] = useMemo(
    () => [
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
    ],
    []
  );

  const addUsersToModifyFolder = async () => {
    try {
      const arrayOfUsersIDs = !Array.isArray(selectedUsers)
        ? [String(selectedUsers?.value)]
        : selectedUsers.map((user) => user.value);

      const { data } = await addUserToModify({
        variables: {
          folderID: currentFolderID,
          sharedUserIDs: arrayOfUsersIDs,
          shouldSendMail: isCheckedNotifyCheckbox,
          userMessage,
        },
      });
      showSuccessNotification(data?.addSharedUserToFolder || "");
      refetchAccessPeople();
    } catch (err) {
      showErrorNotification((err as Error).message);
    } finally {
      handleClose();
    }
  };

  const addUsersToReadonlyFolder = async () => {
    try {
      const arrayOfUsersIDs = !Array.isArray(selectedUsers)
        ? [String(selectedUsers?.value)]
        : selectedUsers.map((user) => user.value);

      const { data } = await addUserToReadOnly({
        variables: {
          folderID: currentFolderID,
          readOnlyUserIDs: arrayOfUsersIDs,
          shouldSendMail: isCheckedNotifyCheckbox,
          userMessage,
        },
      });
      showSuccessNotification(data?.addUserToFolderReadOnlyUsers || "");
      refetchAccessPeople();
    } catch (err) {
      showErrorNotification((err as Error).message);
    } finally {
      handleClose();
    }
  };

  const onSubmit = () => {
    if (currentSelectedRole === "Editor") addUsersToModifyFolder();
    if (currentSelectedRole === "Viewer") addUsersToReadonlyFolder();
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
            onChange={(value) => {
              setSelectedUsers(value);
            }}
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
