import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { HeaderProfileIcon } from "./HeaderProfileIcon";

interface Props {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const AppHeader = ({ collapsed, setCollapsed }: Props) => {
  return (
    <Layout.Header className="bg-white px-4 flex justify-between items-center">
      <Button
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        type="text"
      ></Button>
      <HeaderProfileIcon />
    </Layout.Header>
  );
};
