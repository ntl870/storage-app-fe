import { useGetFileDetailQuery } from "@generated/schemas";
import {
  formatFileSize,
  getBase64StringOfImage,
  getGeneratedAvatar,
  renderIconByFileType,
} from "@utils/tools";
import { Avatar, Button, Divider, Tooltip, Typography } from "antd";
import { File } from "@generated/schemas";
import { useState } from "react";
import { ShareFileModal } from "@pages/FolderPage/components/ShareFileModal";

interface Props {
  fileID?: string;
}

export const FileDetail = ({ fileID }: Props) => {
  const [isOpenManageAccessModal, setIsOpenManageAccessModal] = useState(false);

  const { data } = useGetFileDetailQuery({
    variables: {
      fileID: fileID || "",
    },
    skip: !fileID,
    fetchPolicy: "cache-and-network",
  });

  const handleOpenManageAccessModal = () => {
    setIsOpenManageAccessModal(true);
  };

  return (
    <>
      <div className="flex flex-col p-4 bg-white rounded-xl mr-6">
        <div className="flex justify-center items-center flex-col">
          <Typography.Title level={5}>
            {data?.getFileDetail.name}
          </Typography.Title>
          {data?.getFileDetail &&
            renderIconByFileType(data?.getFileDetail as File)}
        </div>
        <div>
          <Typography.Title level={5} className="text-left">
            Who has access
          </Typography.Title>
          <div className="flex flex-col">
            <Typography.Text className="font-bold">Owner</Typography.Text>
            {data?.getFileDetail.owner && (
              <Tooltip
                title={`${data?.getFileDetail.owner.name} - ${data?.getFileDetail.owner.email}`}
              >
                <Avatar
                  src={
                    data?.getFileDetail.owner.avatar
                      ? getBase64StringOfImage(data?.getFileDetail.owner.avatar)
                      : getGeneratedAvatar(data?.getFileDetail.owner.ID)
                  }
                />
              </Tooltip>
            )}
          </div>
          {!!data?.getFileDetail.sharedUsers?.length && (
            <div className="mt-4 flex flex-col">
              <Typography.Text className="font-bold">
                People with access
              </Typography.Text>
              <Avatar.Group>
                {data?.getFileDetail.sharedUsers?.map((user) => {
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
          <div className="flex flex-col mt-2">
            <Typography.Text className="text-xs font-bold">
              Type
            </Typography.Text>
            <Typography.Text className="text-sm">
              {data?.getFileDetail.fileType}
            </Typography.Text>
          </div>

          <div className="flex flex-col mt-2">
            <Typography.Text className="text-xs font-bold">
              Size
            </Typography.Text>
            <Typography.Text className="text-sm">
              {formatFileSize(data?.getFileDetail.fileSize || 0)}
            </Typography.Text>
          </div>
        </div>
      </div>
      {isOpenManageAccessModal && (
        <ShareFileModal
          file={data?.getFileDetail as File}
          open={isOpenManageAccessModal}
          handleClose={() => setIsOpenManageAccessModal(false)}
        />
      )}
    </>
  );
};
