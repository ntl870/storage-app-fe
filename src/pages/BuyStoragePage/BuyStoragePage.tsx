import { CloudOutlined } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
import { StoragePlanItem } from "./components/StoragePlanItem";
import { useGetAllPackagesQuery } from "@generated/schemas";
import useCurrentUser from "@hooks/useCurrentUser";

export const BuyStoragePage = () => {
  const { currentPackageID } = useCurrentUser();
  const { data } = useGetAllPackagesQuery({
    fetchPolicy: "cache-and-network",
  });

  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-3/4 my-0 mx-auto">
        <Row justify="center" className="text-center">
          <Col span={24}>
            <CloudOutlined className="text-8xl" />
          </Col>
          <Col span={24}>
            <Typography.Text className="text-lg font-medium">
              {`Choose the plan that's right for you`}
            </Typography.Text>
          </Col>
        </Row>
        <Row className="p-8 min-h-[20rem]" gutter={[16, 16]}>
          {data?.getAllPackages.map((plan) => (
            <Col md={24} xl={8} key={plan.ID}>
              <StoragePlanItem
                storage={plan.maxStorage}
                name={plan.name}
                price={plan.price}
                detail={plan.detail}
                isCurrentPlan={plan.ID === currentPackageID}
                packageID={plan.ID}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};
