import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { Route } from "../routes/PrivateRoute";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  routes: Route[];
}

export const ProtectedLayout = ({ children, routes }: ProtectedLayoutProps) => {
  return (
    <Layout className="min-h-screen">
      <Sider breakpoint="lg" collapsible theme="light">
        <div className="logo" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["/"]}
          items={routes}
        />
      </Sider>
      <Layout className="ml-300px min-h-screen overflow-y-hidden">
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};
