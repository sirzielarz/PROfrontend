import { createContext /*useState*/ } from "react";

export type AppShellTypeElements = {
  openedMenuState: AppShellOpenedType;
};
export type AppShellOpenedType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
type AppShellProviderProps = {
  children: React.ReactNode;
};

export const AppShellContext = createContext(null);

const AppShellContextProvider = ({ children }: AppShellProviderProps) => {
  // const [opened, setOpen] = useState<AppShellOpenedType>({
  //   open: false,
  //   setOpen: () => {},
  // });

  return (
    <AppShellContext.Provider value={null}>{children}</AppShellContext.Provider>
  );
};

export default AppShellContextProvider;
