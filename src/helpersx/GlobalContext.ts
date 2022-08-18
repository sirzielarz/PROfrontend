import { createContext } from "react";

type OpenedContextType = {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const iOpenedContextState = {
  opened: false,
  setOpened: () => {},
};

const GlobalContext = createContext<OpenedContextType>(iOpenedContextState);

export default GlobalContext;
