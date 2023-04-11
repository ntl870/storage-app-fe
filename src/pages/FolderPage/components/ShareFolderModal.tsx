import { SearchableSelector } from "@components/SearchableSelector";
import {
  Folder,
  GetUsersBySearchPaginationDocument,
  GetUsersBySearchPaginationQueryVariables,
  User,
  useGetPeopleWithAccessToFolderQuery,
  useSetGeneralFolderAccessMutation,
} from "@generated/schemas";
import {
  Avatar,
  Button,
  Dropdown,
  List,
  MenuProps,
  Modal,
  Space,
  Spin,
  Typography,
} from "antd";
import { useState } from "react";
import { AddUserModal } from "./AddUserModal";
import { DownOutlined } from "@ant-design/icons";
import { useAlert } from "@hooks/useAlert";
import { SwitchRoleDropdown } from "./SwitchRoleDropdown";
import { UserRole } from "src/common/types";

interface Props {
  open: boolean;
  handleClose: () => void;
  folder: Folder;
}

export const ShareFolderModal = ({ open, handleClose, folder }: Props) => {
  const { showErrorNotification, showSuccessNotification } = useAlert();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [setGeneralFolderAccess, { loading: isSetGeneralAccessLoading }] =
    useSetGeneralFolderAccessMutation();
  const {
    data: peopleWithAccess,
    refetch: refetchAccessPeople,
    loading: isLoadingAccessPeople,
  } = useGetPeopleWithAccessToFolderQuery({
    variables: {
      folderID: folder.ID,
    },
    onCompleted: (data) => {
      setSelectedOptions(
        data.getPeopleWithAccessToFolder.isPublic ? "Public" : "Private"
      );
    },
    fetchPolicy: "cache-and-network",
  });

  const [selectedOptions, setSelectedOptions] = useState<"Private" | "Public">(
    "Private"
  );

  const handleCloseAddUserModal = () => {
    setSelectedUser(null);
  };

  const items: MenuProps["items"] = [
    {
      label: "Private",
      key: "0",
      onClick: async () => {
        if (selectedOptions === "Private") return;

        try {
          await setGeneralFolderAccess({
            variables: {
              folderID: folder.ID,
              isPublic: false,
            },
          });
          showSuccessNotification("Folder access changed to private");
          setSelectedOptions("Private");
          refetchAccessPeople();
        } catch (err) {
          showErrorNotification((err as Error).message);
        }
      },
    },
    {
      label: "Public",
      key: "1",
      onClick: async () => {
        if (selectedOptions === "Public") return;

        try {
          await setGeneralFolderAccess({
            variables: {
              folderID: folder.ID,
              isPublic: true,
            },
          });
          showSuccessNotification("Folder access changed to public");
          setSelectedOptions("Public");
          refetchAccessPeople();
        } catch (err) {
          showErrorNotification((err as Error).message);
        }
      },
    },
  ];

  return (
    <>
      <Modal
        okButtonProps={{
          hidden: true,
        }}
        centered
        onCancel={handleClose}
        open={open}
        title="Share folder"
        cancelText="Close"
      >
        {isLoadingAccessPeople || isSetGeneralAccessLoading ? (
          <div className="text-center">
            <Spin />
          </div>
        ) : (
          <>
            <SearchableSelector<User, GetUsersBySearchPaginationQueryVariables>
              query={GetUsersBySearchPaginationDocument}
              format={(user) => ({
                label: `${user.name} - ${user.email}`,
                value: user.ID,
              })}
              onChange={(value) => {
                setSelectedUser(value);
              }}
            />
            <div className="mt-4">
              <Typography.Text className="font-bold">
                Users can modify
              </Typography.Text>
              <List
                itemLayout="horizontal"
                className="max-h-96 overflow-y-auto"
                dataSource={
                  peopleWithAccess?.getPeopleWithAccessToFolder.sharedUsers
                }
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={`https://joesch.moe/api/v1/random?key=${index}`}
                        />
                      }
                      title={item.name}
                      description={item.email}
                    />
                    <SwitchRoleDropdown
                      initialRole={UserRole.EDITOR}
                      userID={item.ID}
                      folderID={folder.ID}
                      refetchAccessPeople={refetchAccessPeople}
                    />
                  </List.Item>
                )}
              />
            </div>
            <div>
              <Typography.Text className="font-bold">
                Users can view
              </Typography.Text>
              <List
                itemLayout="horizontal"
                className="max-h-96 overflow-y-auto"
                dataSource={
                  peopleWithAccess?.getPeopleWithAccessToFolder.readonlyUsers
                }
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={`https://joesch.moe/api/v1/random?key=${index}`}
                        />
                      }
                      title={item.name}
                      description={item.email}
                    />
                    <SwitchRoleDropdown
                      initialRole={UserRole.VIEWER}
                      userID={item.ID}
                      folderID={folder.ID}
                      refetchAccessPeople={refetchAccessPeople}
                    />
                  </List.Item>
                )}
              />
            </div>

            <div className="flex flex-col">
              <Typography.Text className="font-bold">
                General Access
              </Typography.Text>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <Button>
                  <Space>
                    {selectedOptions}
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </div>
          </>
        )}
      </Modal>

      {!!selectedUser && (
        <AddUserModal
          open={!!selectedUser}
          initialUser={selectedUser as any}
          handleClose={handleCloseAddUserModal}
          currentFolderID={folder.ID}
          refetchAccessPeople={refetchAccessPeople}
        />
      )}
    </>
  );
};
