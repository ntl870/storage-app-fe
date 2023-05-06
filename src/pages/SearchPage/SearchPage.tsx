import { FileOutlined, FolderOutlined } from "@ant-design/icons";
import { useSearchFilesAndFoldersQuery } from "@generated/schemas";
import useRouter from "@hooks/useRouter";
import { Button, Col, Empty, List, Row, Spin, Typography } from "antd";

export const SearchPage = () => {
  const { searchParamsObject, navigate } = useRouter();

  const { data, loading } = useSearchFilesAndFoldersQuery({
    variables: {
      search: searchParamsObject.query,
    },
    fetchPolicy: "cache-and-network",
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );

  if (
    !data?.searchFilesAndFolders.files?.length &&
    !data?.searchFilesAndFolders.folders?.length
  )
    return (
      <div className="flex justify-center items-center h-full">
        <Empty />
      </div>
    );

  return (
    <Row gutter={[16, 16]} className="p-4 bg-white h-full">
      <Col span={12}>
        <Typography.Title>Folders</Typography.Title>
        <List
          itemLayout="horizontal"
          dataSource={data?.searchFilesAndFolders.folders}
          renderItem={(folder) => (
            <List.Item>
              <Button
                type="text"
                className="w-full text-left"
                onClick={() => navigate(`/folder/${folder.ID}`)}
              >
                <FolderOutlined />
                {folder.name}
              </Button>
            </List.Item>
          )}
        />
      </Col>
      <Col span={12}>
        <Typography.Title>Files</Typography.Title>
        <List
          itemLayout="horizontal"
          dataSource={data?.searchFilesAndFolders.files}
          renderItem={(file) => (
            <List.Item>
              <Button
                type="text"
                className="w-full text-left"
                onClick={() => navigate(`/file/${file.ID}`)}
              >
                <FileOutlined />
                {file.name}
              </Button>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};
