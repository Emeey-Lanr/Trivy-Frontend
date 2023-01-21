import { FaLightbulb, FaSearch } from "react-icons/fa";
import bestStudent from "../Images/bestStudent.jpg";
import "../styles/navbar.css";

const DashbarNav = () => {
  return (
    <div className="w-10p h-11 bg-dashback-100  fixed top-0 flex justify-center items-center">
      <div className="w-10p  h-8 mx-auto bg-white shadow-sm ">
        <div className="flex h-8 justify-between items-center ml-3">
          <div className="flex items-center h-8">
            <div>
              <p>Jaff Quiz</p>
            </div>
            <div className="ml-5 inputbtn">
              <button>
                <FaSearch style={{ color: "#969696" }} />
              </button>
              <input type="text" placeholder="Search....." />
            </div>
          </div>
          <div className="flex h-8 items-center">
            <div className="w-5 h-5 border-2 border-green-like-100">
              <img
                src={bestStudent}
                alt=""
                className="w-5 h-5 rounded-5 object-cover"
              />
            </div>
            <div>
              <button>
                <FaLightbulb />
              </button>
            </div>
            <div className=" sidebarshow:hidden">pkjh</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashbarNav;
