import CreateModal from "./CreateModal";
import DashbarNav from "./DashbarNav";
import Sidebar from "./Sidebar";
import CreatView from "./CreatView";
import { useContext, useEffect, useState } from "react";
import { appContext } from "../App";
import SideBarBack from "./SideBarBack";
const PrimaryCreateView = () => {
  const { dashboardFuction, setSideBarBoxShadow, setShowSidebar, setShowCreateModal, setCurrentSet } = useContext(appContext);
  useEffect(() => {
    setSideBarBoxShadow(2);
    setCurrentSet("Primary");
    setShowCreateModal(false)
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
        <Sidebar />
        <DashbarNav />

        <CreateModal />
      </div>
    </>
  );
};

export default PrimaryCreateView;
