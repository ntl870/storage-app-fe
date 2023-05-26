import loadable from "@loadable/component";
import {
  DashboardFilled,
  DeleteFilled,
  LaptopOutlined,
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

const BuyStoragePage = loadable(() =>
  import("@pages/BuyStoragePage/BuyStoragePage").then((module) => ({
    default: module.BuyStoragePage,
  }))
);

const SearchPage = loadable(() =>
  import("@pages/SearchPage/SearchPage").then((module) => ({
    default: module.SearchPage,
  }))
);

const ProfilePage = loadable(() =>
  import("@pages/ProfilePage/ProfilePage").then((module) => ({
    default: module.ProfilePage,
  }))
);

const TransactionSuccessPage = loadable(() =>
  import("@pages/TransactionSuccessPage/TransactionSuccessPage").then(
    (module) => ({
      default: module.TransactionSuccessPage,
    })
  )
);

const ComputerPage = loadable(() =>
  import("@pages/ComputerPage/ComputerPage").then((module) => ({
    default: module.ComputerPage,
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
  {
    path: "/buy-storage",
    key: "/buy-storage",
    element: <BuyStoragePage />,
    hidden: true,
  },
  {
    path: "/search",
    key: "/search",
    element: <SearchPage />,
    hidden: true,
  },
  {
    path: "/profile",
    key: "/profile",
    element: <ProfilePage />,
    hidden: true,
  },
  {
    path: "/transaction-success",
    key: "/transaction-success",
    element: <TransactionSuccessPage />,
    hidden: true,
  },
  {
    path: "/computers",
    key: "/computers",
    label: "Computers",
    icon: <LaptopOutlined />,
    element: <ComputerPage />,
  },
];
export default routes;
