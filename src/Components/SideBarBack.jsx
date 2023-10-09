import { appContext } from "../App";
import { useContext } from "react";
import "../styles/sidebar.css";
const SidBarBack = () => {
  const { showSideBar } = useContext(appContext);
  return (
    <div className={`backmodal w-10p h-10p fixed top-0 bg-modalback ${showSideBar}`}
    ></div>
  );
};

export default SidBarBack;
