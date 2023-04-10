import loadable from "@loadable/component";
import { DashboardFilled, DeleteFilled } from "@ant-design/icons";

export interface Route {
  path: string;
  label?: string;
  element: React.ReactNode;
  icon?: React.ReactNode;
  hidden?: boolean;
  key: string;
}

const MyStorage = loadable(() =>
  import("@pages/MyStorage/MyStorage").then((module) => ({
    default: module.MyStorage,
  }))
);

const Trash = loadable(() =>
  import("@pages/Trash/Trash").then((module) => ({
    default: module.Trash,
  }))
);

const FolderPage = loadable(() =>
  import("@pages/FolderPage/FolderPage").then((module) => ({
    default: module.FolderPage,
  }))
);

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
