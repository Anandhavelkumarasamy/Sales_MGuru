import { useSelector } from "react-redux";
import { storedataprops } from "../@types/store";

export const useToken = () => {
  return useSelector((state: storedataprops) => state.authLogin.token);
};
