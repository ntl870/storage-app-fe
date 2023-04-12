import { useGetMeQuery } from "../generated/schemas";

const useCurrentUser = () => {
  const { data } = useGetMeQuery({
    fetchPolicy: "cache-and-network",
  });

  return {
    ID: data?.getMe.ID,
    name: data?.getMe.name,
    email: data?.getMe.email,
    rootFolderID: data?.getMe?.rootFolder?.ID,
    avatar: data?.getMe.avatar,
  };
};

export default useCurrentUser;
