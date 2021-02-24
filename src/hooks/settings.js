import { useContext } from "react";
import SettingsContext from "../context/settings";

export const useSettings = () => {
  const context = useContext(SettingsContext);
  return context;
};
