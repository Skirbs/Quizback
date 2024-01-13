import {createContext} from "react";
export const utilContext = createContext({truncateString: () => {}});

export default function UtilContextComponent({children}) {
  function truncateString(str, max = 50) {
    if (str.length > max) {
      return str.slice(0, max) + "...";
    }
    return str;
  }

  const utils = {truncateString};

  return <utilContext.Provider value={utils}>{children}</utilContext.Provider>;
}
