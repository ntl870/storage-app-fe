import { SearchableSelector } from "@components/SearchableSelector";
import {
  Folder,
  GetUsersBySearchPaginationDocument,
  GetUsersBySearchPaginationQueryVariables,
  User,
  useGetPeopleWithAccessToFolderQuery,
  useSetGeneralFolderAccessMutation,
} from "@generated/schemas";
import { useAlert } from "@hooks/useAlert";
import useCurrentUser from "@hooks/useCurrentUser";
import { getBase64StringOfImage, getGeneratedAvatar } from "@utils/tools";
import { Avatar, List, Modal, Radio, Spin, Typography } from "antd";
import { useMemo, useState } from "react";
import { UserRole } from "src/common/types";
import { AddUserModal } from "./AddUserModal";
import { SwitchRoleDropdown } from "./SwitchRoleDropdown";

interface Props {
  open: boolean;
  handleClose: () => void;
  folder: Folder;
}

export const ShareFolderModal = ({ open, handleClose, folder }: Props) => {
  const { ID: currentUserID } = useCurrentUser();
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

  const handleChangeGeneralAccess = async (value: "Private" | "Public") => {
    setSelectedOptions(value);
    if (value === "Private") {
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
    }

    if (value === "Public") {
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
    }
  };

  const canEdit = useMemo(() => {
    return (
      currentUserID ===
        peopleWithAccess?.getPeopleWithAccessToFolder.owner.ID ||
      peopleWithAccess?.getPeopleWithAccessToFolder.sharedUsers.some(
        (user) => user.ID === currentUserID
      )
    );
  }, [peopleWithAccess, currentUserID]);

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
            {canEdit && (
              <SearchableSelector<
                User,
                GetUsersBySearchPaginationQueryVariables
              >
                query={GetUsersBySearchPaginationDocument}
                format={(user) => ({
                  label: `${user.name} - ${user.email}`,
                  value: user.ID,
                })}
                onChange={setSelectedUser}
              />
            )}

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
                renderItem={(user, index) => {
                  const owner =
                    peopleWithAccess?.getPeopleWithAccessToFolder.owner;
                  return (
                    <>
                      {index === 0 && (
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <Avatar
                                size="large"
                                src={
                                  !owner?.avatar
                                    ? getGeneratedAvatar(String(owner?.ID))
                                    : getBase64StringOfImage(owner.avatar)
                                }
                              />
                            }
                            title={owner?.name}
                            description={owner?.email}
                          />
                          <Typography.Text
                            italic
                            type="secondary"
                            className="text-lg"
                          >
                            Owner
                          </Typography.Text>
                        </List.Item>
                      )}
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              size="large"
                              src={
                                !user.avatar
                                  ? getGeneratedAvatar(String(user.ID))
                                  : getBase64StringOfImage(user.avatar)
                              }
                            />
                          }
                          title={user.name}
                          description={user.email}
                        />
                        {canEdit && (
                          <SwitchRoleDropdown
                            initialRole={UserRole.EDITOR}
                            userID={user.ID}
                            folderID={folder.ID}
                            refetchAccessPeople={refetchAccessPeople}
                          />
                        )}
                      </List.Item>
                    </>
                  );
                }}
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
                renderItem={(user) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          size="large"
                          src={
                            !user.avatar
                              ? getGeneratedAvatar(String(user.ID))
                              : getBase64StringOfImage(user.avatar)
                          }
                        />
                      }
                      title={user.name}
                      description={user.email}
                    />
                    {canEdit && (
                      <SwitchRoleDropdown
                        initialRole={UserRole.VIEWER}
                        userID={user.ID}
                        folderID={folder.ID}
                        refetchAccessPeople={refetchAccessPeople}
                      />
                    )}
                  </List.Item>
                )}
              />
            </div>

            <div className="flex flex-col">
              <Typography.Text className="font-bold">
                General Access
              </Typography.Text>
              <Radio.Group
                onChange={(e) => handleChangeGeneralAccess(e.target.value)}
                value={selectedOptions}
                buttonStyle="solid"
                disabled={!canEdit}
              >
                <Radio.Button value="Public" className="w-1/2 text-center">
                  Public
                </Radio.Button>
                <Radio.Button value="Private" className="w-1/2 text-center">
                  Private
                </Radio.Button>
              </Radio.Group>
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
