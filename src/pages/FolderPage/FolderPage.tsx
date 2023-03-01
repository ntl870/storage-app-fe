import useRouter from "../../hooks/useRouter";
import {
  useGetUserFoldersQuery,
  Folder,
  useGetFilesByFolderQuery,
  File,
} from "../../generated/schemas";
import { FolderFilled } from "@ant-design/icons";
import { Row, Col, Typography } from "antd";
import ItemCard from "../../components/ItemCard";
import ItemCardContent from "../../components/ItemCardContent";
import { useState } from "react";
import { FileSection } from "./FileSection";
import useCurrentUser from "../../hooks/useCurrentUser";

export const FolderPage = () => {
  const { params, navigate } = useRouter();
  const { rootFolderID } = useCurrentUser();
  const [selectedItem, setSelectedItem] = useState<Folder | File | null>(null);

  const { data } = useGetUserFoldersQuery({
    variables: {
      folderID: params.folderID || rootFolderID || "",
    },
    skip: !params.folderID && !rootFolderID,
    fetchPolicy: "cache-and-network",
  });

  const { data: filesData } = useGetFilesByFolderQuery({
    variables: {
      folderID: params.folderID || rootFolderID || "",
    },
    skip: !params.folderID && !rootFolderID,
    fetchPolicy: "cache-and-network",
  });

  const navigateToFolder = (folderID: string) => {
    navigate(`/folder/${folderID}`);
  };

  const handleClickFolder = (item: Folder) => {
    if (selectedItem && selectedItem.ID === item?.ID) {
      navigateToFolder(String(selectedItem.ID));
      return;
    }
    setSelectedItem(item);
  };

  const handleClickFile = (item: File | null) => {
    if (selectedItem && selectedItem.ID === item?.ID) {
      return;
    }
    setSelectedItem(item);
  };

  return (
    <>
      <Typography.Text className="inline-block p-4 font-semibold">
        Folders
      </Typography.Text>
      <Row className="ml-7">
        {data?.getUserFolders.map((item) => (
          <Col className="m-4" key={item.ID}>
            <ItemCard
              cover={<FolderFilled className="text-7xl mt-6" />}
              className="w-60"
              onClick={() => handleClickFolder(item as Folder)}
            >
              <ItemCardContent
                className={`${
                  selectedItem?.ID === item.ID ? "bg-blue-100" : ""
                }`}
              >
                <Typography.Text className="w-full font-semibold pointer-events-none">
                  {item.name}
                </Typography.Text>
              </ItemCardContent>
            </ItemCard>
          </Col>
        ))}
      </Row>
      <Typography.Text className="inline-block p-4 font-semibold">
        Files
      </Typography.Text>
      <FileSection
        files={(filesData?.getFilesByFolder as File[]) || []}
        handleClickItem={handleClickFile}
        selectedItem={selectedItem}
      />
    </>
  );
};
