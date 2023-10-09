import DashbarNav from "./DashbarNav";
import Sidebar from "./Sidebar";
import "../styles/dashboard.css";
import noImg from "../Images/noImage.png";
import DashboardChart from "./DashBoardChart";
import { FaRegUserCircle } from "react-icons/fa";
import { useContext, useEffect, useState, createContext } from "react";
import { appContext } from "../App";
import SideBarBack from "./SideBarBack";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import "../styles/resultStyle.css"
import ordinal from "ordinal";
// import bese from "../Images/bestStudent.jpg"
export const dashboardContext = createContext ()
const AdminDashboard = () => {
  const {
    adminDetails,
    setAdminDetails,
    adminEndPoint,
    dashboardFuction,
    lastPlayed,
    lastPlayedDetails,
    ranking,
    setSideBarBoxShadow,
    setShowSidebar,
  } = useContext(appContext);

  useEffect(() => {
    setSideBarBoxShadow(1);
    dashboardFuction()
    setShowSidebar("hideSideBar");
  }, []);
 

  return (
    <dashboardContext.Provider value={{}}>
      <div className="bg-dashback-100 w-10p">
        <div className="w-9p ml-auto sidebarNone:w-10p">
          <div className="w-9p bg-green-like-100 h-dbh mx-auto"></div>

          {/* Top Scorers */}

          {lastPlayed.length < 1 ? (
            <div className="top-scorer">
              <div className="beststudent bg-white shadow-lg mt-01">
                <div>
                  <img
                    src={noImg}
                    alt=""
                    className="h-dimage 10p object-cover"
                  />
                  <p className="border-b border-dashback-200 pt-2">......</p>
                </div>
                <div className="flex justify-center items-center">
                  <div>
                    <p className="w-10px flex justify-center items-center text-xl">
                      <FaRegUserCircle className={`text-orange-like-100 w-9`} />
                    </p>
                    <p className="text-xl font-light">Point:{0}</p>
                  </div>
                </div>
              </div>
              <div className="beststudent bg-white shadow-lg mt-01">
                <div>
                  <img
                    src={noImg}
                    alt=""
                    className="h-dimage 10p object-cover"
                  />
                  <p className="border-b border-dashback-200 pt-2">
                    .............
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <div>
                    <p className="w-10px flex justify-center items-center text-xl">
                      <FaRegUserCircle className={`text-yellow-like-100 w-9`} />
                    </p>
                    <p className="text-xl font-light">Point:{0}</p>
                  </div>
                </div>
              </div>
              <div className="beststudent bg-white shadow-lg mt-01">
                <div>
                  <img
                    src={noImg}
                    alt=""
                    className="h-dimage 10p object-cover"
                  />
                  <p className="border-b border-dashback-200 pt-2">....</p>
                </div>
                <div className="flex justify-center items-center">
                  <div>
                    <p className="w-10px flex justify-center items-center text-xl">
                      <FaRegUserCircle className={`text-red-like-100 w-9`} />
                    </p>
                    <p className="text-xl font-light">Point:{0}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="top-scorer">
              {lastPlayed.map((player, id) => (
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
          )}
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

          {lastPlayed.length > 0 ? (
            <div className="w-scoreResultSize">
              <div className="w-10p">
                <div className="flex">
                  <div>
                    <div className="rankDiv">
                      <div className="total">
                        <p>Rank</p>
                      </div>
                      <div className="score">
                        {ranking.map((content) => (
                          <div>
                            <p>{ordinal(content.rank)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="nameImageDiv">
                    <div className="nameDescriptionDiv">
                      <p>Name</p>
                    </div>
                    <div className="nameImageDivFlex">
                      <div className="name">
                        {lastPlayed.map((player) => (
                          <div>
                            <p>{player.playerName}</p>
                          </div>
                        ))}
                      </div>
                      <div className="imagee">
                        {lastPlayed.map((player) => (
                          <div>
                            <img src={player.playerImage} alt="" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="schoolName">
                      <div className="total">
                        <p>School Name</p>
                      </div>
                      <div className="score">
                        {lastPlayed.map((content, id) => (
                          <div>
                            <p>{content.schoolName}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div>
                      <div className="quizNameFlex">
                        {lastPlayed[0].subjectToBeDone.map((subject) => (
                          <div className="w-11">
                            <p>{subject.quizName}</p>
                          </div>
                        ))}
                      </div>
                      <div className="">
                        {lastPlayed.map((subject) => (
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
                        {lastPlayed.map((total) => (
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
          ) : (
            <div></div>
          )}
        </div>

        <SideBarBack />
        <Sidebar />
        <DashbarNav />
      </div>
    </dashboardContext.Provider>
  );
};

export default AdminDashboard;
