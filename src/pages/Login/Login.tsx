import { Form, Input, Button, Checkbox, Row, Col, Typography } from "antd";
import { MutationLoginArgs, useLoginMutation } from "../../generated/schemas";
import { useAlert } from "../../hooks/useAlert";
import { useLocalStorage } from "../../utils/tools";
import useRouter from "../../hooks/useRouter";
import landingImg from "../../assets/landing.jpg";

const Login = () => {
  const [login, { loading }] = useLoginMutation();
  const { setLocalStorage } = useLocalStorage();
  const { showSuccessNotification, showErrorNotification } = useAlert();
  const { navigate } = useRouter();

  const onFinish = async ({ email, password }: MutationLoginArgs) => {
    try {
      const { data } = await login({
        variables: {
          email,
          password,
        },
      });
      setLocalStorage("token", data?.login || "");
      showSuccessNotification("Login successfully");
      navigate("/");
    } catch (err) {
      showErrorNotification((err as Error).message);
    }
  };

  return (
    <Row className="h-full">
      <Col
        span={12}
        className="flex flex-col justify-center items-center bg-[#1e2683]"
      >
        <img src={landingImg} className="w-96" alt="CloudStorage logo" />
      </Col>
      <Col span={12} className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-4">Login</h1>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="w-80 max-w-md"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input placeholder="Email" size="large" className="rounded-full" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              size="large"
              className="rounded-full"
            />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" className="mb-0">
            <Checkbox className="text-lg">Remember me</Checkbox>
          </Form.Item>
          <div className="mb-4">
            <Typography.Text>{`Haven't have an account yet ?`}</Typography.Text>
            <Button type="link" onClick={() => navigate("/signup")}>
              Sign up
            </Button>
          </div>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full rounded-full"
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
