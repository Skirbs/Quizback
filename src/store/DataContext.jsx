import {createContext} from "react";
const DataContext = createContext();

function getData() {}

export default function DataContextComponent({children}) {
  const contextData = {};
  return <DataContext.Provider value="">{children}</DataContext.Provider>;
}
