import { FaWarehouse } from "react-icons/fa";
import { SlPeople, SlSettings } from "react-icons/sl";
import BorderBottomLine from "./BorderBottomLine";
import { appContext } from "../App";
import { useContext } from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const { showSideBar, sidebarBOxShadow, setSideBarBoxShadow } =
    useContext(appContext);
  return (
    <div
      className={`w-dw h-9p pb-3 fixed bottom-0 left-0 bg-dashback-100  rounded-r-sideedge overflow-y-auto  ${showSideBar === "hidden" ? `sidebarNone: hidden` :`sidebarNone: block` }`}
    >
      <Link
        to="/admindashboard"
        className={`flex justify-center align-middle w-9p mx-auto  mt-5 py-4 rounded-sideicon ${
          sidebarBOxShadow === 1 && `shadow - sm bg-white`
        } hover:bg-gray`}
      >
        <div className="w-10p">
          <div className="flex justify-center align-middle w-6 h-6 mx-auto py-2 bg-green-like-100 rounded-sideicon">
            <FaWarehouse className="text-white" />
          </div>
          <div className="w-10p">
            <p className="text-center font-light my-1"> Dashboard</p>
          </div>
        </div>
      </Link>
      <BorderBottomLine />
      <Link
        to="/primary/create"
        className={`flex justify-center align-middle w-9p mx-auto  mt-5 py-4 rounded-sideicon ${
          sidebarBOxShadow === 2 && `shadow - sm bg-white`
        }  hover:bg-gray`}
      >
        <div className="w-10p">
          <div className="flex justify-center align-middle w-6 h-6 mx-auto py-2 bg-green-like-100 rounded-sideicon ">
            <SlPeople className="text-white" />
          </div>
          <div className="w-10p">
            <p className="text-center font-light my-1"> Primary</p>
          </div>
        </div>
      </Link>
      <BorderBottomLine />
      <Link
        to="/junior/create"
        className={`flex justify-center align-middle w-9p mx-auto  mt-5 py-4 rounded-sideicon ${
          sidebarBOxShadow === 3 && `shadow - sm bg-white`
        } hover:bg-gray`}
      >
        <div className="w-10p">
          <div className="flex justify-center align-middle w-6 h-6 mx-auto py-2 bg-green-like-100 rounded-sideicon">
            <SlPeople className="text-white" />
          </div>
          <div className="w-10p">
            <p className="text-center font-light my-1">Jss</p>
          </div>
        </div>
      </Link>
      <BorderBottomLine />
      <Link
        to="/senior/create"
        className={`flex justify-center align-middle w-9p mx-auto border-1 border-solid border-white  mt-5 py-4 rounded-sideicon ${
          sidebarBOxShadow === 4 && `shadow - sm bg-white`
        } hover:bg-gray  hover:transition`}
      >
        <div className="w-10p ">
          <div className="flex justify-center align-middle w-6 h-6 mx-auto py-2 bg-green-like-100 rounded-sideicon">
            <SlPeople className="text-white" />
          </div>
          <div className="w-10p">
            <p className="text-center font-light my-1"> Sss</p>
          </div>
        </div>
      </Link>
      <BorderBottomLine />
      <Link
        to="/admin/setting"
        className={`flex justify-center align-middle w-9p mx-auto border-1 border-solid border-white  mt-5 py-4 rounded-sideicon ${
          sidebarBOxShadow === 5 && `shadow - sm bg-white`
        } hover:bg-gray  hover:transition`}
      >
        <div className="w-10p ">
          <div className="flex justify-center align-middle w-6 h-6 mx-auto py-2 bg-green-like-100 rounded-sideicon">
            <SlSettings className="text-white" />
          </div>
          <div className="w-10p">
            <p className="text-center font-light my-1"> Settting</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
