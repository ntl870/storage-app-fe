import useRouter from "@hooks/useRouter";
import { Button, Result } from "antd";

export const TransactionSuccessPage = () => {
  const { navigate } = useRouter();
  return (
    <div className="h-full flex justify-center items-center">
      <Result
        status="success"
        title="Successfully Purchased"
        extra={[
          <Button type="primary" key="console" onClick={() => navigate("/")}>
            Go to homepage
          </Button>,
        ]}
      />
    </div>
  );
};
