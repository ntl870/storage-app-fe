import { Route } from "@routes/routes";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import useRouter from "../hooks/useRouter";
import { AppHeader } from "./AppHeader";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  routes: Route[];
}

export const ProtectedLayout = ({ children, routes }: ProtectedLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { navigate, pathname } = useRouter();
  const onSelectItem = (key: string) => {
    navigate(key, {
      replace: true,
    });
  };
  return (
    <Layout className="min-h-screen">
      <Sider
        breakpoint="lg"
        collapsible
        theme="light"
        collapsedWidth="0"
        trigger={null}
        collapsed={collapsed}
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
      >
        <div className="logo" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[pathname]}
          items={routes}
          onSelect={({ key }) => onSelectItem(key)}
        />
      </Sider>
      <Layout className="ml-300px min-h-screen overflow-y-hidden">
        <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};
