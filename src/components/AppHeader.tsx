import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { HeaderProfileIcon } from "./HeaderProfileIcon";
import { SearchBar } from "./SearchBar";

interface Props {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const AppHeader = ({ collapsed, setCollapsed }: Props) => {
  return (
    <Layout.Header className="bg-white px-4 flex justify-between items-center">
      <div className="flex flex-row">
        <Button
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          type="text"
          className="mr-4"
        />
        <SearchBar />
      </div>
      <HeaderProfileIcon />
    </Layout.Header>
  );
};
