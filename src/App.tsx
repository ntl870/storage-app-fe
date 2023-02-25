import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PrivateRoute } from "./routes/PrivateRoute";
import Login from "./pages/Login/Login";
import "antd/dist/reset.css";
import "./index.css";
import { AlertProvider } from "./context/AlertContext";

function App() {
  return (
    <AlertProvider
      value={{
        message: "",
        visible: false,
        type: "success",
      }}
    >
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
        {/* <Route
            path="/signup"
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          /> */}
      </Routes>
    </AlertProvider>
  );
}

export default App;
