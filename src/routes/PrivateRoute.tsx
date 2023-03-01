import { ProtectedLayout } from "../components/ProtectedLayout";
import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardOutlined } from "@ant-design/icons";
import { MyStorage } from "../pages/MyStorage/MyStorage";
import { FolderPage } from "../pages/FolderPage/FolderPage";

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
    label: "Dashboard",
    element: <MyStorage />,
    icon: <DashboardOutlined />,
  },
  {
    path: "/folder/:folderID",
    key: "/folder/:folderID",
    element: <FolderPage />,
  },
];

export const PrivateRoute = () => {
  return (
    <ProtectedLayout routes={routes.filter((item) => !item.hidden)}>
      <Routes>
        {routes.map((route) => {
          return (
            <Route key={route.path} path={route.path} element={route.element} />
          );
        })}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ProtectedLayout>
  );
};
