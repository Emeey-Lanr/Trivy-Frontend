import CreateModal from "./CreateModal";
import CreatView from "./CreatView";
import DashbarNav from "./DashbarNav";
import Sidebar from "./Sidebar";
import { useContext, useEffect, useState } from "react";
import { appContext } from "../App";
import SideBarBack from "./SideBarBack";
const JuniorCreateView = () => {
  const {dashboardFuction, setSideBarBoxShadow, setShowSidebar, setShowCreateModal, setCurrentSet } =
    useContext(appContext);
  useEffect(() => {
    setSideBarBoxShadow(3);
    setCurrentSet("Junior");
    setShowCreateModal(false);
    dashboardFuction()
     setShowSidebar("hidden")
  }, []);
  return (
    <>
      <div className="w-100">
        <div className="w-10p bg-dashback-100">
          <CreatView />
        </div>
        <SideBarBack />
        <DashbarNav />
        <Sidebar />
        <CreateModal />
      </div>
    </>
  );
};

export default JuniorCreateView;
