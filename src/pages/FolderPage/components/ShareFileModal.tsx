import { LinkOutlined } from "@ant-design/icons";
import { SearchableSelector } from "@components/SearchableSelector";
import {
  File,
  GetUsersBySearchPaginationDocument,
  GetUsersBySearchPaginationQueryVariables,
  User,
  useGetPeopleWithAccessToFileQuery,
  useSetGeneralAccessOfFileMutation,
} from "@generated/schemas";
import { useAlert } from "@hooks/useAlert";
import useCurrentUser from "@hooks/useCurrentUser";
import { getGeneratedAvatar, getBase64StringOfImage } from "@utils/tools";
import {
  Avatar,
  Button,
  List,
  Modal,
  Radio,
  Spin,
  Typography,
  message,
} from "antd";
import { useMemo, useState } from "react";
import { UserRole } from "src/common/types";
import { SwitchRoleDropdown } from "./SwitchRoleDropdown";
import { AddUserModal } from "./AddUserModal";

interface Props {
  open: boolean;
  handleClose: () => void;
  file: File | null;
}

export const ShareFileModal = ({ file, handleClose, open }: Props) => {
  const { ID: currentUserID } = useCurrentUser();
  const { showErrorNotification, showSuccessNotification } = useAlert();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<"Private" | "Public">(
    "Private"
  );

  const [setGeneralFileAccess, { loading: isLoadingSetGeneralAccess }] =
    useSetGeneralAccessOfFileMutation();

  const {
    data: peopleWithAccess,
    refetch: refetchAccessPeople,
    loading: isLoadingAccessPeople,
  } = useGetPeopleWithAccessToFileQuery({
    variables: {
      fileID: file?.ID || "",
    },
    skip: !file?.ID,
    onCompleted: (data) => {
      setSelectedOptions(
        data.getPeopleWithAccessToFile.isPublic ? "Public" : "Private"
      );
    },
    fetchPolicy: "cache-and-network",
  });

  const handleChangeGeneralAccess = async (value: "Private" | "Public") => {
    setSelectedOptions(value);
    if (value === "Private") {
      try {
        await setGeneralFileAccess({
          variables: {
            fileID: file?.ID || "",
            isPublic: false,
          },
        });
        showSuccessNotification("File access changed to private");
        setSelectedOptions("Private");
        refetchAccessPeople();
      } catch (err) {
        showErrorNotification((err as Error).message);
      }
    }

    if (value === "Public") {
      try {
        await setGeneralFileAccess({
          variables: {
            fileID: file?.ID || "",
            isPublic: true,
          },
        });
        showSuccessNotification("File access changed to public");
        setSelectedOptions("Public");
        refetchAccessPeople();
      } catch (err) {
        showErrorNotification((err as Error).message);
      }
    }
  };

  const canEdit = useMemo(() => {
    return (
      currentUserID === peopleWithAccess?.getPeopleWithAccessToFile.owner.ID ||
      peopleWithAccess?.getPeopleWithAccessToFile.sharedUsers.some(
        (user) => String(user.ID) === currentUserID
      )
    );
  }, [peopleWithAccess, currentUserID]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/file/${file?.ID}`);
    message.success("Link copied to clipboard");
  };

  return (
    <>
      <Modal
        okButtonProps={{
          hidden: true,
        }}
        centered
        open={open}
        onCancel={handleClose}
        title="Share file"
        cancelText="Close"
        footer={
          <>
            <Button key="copy" icon={<LinkOutlined />} onClick={handleCopyLink}>
              Copy link
            </Button>
            <Button key="done" type="primary">
              Done
            </Button>
          </>
        }
      >
        {isLoadingAccessPeople || isLoadingSetGeneralAccess ? (
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
              {(() => {
                const owner = peopleWithAccess?.getPeopleWithAccessToFile.owner;
                return (
                  <List>
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
                  </List>
                );
              })()}

              <List
                itemLayout="horizontal"
                className="max-h-96 overflow-y-auto"
                dataSource={peopleWithAccess?.getPeopleWithAccessToFile.sharedUsers.filter(
                  (user) =>
                    user.ID !==
                    peopleWithAccess.getPeopleWithAccessToFile.owner.ID
                )}
                locale={{
                  emptyText: " ",
                }}
                renderItem={(user) => {
                  return (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            size="large"
                            src={
                              !user?.avatar
                                ? getGeneratedAvatar(String(user?.ID))
                                : getBase64StringOfImage(user.avatar)
                            }
                          />
                        }
                        title={user?.name}
                        description={user?.email}
                      />
                      {canEdit && (
                        <SwitchRoleDropdown
                          initialRole={UserRole.EDITOR}
                          userID={user?.ID || ""}
                          ID={file?.ID || ""}
                          type="file"
                          refetchAccessPeople={refetchAccessPeople}
                        />
                      )}
                    </List.Item>
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
                  peopleWithAccess?.getPeopleWithAccessToFile.readonlyUsers
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
                        ID={file?.ID || ""}
                        type="file"
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
          type="file"
          open={!!selectedUser}
          initialUser={selectedUser as any}
          handleClose={() => setSelectedUser(null)}
          ID={file?.ID || ""}
          refetchAccessPeople={refetchAccessPeople}
        />
      )}
    </>
  );
};
