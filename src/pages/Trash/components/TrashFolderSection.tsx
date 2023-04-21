import { DeleteOutlined, FolderFilled, RedoOutlined } from '@ant-design/icons';
import { Folder, useDeleteFolderMutation, useMoveFolderOutOfTrashMutation } from '@generated/schemas';
import { MenuProps, Row, Dropdown, Col, Typography } from 'antd';
import styled from 'styled-components';
import { useAlert } from '@hooks/useAlert';

const StyledItem = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const { Text } = Typography;

interface Props {
  folders: Folder[];
  handleClickFolder?: (item: Folder) => void;
  selectedItem: Folder | null;
  refetch: () => void;
}

export const TrashFolderSection = ({ folders, selectedItem, handleClickFolder, refetch }: Props) => {
  const { showSuccessNotification, showErrorNotification } = useAlert();
  const [moveFolderOutOfTrash] = useMoveFolderOutOfTrashMutation();
  const [deleteFolder] = useDeleteFolderMutation();

  const getItems = (item: Folder): MenuProps['items'] => [
    {
      label: 'Restore',
      key: '1',
      icon: <RedoOutlined />,
      onClick: async () => {
        try {
          const { data } = await moveFolderOutOfTrash({
            variables: {
              folderID: item.ID,
            },
          });
          refetch();
          showSuccessNotification(data?.moveFolderOutOfTrash || '');
        } catch (err) {
          showErrorNotification((err as Error).message);
        }
      },
    },
    {
      label: 'Delete Forever',
      key: '2',
      icon: <DeleteOutlined />,
      onClick: async () => {
        try {
          const { data } = await deleteFolder({
            variables: {
              folderID: item.ID,
            },
          });
          refetch();
          showSuccessNotification(data?.deleteFolder || '');
        } catch (err) {
          showErrorNotification((err as Error).message);
        }
      },
    },
  ];
  return (
    <Row className="ml-7">
      {folders?.map((folder) => (
        <Dropdown menu={{ items: getItems(folder) }} key={folder.ID} trigger={['contextMenu']}>
          <Col className="m-4">
            <StyledItem
              className={`p-3 flex flex-row items-center min-w-[17rem] max-w-[17rem] ${
                selectedItem?.ID === folder.ID ? 'bg-blue-100' : 'bg-white hover:bg-neutral-100'
              }`}
              onClick={() => handleClickFolder?.(folder as Folder)}
            >
              <FolderFilled className="text-xl mr-3 flex items-center" />
              <Text className="inline-block truncate select-none font-semibold">{folder.name}</Text>
            </StyledItem>
          </Col>
        </Dropdown>
      ))}
    </Row>
  );
};
