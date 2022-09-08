import { createContext, useContext, useState } from "react";

export enum Page {
  Teachers = "Teachers",
  Groups = "Groups",
  Parents = "Parents",
  Children = "Children",
  Activities = "Activities",
  Announcements = "Announcements",
  Presence = "Presence",
}
interface Props {
  children: React.ReactNode;
}

type ContextType = {
  page: Page;
  setPage: (page: Page) => void;
};

const Context = createContext<ContextType>({
  page: Page.Teachers,
  setPage: (page) => console.warn("no page provider"),
});

export const usePage = () => useContext(Context);

export const PageStore: React.FC<Props> = ({ children }) => {
  const [page, setPage] = useState(Page.Teachers);
  return (
    <Context.Provider value={{ page, setPage }}>{children}</Context.Provider>
  );
};
