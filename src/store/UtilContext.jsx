import {createContext} from "react";
export const UtilContext = createContext({
  truncateString: () => {},
  getCurrentDate: () => {},
  getCurrentDateString: () => {},
});

export default function UtilContextComponent({children}) {
  function truncateString(str, max = 50) {
    if (str.length > max) {
      return str.slice(0, max) + "...";
    }
    return str;
  }

  // ! Deprecated ! \\
  // ! function getCurrentDate() {
  // !   const date = new Date();
  // !   return date;
  // ! }
  // ! function getCurrentDateString() {
  // !   return getCurrentDate().toLocaleDateString();
  // ! }

  const utils = {truncateString};

  return <UtilContext.Provider value={utils}>{children}</UtilContext.Provider>;
}
