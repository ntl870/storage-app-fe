import { DeleteOutlined, LaptopOutlined } from "@ant-design/icons";
import {
  Computer,
  useGetUserComputersQuery,
  useRemoveComputerMutation,
} from "@generated/schemas";
import { useAlert } from "@hooks/useAlert";
import { StyledItem } from "@pages/FolderPage/components/FolderSection";
import { Col, Dropdown, Empty, Modal, Row, Tooltip, Typography } from "antd";
import { useState } from "react";

export const ComputerPage = () => {
  const { showErrorNotification, showSuccessNotification } = useAlert();
  const { data, refetch } = useGetUserComputersQuery();
  const [removeComputer] = useRemoveComputerMutation();
  const [selectedItem, setSelectedItem] = useState<Computer | null>(null);
  const [deleteItem, setDeleteItem] = useState<Computer | null>(null);

  const handleDeleteComputer = async () => {
    try {
      const { data } = await removeComputer({
        variables: {
          macAddress: deleteItem?.macAddress ?? "",
        },
      });
      showSuccessNotification(data?.removeComputer || "");
      await refetch();
      setDeleteItem(null);
    } catch (err) {
      showErrorNotification((err as Error).message);
    }
  };

  const getItems = (item: Computer) => [
    {
      label: "Remove",
      key: "1",
      icon: <DeleteOutlined />,
      onClick: () => setDeleteItem(item),
    },
  ];

  const handleClickComputer = (item: Computer) => {
    setSelectedItem(item);
  };

  if (!data?.getUserComputers.length)
    return (
      <div className="flex justify-center items-center h-full">
        <Empty />
      </div>
    );

  return (
    <>
      <div className="pt-5">
        <Typography.Title level={4} className="ml-4 font-normal">
          Sync Computers
        </Typography.Title>
        <Row className="ml-7">
          {data?.getUserComputers?.map((computer) => (
            <Dropdown
              menu={{ items: getItems(computer as Computer) }}
              key={computer.ID}
              trigger={["contextMenu"]}
            >
              <Col className="m-4">
                <Tooltip title={computer.name}>
                  <StyledItem
                    className={`p-3 flex flex-row items-center min-w-[17rem] max-w-[17rem] ${
                      selectedItem?.ID === computer.ID
                        ? "bg-blue-100"
                        : "bg-white hover:bg-neutral-100"
                    }`}
                    onClick={() => handleClickComputer?.(computer as Computer)}
                  >
                    <LaptopOutlined className="text-xl mr-3 flex items-center" />
                    <Typography.Text className="inline-block truncate select-none font-semibold">
                      {computer.name}
                    </Typography.Text>
                  </StyledItem>
                </Tooltip>
              </Col>
            </Dropdown>
          ))}
        </Row>
      </div>
      <Modal
        title="Confirm delete computer"
        open={!!deleteItem}
        onCancel={() => setDeleteItem(null)}
        onOk={handleDeleteComputer}
      >
        <p>Are you sure you want to delete this computer?</p>
      </Modal>
    </>
  );
};
