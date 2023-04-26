import { useCreateCheckoutSessionMutation } from "@generated/schemas";
import { useAlert } from "@hooks/useAlert";
import useCurrentUser from "@hooks/useCurrentUser";
import { Button, Card, Divider, Typography } from "antd";
import styled from "styled-components";

const StyledCard = styled(Card)`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 100%;
  .ant-card-body {
    padding-right: 0;
    padding-left: 0;
    padding-bottom: 0;
    height: 100%;
  }
`;
interface Props {
  storage: number;
  name: string;
  price: number;
  isCurrentPlan: boolean;
  detail: string;
  packageID: number;
}

export const StoragePlanItem = ({
  storage,
  name,
  price,
  isCurrentPlan,
  detail,
  packageID,
}: Props) => {
  const { showErrorNotification } = useAlert();
  const { currentPackageID } = useCurrentUser();
  const [createCheckoutSession, { loading }] =
    useCreateCheckoutSessionMutation();

  const handleCreateCheckoutSession = async () => {
    try {
      const { data } = await createCheckoutSession({
        variables: {
          packageId: packageID,
        },
      });

      if (data?.createCheckoutSession) {
        window.location.href = data.createCheckoutSession;
      }
    } catch (err) {
      showErrorNotification((err as Error).message);
    }
  };

  return (
    <StyledCard>
      <div className="flex flex-col justify-evenly items-center h-full">
        <div className="flex flex-col justify-center text-center">
          <Typography.Text className="text-lg">{name}</Typography.Text>
          <Typography.Text className=" text-4xl font-medium">
            {storage} GB
          </Typography.Text>
          <Typography.Text className="text-lg font-medium text-green-500">
            ${price}
          </Typography.Text>
        </div>

        {isCurrentPlan && (
          <Button type="default" disabled={isCurrentPlan}>
            Current Plan
          </Button>
        )}

        {!isCurrentPlan && (
          <Button
            type="primary"
            onClick={handleCreateCheckoutSession}
            loading={loading}
            className={`${
              Number(currentPackageID) > packageID ? "invisible" : ""
            }`}
          >
            Buy Now
          </Button>
        )}

        <Divider className="mt-4 mb-1" />

        <Typography.Text className="text-xl">{detail}</Typography.Text>
      </div>
    </StyledCard>
  );
};
