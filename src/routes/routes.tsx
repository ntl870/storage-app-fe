import loadable from "@loadable/component";
import {
  DashboardFilled,
  DeleteFilled,
  ShareAltOutlined,
  StarOutlined,
} from "@ant-design/icons";

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

const FilePage = loadable(() =>
  import("@pages/FilePage/FilePage").then((module) => ({
    default: module.FilePage,
  }))
);

const SharedFoldersPage = loadable(() =>
  import("@pages/SharedFoldersPage/ShareFoldersPage").then((module) => ({
    default: module.ShareFoldersPage,
  }))
);

const StarredPage = loadable(() =>
  import("@pages/StarredPage/StarredPage").then((module) => ({
    default: module.StarredPage,
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
  {
    path: "/file/:fileID",
    key: "/file/:fileID",
    element: <FilePage />,
    hidden: true,
  },
  {
    path: "/shared-folders",
    key: "/shared-folders",
    element: <SharedFoldersPage />,
    label: "Shared with me",
    icon: <ShareAltOutlined />,
  },
  {
    path: "/starred",
    key: "/starred",
    element: <StarredPage />,
    label: "Starred",
    icon: <StarOutlined />,
  },
];
export default routes;
