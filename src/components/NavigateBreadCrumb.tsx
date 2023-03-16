import { Breadcrumb, Skeleton } from "antd";
import useRouter from "@hooks/useRouter";
import { useMemo } from "react";
import { useGetArrayOfRootFoldersNameQuery } from "@generated/schemas";
import { Link } from "react-router-dom";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";

const NavigateBreadCrumb = () => {
  const { splittedPathname } = useRouter();

  const { data, loading } = useGetArrayOfRootFoldersNameQuery({
    variables: {
      folderID: splittedPathname[1],
    },
    fetchPolicy: "cache-and-network",
    skip: !splittedPathname[0],
  });

  const items: ItemType[] = useMemo(() => {
    if (!data?.getArrayOfRootFoldersName.length) return [];

    return data?.getArrayOfRootFoldersName.map((item, index) => ({
      title: (
        <Link
          to={
            index === data?.getArrayOfRootFoldersName.length - 1
              ? "/"
              : `/folder/${item.ID}`
          }
        >
          {index === data?.getArrayOfRootFoldersName.length - 1
            ? "Home"
            : item.name}
        </Link>
      ),
    }));
  }, [data?.getArrayOfRootFoldersName]).reverse();

  if (loading) {
    return <Skeleton.Button active size="small" className="ml-4 mt-2 w-32" />;
  }

  return <Breadcrumb items={items} className="text-lg ml-4 mt-4" />;
};

export default NavigateBreadCrumb;
