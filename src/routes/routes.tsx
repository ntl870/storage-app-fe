import { DashboardFilled, DeleteFilled } from "@ant-design/icons";
import { FolderPage } from "@pages/FolderPage/FolderPage";
import { MyStorage } from "@pages/MyStorage/MyStorage";
import { Trash } from "@pages/Trash/Trash";

export interface Route {
  path: string;
  label?: string;
  element: React.ReactNode;
  icon?: React.ReactNode;
  hidden?: boolean;
  key: string;
}

const routes: Route[] = [
  {
    path: "/",
    key: "/",
    label: "My Storage",
    element: <MyStorage />,
    icon: <DashboardFilled />,
  },
  {
    path: "/trash",
    key: "/trash",
    label: "Trash",
    element: <Trash />,
    icon: <DeleteFilled />,
  },
  {
    path: "/folder/:folderID",
    key: "/folder/:folderID",
    element: <FolderPage />,
    hidden: true,
  },
];
export default routes;
