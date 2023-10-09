import { appContext } from "../App";
import { useContext } from "react";
const SidBarBack = () => {
  const { showSideBar } = useContext(appContext);
  return (
    <div
      className={`sidebarshow:hidden w-10p h-10p fixed top-0 bg-modalback ${showSideBar === "hidden" ? "sidebarNone:hidden" : "sidebarNone:block" } `}
    ></div>
  );
};

export default SidBarBack;
