import { FolderOutlined } from "@ant-design/icons";
import { File, Folder, useGetFolderDetailQuery } from "@generated/schemas";
import useRouter from "@hooks/useRouter";
import { ShareFolderModal } from "@pages/FolderPage/components/ShareFolderModal";
import {
  getBase64StringOfImage,
  getGeneratedAvatar,
  renderIconByFileType,
} from "@utils/tools";
import { Avatar, Button, Divider, Spin, Tooltip, Typography } from "antd";
import { useState } from "react";

interface Props {
  folderID?: string;
}

export const FolderDetail = ({ folderID }: Props) => {
  const { navigate } = useRouter();
  const [isOpenManageAccessModal, setIsOpenManageAccessModal] = useState(false);

  const { data, loading } = useGetFolderDetailQuery({
    variables: {
      folderID: folderID || "",
    },
    skip: !folderID,
    fetchPolicy: "cache-and-network",
  });

  const handleOpenManageAccessModal = () => {
    setIsOpenManageAccessModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full bg-white rounded-xl mr-6">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col p-4 bg-white rounded-xl mr-6">
        <div className="flex justify-center items-center flex-col">
          <Typography.Title level={5}>
            {data?.getFolderDetail.name}
          </Typography.Title>
          {data?.getFolderDetail &&
            renderIconByFileType(data?.getFolderDetail as File)}
        </div>
        <div>
          <Typography.Title level={5} className="text-left">
            Who has access
          </Typography.Title>
          <div className="flex flex-col">
            <Typography.Text className="font-bold">Owner</Typography.Text>
            {data?.getFolderDetail.owner && (
              <Tooltip
                title={`${data?.getFolderDetail.owner.name} - ${data?.getFolderDetail.owner.email}`}
              >
                <Avatar
                  src={
                    data?.getFolderDetail.owner.avatar
                      ? getBase64StringOfImage(
                          data?.getFolderDetail.owner.avatar
                        )
                      : getGeneratedAvatar(data?.getFolderDetail.owner.ID)
                  }
                />
              </Tooltip>
            )}
          </div>
          {!!data?.getFolderDetail.sharedUsers?.length && (
            <div className="mt-4 flex flex-col">
              <Typography.Text className="font-bold">
                People with access
              </Typography.Text>
              <Avatar.Group>
                {data?.getFolderDetail.sharedUsers?.map((user) => {
                  return (
                    <Tooltip
                      key={user.ID}
                      title={`${user.name} - ${user.email}`}
                    >
                      <Avatar
                        src={
                          user.avatar
                            ? getBase64StringOfImage(user.avatar)
                            : getGeneratedAvatar(user.ID)
                        }
                      />
                    </Tooltip>
                  );
                })}
              </Avatar.Group>
            </div>
          )}
          <Button className="mt-4" onClick={handleOpenManageAccessModal}>
            Manage Access
          </Button>
        </div>
        <Divider />
        <div>
          <Typography.Text className="font-bold">File details</Typography.Text>
          <div className="flex flex-col mt-2 max-w-[10rem]">
            <Typography.Text className="text-xs font-bold">
              Location
            </Typography.Text>
          </div>
          <Button
            className="mt-1"
            onClick={() => navigate(`/folder/${data?.getFolderDetail.ID}`)}
          >
            <FolderOutlined />
            <span>{data?.getFolderDetail.rootFolder?.name}</span>
          </Button>
          <div className="flex flex-col mt-2">
            <Typography.Text className="text-xs font-bold">
              Created Date
            </Typography.Text>
            <Typography.Text className="text-sm">
              {new Date(data?.getFolderDetail.createdDate || "").toLocaleString(
                "en-US"
              )}
            </Typography.Text>
          </div>
          <div className="flex flex-col mt-2">
            <Typography.Text className="text-xs font-bold">
              Modified Date
            </Typography.Text>
            <Typography.Text className="text-sm">
              {new Date(
                data?.getFolderDetail.modifiedDate || ""
              ).toLocaleString("en-US")}
            </Typography.Text>
          </div>
        </div>
      </div>
      {isOpenManageAccessModal && (
        <ShareFolderModal
          folder={data?.getFolderDetail as Folder}
          open={isOpenManageAccessModal}
          handleClose={() => setIsOpenManageAccessModal(false)}
        />
      )}
    </>
  );
};
