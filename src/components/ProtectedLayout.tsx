import { Layout } from "antd";
import { Route } from "../routes/PrivateRoute";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  routes: Route[];
}

export const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <Layout className="min-h-screen">
      <Layout className="ml-300px min-h-screen overflow-y-hidden">
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};
