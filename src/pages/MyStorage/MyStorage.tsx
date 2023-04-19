import { Typography } from "antd";
import { FolderPage } from "../FolderPage/FolderPage";

export const MyStorage = () => {
  return (
    <div className="flex flex-col pt-5 h-full">
      <Typography.Title level={4} className="ml-4 font-normal">
        My Storage
      </Typography.Title>
      <FolderPage />
    </div>
  );
};
