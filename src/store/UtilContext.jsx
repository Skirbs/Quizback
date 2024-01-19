import {createContext} from "react";
export const UtilContext = createContext({truncateString: () => {}});

export default function UtilContextComponent({children}) {
  function truncateString(str, max = 50) {
    if (str.length > max) {
      return str.slice(0, max) + "...";
    }
    return str;
  }

  const utils = {truncateString};

  return <UtilContext.Provider value={utils}>{children}</UtilContext.Provider>;
}
