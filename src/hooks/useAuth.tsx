import { useLocalStorage } from "@utils/tools";
import useRouter from "./useRouter";

const useAuth = () => {
  const { navigate } = useRouter();
  const { deleteLocalStorage } = useLocalStorage();

  const logout = () => {
    deleteLocalStorage("token");
    navigate("/login", {
      replace: true,
    });
  };

  return { logout };
};

export default useAuth;
