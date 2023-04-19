import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PrivateRoute } from "./routes/PrivateRoute";
import Login from "./pages/Login/Login";
import "antd/dist/reset.css";
import "./index.css";
import "./configs/theme/index.less";
import { AlertProvider } from "./context/AlertContext";
import SignUp from "@pages/SignUp/SignUp";

function App() {
  return (
    <AlertProvider>
      <Routes>
        <Route
          path="/*"
          element={
            <ProtectedRoute isProtected>
              <PrivateRoute />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute>
              <SignUp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AlertProvider>
  );
}

export default App;
