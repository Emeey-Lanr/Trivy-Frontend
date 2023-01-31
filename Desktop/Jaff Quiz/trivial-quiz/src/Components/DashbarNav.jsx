import { FaLightbulb, FaSearch } from "react-icons/fa";
import { GoThreeBars } from "react-icons/go";
import bestStudent from "../Images/bestStudent.jpg";
import "../styles/navbar.css";
import { appContext } from "../App";
import { useContext } from "react";
const DashbarNav = () => {
  const { showSideBar, setShowSidebar } = useContext(appContext);
  const handleShowSideBar = () => {
    if (showSideBar === "hidden") {
      setShowSidebar("block");
    } else {
      setShowSidebar("hidden");
    }
  };
  return (
    <div className="w-10p h-11 bg-dashback-100  fixed top-0 flex justify-center items-center sidebarNone:h-12">
      <div className="w-10p  h-8 mx-auto bg-white shadow-sm sidebarNone:h-9">
        <div className="flex h-8 justify-between items-center ml-3 sidebarNone:h-9 ">
          <div className="flex items-center h-8 ">
            <div className="w-100 sidebarNone:hidden">
              <p>Jaff Quiz</p>
            </div>
            <div className="ml-5 inputbtn sidebarNone:ml-0">
              <button>
                <FaSearch style={{ color: "#969696" }} />
              </button>
              <input type="text" placeholder="Search....." />
            </div>
          </div>
          <div className="flex justify-between h-8 items-center">
            <div className="w-5 h-5 mr-4 border-2 border-green-like-100 flex justify-center items-center">
              <img
                src={bestStudent}
                alt=""
                className="w-4 h-4 rounded-5 object-cover"
              />
            </div>
            <div className="mr-4 sidebarshow:hidden sidebarNone:block">
              <button onClick={() => handleShowSideBar()}>
                <GoThreeBars className="h-9 w-4 text-green-like-100" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashbarNav;
