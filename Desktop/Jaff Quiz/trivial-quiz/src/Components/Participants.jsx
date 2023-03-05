
import Sidebar from "./Sidebar"
import DashbarNav from "./DashbarNav"
import SidBarBack from "./SideBarBack"
import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { appContext } from "../App"
import { SlPeople } from "react-icons/sl"
import { FaArrowLeft, FaRegUserCircle } from "react-icons/fa"
import bestStudent from "../Images/bestStudent.jpg"
const Participants = () => {
    const {adminEndPoint} = useContext(appContext)
  const [Participants, setParticipants] = useState([])
  const [currentPositionStatus, setCurrentPositionStatus] = useState(2)
  const verifyParticipantsEndPoints = `${adminEndPoint}/findParticipants`
  const [userRecords, setUserRecords] = useState([
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
    useEffect(() => {
        axios
          .get(verifyParticipantsEndPoints, {
            headers: {
              Authorization: `bearer ${localStorage.quizxxx}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((result) => {
            if (result.data.status) {
            }
          });
    }, [])
  const checkResult = () => {
    setCurrentPositionStatus(2)
  }
  return (
    <div className="w-10p">
      {currentPositionStatus === 1 ? (
        <div className="mt-dw w-8p mx-auto">
          <p>Series</p>
          <div className="w-8p mx-auto bg-green-like-100 rounded-sideicon">
            <p className="text-white w-8p mx-auto text-2xl border-b py-3">
              Quiz 1
            </p>
            <div className="w-9p mx-auto mt-2 flex justify-between items-center">
              <div className="">
                <p className="h-6 w-6 rounded-sideicon flex justify-center items-center bg-white">
                  <SlPeople />
                </p>
                <p className="text-white">Total Participants</p>
              </div>
              <p className="text-white font-serif text-2xl">300</p>
            </div>

            <div className="w-9p mx-auto flex justify-center items-center py-2">
              <button
                onClick={() => checkResult()}
                className="w-5p py-2 rounded-sideicon bg-white"
              >
                View Result
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-8p mx-auto mt-12 sidebarNone:w-10p">
          <div className="w-8p mx-auto  py-1 px-1 rounded-sideicon">
            <button>
              <FaArrowLeft className="text-green-like-100 text-1xl" />
            </button>
          </div>
          <div className="w-10p">
            <div className="w-8p">
              <p className="text-center text-green-like-100 text-3xl">Quiz 1</p>
            </div>
            <div className="mt-12">
              <div className="top-scorer">
                {topThree.map((player, id) => (
                  <div className="beststudent  shadow-lg mt-01 gradi rounded-sideicon">
                    <div>
                      <img
                        src={player.playerImage}
                        alt=""
                        className="h-dimage 10p object-cover"
                      />
                      <p className="border-b text-white border-dashback-200 pt-2">
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
                        <p className="text-xl text-white font-light">
                          Point:{player.totalScore}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* All payer total score */}
          <div className="bg-white w-9p my-4 mx-auto h-dashtable overflow-x-auto shadow-sm mt-10 rounded-sideicon sidebarNone:w-9p">
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
        </div>
      )}
      <SidBarBack />
      <Sidebar />
      <DashbarNav />
    </div>
  );
}

export default Participants