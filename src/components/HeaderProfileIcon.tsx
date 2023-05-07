import { LogoutOutlined, ProfileOutlined } from "@ant-design/icons";
import useAuth from "@hooks/useAuth";
import useCurrentUser from "@hooks/useCurrentUser";
import useRouter from "@hooks/useRouter";
import { getBase64StringOfImage, getGeneratedAvatar } from "@utils/tools";
import { Avatar, Dropdown, MenuProps } from "antd";

export const HeaderProfileIcon = () => {
  const { logout } = useAuth();
  const { ID, avatar } = useCurrentUser();
  const { navigate } = useRouter();

  const items: MenuProps["items"] = [
    {
      label: "Profile",
      key: "0",
      icon: <ProfileOutlined />,
      onClick: () => navigate("/profile"),
    },
    {
      label: "Logout",
      key: "1",
      icon: <LogoutOutlined color="danger" />,
      onClick: logout,
    },
  ];

  return (
    <Dropdown
      arrow
      menu={{ items }}
      trigger={["click"]}
      className="cursor-pointer"
    >
      <Avatar
        size="large"
        src={
          !avatar
            ? getGeneratedAvatar(String(ID))
            : getBase64StringOfImage(avatar)
        }
      />
    </Dropdown>
  );
};
