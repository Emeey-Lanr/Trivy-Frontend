import DashbarNav from "./DashbarNav";
import Sidebar from "./Sidebar";
import "../styles/dashboard.css";
import bestStudent from "../Images/bestStudent.jpg";
import DashboardChart from "./DashBoardChart";
import { FaRegUserCircle } from "react-icons/fa";
import { useContext, useEffect, useState, createContext } from "react";
import { appContext } from "../App";
import SideBarBack from "./SideBarBack";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import "../styles/resultStyle.css"
// import bese from "../Images/bestStudent.jpg"
export const dashboardContext = createContext ()
const AdminDashboard = () => {
  const { adminDetails, setAdminDetails, adminEndPoint,dashboardFuction, setSideBarBoxShadow } =   useContext(appContext);

  useEffect(() => {
    setSideBarBoxShadow(1);
  // dashboardFuction()
  }, []);
  const [userRecords, setUserRecords] = useState([
    {
      playerName: "oyelowo",
      playerImage: bestStudent,
      subjectToBeDone: [
        { quizName: "english", score: 30 },
        { quizName: "Yoruba", score: 10 },
        { quizName: "Maths", score: 30},
        { quizName: "English", score: 10 },
      ],
      totalScore: 90,
    },
    {
      playerName: "Emmanuel",
      playerImage: bestStudent,
      subjectToBeDone: [
        { quizName: "english", score: 1 },
        { quizName: "english", score: 1 },
        { quizName: "english", score: 1 },
        { quizName: "english", score: 1 },
      ],
      totalScore: 90,
    },
    {
      playerName: "Dara",
      playerImage: bestStudent,
      subjectToBeDone: [
        { quizName: "english", score: 1 },
        { quizName: "english", score: 1 },
        { quizName: "english", score: 1 },
        { quizName: "english", score: 1 },
      ],
      totalScore: 90,
    },
    {
      playerName: "Wole",
      playerImage: bestStudent,
      subjectToBeDone: [
        { quizName: "english", score: 1 },
        { quizName: "english", score: 1 },
        { quizName: "english", score: 1 },
        { quizName: "english", score: 1 },
      ],
      totalScore: 90,
    },
    {
      playerName: "Kola",
      playerImage: bestStudent,
      subjectToBeDone: [
        { quizName: "english", score: 1 },
        { quizName: "english", score: 1 },
        { quizName: "english", score: 1 },
        { quizName: "english", score: 1 },
      ],
      totalScore: 90,
    },
    {
      playerName: "Tunde",
      playerImage: bestStudent,
      subjectToBeDone: [
        { quizName: "english", score: 1 },
        { quizName: "english", score: 1 },
        { quizName: "english", score: 1 },
        { quizName: "english", score: 1 },
      ],
      totalScore: 90,
    },
    {
      playerName: "Brain",
      playerImage: bestStudent,
      subjectToBeDone: [
        { quizName: "english", score: 1 },
        { quizName: "english", score: 1 },
        { quizName: "english", score: 1 },
        { quizName: "english", score: 1 },
      ],
      totalScore: 90,
    },
  ]);
  const [topThree, setTopThree] = useState([
    {
      playerName: "oyelowo",
      playerImage: bestStudent,
      subjectToBeDone: [
        { quizName: "english", score: 30 },
        { quizName: "Yoruba", score: 10 },
        { quizName: "Maths", score: 30 },
        { quizName: "English", score: 10 },
      ],
      totalScore: 90,
    },
    {
      playerName: "Emmanuel",
      playerImage: bestStudent,
      subjectToBeDone: [
        { quizName: "english", score: 1 },
        { quizName: "english", score: 1 },
        { quizName: "english", score: 1 },
        { quizName: "english", score: 1 },
      ],
      totalScore: 90,
    },
    {
      playerName: "Dara",
      playerImage: bestStudent,
      subjectToBeDone: [
        { quizName: "english", score: 1 },
        { quizName: "english", score: 1 },
        { quizName: "english", score: 1 },
        { quizName: "english", score: 1 },
      ],
      totalScore: 90,
    },
  ]);
  return (
    <dashboardContext.Provider
      value={{
        userRecords,
      }}
    >
      <div className="bg-dashback-100 w-10p">
        <div className="w-9p ml-auto sidebarNone:w-10p">
          <div className="w-9p bg-green-like-100 h-dbh mx-auto"></div>

          {/* Top Scorers */}
          <div className="top-scorer">
            {topThree.map((player, id) => (
              <div className="beststudent bg-white shadow-lg mt-01">
                <div>
                  <img
                    src={player.playerImage}
                    alt=""
                    className="h-dimage 10p object-cover"
                  />
                  <p className="border-b border-dashback-200 pt-2">
                    {player.playerName}
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <div>
                    <p className="w-10px flex justify-center items-center text-xl">
                      <FaRegUserCircle
                        className={`
                      ${id === 0 && `text-orange-like-100 w-9`}
                      ${id === 1 && `text-yellow-like-100 w-9`}
                      ${id === 2 && `text-red-like-100 w-9`}
                      `}
                      />
                    </p>
                    <p className="text-xl font-light">
                      Point:{player.totalScore}
                    </p>
                  </div>
                </div>
              </div>
            ))}
           
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
            <div className="w-10p">
              <div className="flex">
                <div className="nameImageDiv">
                  <div className="nameDescriptionDiv">
                    <p>Name</p>
                  </div>
                  <div className="nameImageDivFlex">
                    <div className="name">
                      {userRecords.map((player) => (
                        <div>
                          <p>{player.playerName}</p>
                        </div>
                      ))}
                    </div>
                    <div className="imagee">
                      {userRecords.map((player) => (
                        <div>
                          <img src={player.playerImage} alt="" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div></div>
                <div className="flex">
                  <div>
                    <div className="quizNameFlex">
                      {userRecords[0].subjectToBeDone.map((subject) => (
                        <div className="w-11">
                          <p>{subject.quizName}</p>
                        </div>
                      ))}
                    </div>
                    <div className="">
                      {userRecords.map((subject) => (
                        <div className="scoreflex">
                          {subject.subjectToBeDone.map((score) => (
                            <div className="">
                              <p>{score.score}</p>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="totalDiv">
                    <div className="total">
                      <p>Total</p>
                    </div>
                    <div className="score">
                      {userRecords.map((total) => (
                        <div>
                          <p>{total.totalScore}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Side Bar */}
        <SideBarBack />
        <DashbarNav />
        <Sidebar />
      </div>
    </dashboardContext.Provider>
  );
};

export default AdminDashboard;
