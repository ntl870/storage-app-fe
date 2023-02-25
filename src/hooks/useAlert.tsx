import { useContext } from "react";
import { AlertContext } from "../context/AlertContext";

export const useAlert = () => {
  return useContext(AlertContext);
};
