
import Sidebar from "./Sidebar"
import DashbarNav from "./DashbarNav"
import SidBarBack from "./SideBarBack"
import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { appContext } from "../App"
import { SlPeople } from "react-icons/sl"
import { FaArrowLeft, FaRegUserCircle, FaTimes, FaTrash } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

import AlertModal from "./AlertModal"
const Participants = () => {
let navigate = useNavigate()
    const {
      adminEndPoint,
      setAlertModalStatus,
      setAlertMessage,
    } = useContext(appContext);
  const [Participants, setParticipants] = useState([])
  const [currentPositionStatus, setCurrentPositionStatus] = useState(1)
  const verifyParticipantsEndPoints = `${adminEndPoint}/findParticipants`
  const [userRecords, setUserRecords] = useState([]);
  const [getQuizId, setGetQuizId] = useState("")
  const [topThree, setTopThree] = useState([]);
  const [modalDeleteStyle, setModalDeleteStyle] = useState("text-white w-10p bg-green-like-100 rounded-sideicon py-2 px-3")
  const [btnDeleteText, setBtnDeleteText] = useState("Delete")
  const [deleteModalStatus, setDeleteModalStatus] = useState(false)
  const getInfo = () => {
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
        
              setParticipants(JSON.parse(result.data.result))
            }
        }).catch((error) => {
            
          });
  }
    useEffect(() => {
      getInfo()
    }, [])
  const checkResult = (index) => {
    setUserRecords(Participants[index].result)
    setTopThree(Participants[index].result.filter((content, id)=> id > -1 && id < 3))
    setCurrentPositionStatus(2)
  }
  const deleteQuizEndPoint = `${adminEndPoint}/deleteQuiz`;
  const deleteQuiz = (id) => {
    setGetQuizId(id)
    setDeleteModalStatus(true)
  }
  const alertModalFunction = (a, b, c, d, f, h) => {
    
     setAlertMessage(a);
     setAlertModalStatus(b);
     setTimeout(() => {
       setAlertMessage(c);
       setAlertModalStatus(d);
     }, 2000);
    setBtnDeleteText(f);
    setModalDeleteStyle(h);
  }

  const finalDelete = () => {
  setBtnDeleteText("Deleting....")
   setModalDeleteStyle("bg-green-like-100 text-white py-2 px-3")
    axios.post(deleteQuizEndPoint, { quizId: getQuizId }).then((result) => {
      if (result.data.status) {
        getInfo()
        alertModalFunction(result.data.message, true, "", false, "Delete", "bg-dashback-100 text-inputLine py-2 px-3");
        setDeleteModalStatus(false)
     
      } else {
        alertModalFunction(result.data.message, true, "", false, "Delete", "bg-dashback-100 text-inputLine py-2 px-3")
        setDeleteModalStatus(false)
       
      }
    })
  }
  return (
    <div className="w-10p">
      {currentPositionStatus === 1 ? (
        <div className="mt-dw w-8p mx-auto">
          <div className="w-9p h-7 mx-auto">
            <button onClick={() => navigate(`/quizcollections`)}>
              <FaArrowLeft className="text-green-like-100  text-1xl" />
            </button>
          </div>
          <button onClick={() => navigate(`/quizcollections`)}>
            <FaArrowLeft className="text-green-like-100 bg-green-like-100 text-1xl" />
          </button>
          <p className="text-center text-xl mb-2">Series</p>
          {Participants.map((content, id) => (
            <div className="w-8p mb-5 mx-auto bg-green-like-100 rounded-sideicon sideBarNone:w-9p">
              <p className="text-white w-8p mx-auto text-2xl border-b py-3">
                Quiz {id + 1}
              </p>
              <div className="w-9p mx-auto mt-2 flex justify-between items-center">
                <div className="">
                  <p className="h-6 w-6 rounded-sideicon flex justify-center items-center bg-white">
                    <SlPeople />
                  </p>
                  <p className="text-white">Total Participants</p>
                </div>
                <p className="text-white font-serif text-2xl">
                  {Participants[id].result.length}
                </p>
              </div>

              <div className="w-9p mx-auto flex justify-between items-center py-2">
                <button
                  onClick={() => checkResult(id)}
                  className="w-5p py-2 rounded-sideicon bg-white"
                >
                  View Result
                </button>
                <button onClick={() => deleteQuiz(content._id)}>
                  <FaTrash className="text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-8p mx-auto mt-12 sidebarNone:w-10p">
          <div className="w-9p mx-auto  py-1 px-1 rounded-sideicon">
            <button onClick={() => setCurrentPositionStatus(1)}>
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
          <div className="bg-white w-9p py-2 my-4 mx-auto h-dashtable overflow-x-auto shadow-sm mt-10 rounded-sideicon sidebarNone:w-9p">
            <div className="w-10p sticky top-0">
              <p className="w-3p bg-green-like-100 py-2 rounded-sideicon mx-auto text-center text-white my-3">
                Participants
              </p>
            </div>
            <div className="w-scoreResultSize">
              <div className="w-10p">
                <div className="flex">
                  <div>
                    <div className="rankDiv">
                      <div className="total">
                        <p>Rank</p>
                      </div>
                      <div className="score">
                        {userRecords.map((_, id) => (
                          <div>
                            <p>{id + 1}</p>
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
                  <div>
                    <div className="schoolName">
                      <div className="total">
                        <p>School Name</p>
                      </div>
                      <div className="score">
                        {userRecords.map((content, id) => (
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
      {deleteModalStatus && (
        <div className="w-10p h-10p flex justify-center items-center fixed top-0 bg-modalback">
          <div className="bg-white py-1 px-2 rounded-sideicon">
            <div className="flex justify-end">
              <button onClick={() => setDeleteModalStatus(false)}>
                <FaTimes className="text-green-like-100" />
              </button>
            </div>
            <div className="w-9p mx-auto py-1">
              <p className="text-center capitalize text-inputLine text-xs">
                Are you sure you sure you want to delete
              </p>
            </div>
            <div className="w-9p mx-auto flex justify-end">
              <button
                onClick={() => finalDelete()}
                className={modalDeleteStyle}
              >
                {btnDeleteText}
              </button>
            </div>
          </div>
        </div>
      )}
      <AlertModal />
      <SidBarBack />
      <Sidebar />
      <DashbarNav />
    </div>
  );
}

export default Participants