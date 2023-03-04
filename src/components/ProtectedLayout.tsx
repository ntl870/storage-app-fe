import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { Route } from "../routes/PrivateRoute";
import useRouter from "../hooks/useRouter";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  routes: Route[];
}

export const ProtectedLayout = ({ children, routes }: ProtectedLayoutProps) => {
  const { navigate } = useRouter();

  const onSelectItem = (key: string) => {
    navigate(key, {
      replace: true,
    });
  };
  return (
    <Layout className="min-h-screen">
      <Sider breakpoint="lg" collapsible theme="light">
        <div className="logo" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["/"]}
          items={routes}
          onSelect={({ key }) => onSelectItem(key)}
        />
      </Sider>
      <Layout className="ml-300px min-h-screen overflow-y-hidden">
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};
