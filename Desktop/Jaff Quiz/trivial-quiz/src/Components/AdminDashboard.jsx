import DashbarNav from "./DashbarNav";
import Sidebar from "./Sidebar";
import "../styles/dashboard.css";
import bestStudent from "../Images/bestStudent.jpg";
import DashboardChart from "./DashBoardChart";
import { FaRegUserCircle } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { appContext } from "../App";
import SideBarBack from "./SideBarBack";
const AdminDashboard = () => {
  const { setSideBarBoxShadow } = useContext(appContext);
  useEffect(() => {
    setSideBarBoxShadow(1);
  }, []);
  const [userRecords, setUserRecords] = useState([
    {
      name: "oyelowo",
      subject: [
        { name: "english", score: 1 },
        { name: "maths", score: 2 },
        { name: "french", score: 30 },
      ],
      total: 90,
    },
    {
      name: "mark",
      subject: [
        { name: "english", score: 60 },
        { name: "maths", score: 20 },
        { name: "french", score: 23 },
      ],
      total: 90,
    },
    {
      name: "rock",
      subject: [
        { name: "english", score: 30 },
        { name: "maths", score: 30 },
        { name: "french", score: 30 },
      ],
      total: 90,
    },
  ]);
  return (
    <div className="bg-dashback-100 w-10p">
      <div className="w-9p ml-auto sidebarNone:w-10p">
        <div className="w-9p bg-green-like-100 h-dbh mx-auto"></div>

        {/* Top Scorers */}
        <div className="top-scorer">
          <div className="beststudent bg-white shadow-lg mt-01">
            <div>
              <img
                src={bestStudent}
                alt=""
                className="h-dimage 10p object-cover"
              />
              <p className="border-b border-dashback-200 pt-2">
                Oyelowo Emmanuel
              </p>
            </div>
            <div className="flex justify-center items-center">
              <div>
                <p className="w-10px flex justify-center items-center text-xl">
                  <FaRegUserCircle className="text-orange-like-100 w-9" />
                </p>
                <p className="text-xl font-light">Point:30</p>
              </div>
            </div>
          </div>
          <div className="beststudent bg-white shadow-lg">
            <div>
              <img
                src={bestStudent}
                alt=""
                className="h-dimage w-10p object-cover"
              ></img>
              <p className="border-b border-dashback-200 pt-2">
                Oyelowo Emmanuel
              </p>
            </div>
            <div className="flex justify-center items-center">
              <div>
                <p className="w-10px flex justify-center items-center text-xl">
                  <FaRegUserCircle className="text-yellow-like-100 w-9" />
                </p>
                <p className="text-xl font-light">Point:30</p>
              </div>
            </div>
          </div>
          <div className="beststudent bg-white shadow-lg">
            <div>
              <img
                src={bestStudent}
                alt=""
                className="h-dimage w-10p object-cover"
              ></img>
              <p className="border border-dashback-200 rounded-sideicon text-center">
                Oyelowo Emmanuel
              </p>
            </div>
            <div className="flex justify-center items-center">
              <div>
                <p className="w-10px flex justify-center items-center text-xl">
                  <FaRegUserCircle className="text-red-like-100 w-9" />
                </p>
                <p className="text-xl font-light">Point:30</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-8p mx-auto">
        <div className="w-9p ml-auto bg-chartbg sidebarNone:w-9p">
          <DashboardChart />
        </div>
      </div>

      {/* All payer total score */}
      <div className="bg-white w-7p mx-auto h-dashtable overflow-x-auto shadow-sm mt-10 rounded-sideicon sidebarNone:w-9p">
        <div className="w-10p sticky top-0">
          <p className="w-3p bg-green-like-100 py-2 rounded-sideicon mx-auto text-center text-white my-3">
            Participants
          </p>
        </div>

        <div className="w-scoreResultSize">
          <div className="flex justify-around w-10p">
            <div>
              <p>Index</p>
              {userRecords.map((_, id) => (
                <div>{id}</div>
              ))}
            </div>

            <div>
              <p>Name</p>
              {userRecords.map((name) => (
                <div>
                  <p>{name.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Side Bar */}
      <SideBarBack />
      <DashbarNav />
      <Sidebar />
    </div>
  );
};

export default AdminDashboard;
