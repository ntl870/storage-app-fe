import { Alert, AlertProps } from "antd";
import { createContext, useRef, useState } from "react";

const initialValues = {
  message: "",
  visible: false,
  type: "success",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  showSuccessAlert: (_message: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  showErrorAlert: (_message: string) => {},
};

export const AlertContext = createContext(initialValues);

export const AlertProvider = ({ children }: any) => {
  const [alertValue, setAlertValue] = useState(initialValues);

  const hideAlert = () => {
    setAlertValue((prev) => ({
      ...prev,
      visible: false,
    }));
  };

  const value = {
    showSuccessAlert: (message: string) => {
      setAlertValue((prev) => ({
        ...prev,
        visible: true,
        message,
        type: "success",
      }));
      setTimeout(() => {
        hideAlert();
      }, 3000);
    },
    showErrorAlert: (message: string) => {
      setAlertValue((prev) => ({
        ...prev,
        visible: true,
        message,
        type: "error",
      }));
      setTimeout(() => {
        hideAlert();
      }, 3000);
    },
    visible: alertValue.visible,
    message: alertValue.message,
    type: alertValue.type,
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
      {alertValue.visible && (
        <Alert
          className="absolute top-20 right-3 max-w-2xl min-w-350px z-50"
          message={alertValue.type}
          description={alertValue.message}
          type={alertValue.type as AlertProps["type"]}
          showIcon
        />
      )}
    </AlertContext.Provider>
  );
};
