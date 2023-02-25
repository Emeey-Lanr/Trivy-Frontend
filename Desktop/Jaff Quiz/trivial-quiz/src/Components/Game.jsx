import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";
import { FaInfo } from "react-icons/fa";
import { appContext } from "../App";
import AdminPlayers from "./AdminPlayers";
import AdminQuestion from "./AdminQuestion";
import AdminStartGame from "./AdminStartGame";
import Logo from "./Logo";
import PlayerQuestion from "./PlayerQuestion";
import TopActs from "./TopActs";
import { Oval } from "react-loader-spinner";
import StartGameLoading from "./StartGameLoading";
import TopActAnimation from "./TopActAnimation";
import OverallResult from "./OverallResult";
export const gameContext = createContext();
const Game = () => {
  const { socket, gameEndPoint, userName } = useContext(appContext);
  const [admin, setAdmin] = useState(false);
  const [socketId, setSocketId] = useState("");
  const [clicked, setClicked] = useState(1);
  // for the user to know which button is being clicked
  const [startBtnStyle, setStartBtnStyle] = useState({
    clicked: "bg-green-like-100 text-white py-2 px-3 rounded-sideicon",
    notClicked: "bg-dashback-100 text-green-like-100 py-2 px-3",
  });

  const [startOrPlayerJoining, setStartOrPlayerJoining] = useState(1);
  // admin stage show which stage admin is
  const [adminStage, setAdminStage] = useState("AdminPage01");
  const [roomId, setRoomId] = useState("");
  // adminQuestion
  const [adminQuestion, setAdminQuestion] = useState({
    question: { text: "", image: "" },
    answers:[]
  });
  const [startLoading, setStartLoading] = useState(false);
  const [currentSubjectName, setCurrentSubjectName] = useState("");
  const [playerQuestion, setPlayerQuestion] = useState([]);

  const [adminQuestionTitle, setAdminQuestionTitle] = useState([]);

  const [allQuestionLength, setAllQuestionLength] = useState();
  const [currentQuestionLength, setCurrentQuestionLength] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [adminCurrentIndex, setAdminCurrenIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState({
   
  });
  const [totoalCurrentQuestion, setTotatCurrentQuestion] =useState([])
  const [totalAllQuestion, setTotalAllQuestion]=useState([])
  const [playerScore, setPlayerScore] = useState([ ]);
  const [playerScoreGameIndex, setPlayerScoreGameIndex] = useState(0)
  const [assignedMark, setAssignedMark] = useState(0);
  const [topActAnimation, setTopActAnimation] = useState(2)
  const [spinnerStatus, setSpinnerStatus] = useState(false)
  const [currentTime, setCurrentime] = useState({
    minutes: 0,
    second:0,
  });
   
  const [currentSecond, setCurrentSecond] = useState(-1)
  const [currentSecond2, setCurrentSecond2] = useState(60)
  const [currentMinutes, setCurrentMinutes] =useState(-1)


  // PLAYER
  const [allPlayersPlaying, setAllPlayersPlaying] = useState([]);
  const [individualName, setIndividualName] = useState("");
  const [ifPicked, setifPicked] = useState(-1);
  const [currentSubject, setCurrentSubject] = useState("")
  const adminVerifyEndPoint = `${gameEndPoint}/verifystatus`;
  let socketIdentification = "";

  //  time 
  const [minutes, setMinutes] = useState(-1)
  const [second, setSecond] =useState(-1)
  const getSocketIdFunction = () => { };
  // completed message
  const [completedMessage, setCompletedMessage] = useState("")
  const joinTheGame = () => {
    axios
      .get(adminVerifyEndPoint, {
        headers: {
          Authorization: `bearer ${localStorage.adminIdentification}`,
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        if (result.data.status) {
          console.log(result.data);

          if (result.data.adminStatus) {
            console.log(result.data)
            setAdmin(result.data.adminStatus);
            setRoomId(result.data.quizIdNumberPlayedId);
            // setAdminQuestion(result.data.questionToBeAnswered);
            setAdminQuestionTitle(result.data.questionToBeAnswered);
            socket.current.emit("createRegistrationBox", {
              quizId: result.data.quizIdNumberPlayedId,
              adminPage: adminStage,
            });
          } else {
            setIndividualName(result.data.userDetails.playerName);
            setAdmin(result.data.adminStatus);
            setRoomId(result.data.quizIdNumberPlayedId);
            socket.current.emit("register", {
              userDetails: result.data.userDetails,
              uniqueIdentification: result.data.quizIdNumberPlayedId,
              userId: socket.id,
            });
          }
        }
      });
  };
  useEffect(() => {
    joinTheGame();
  }, []);
const [wait, setWait] = useState(false)
  // responsible for the current page incase the admin reload
const ifItExistAndProbablyReload = () => {
    if (socket.current) {
      socket.current.on("currentPage", (data) => {
      if(data.roomId === roomId){
        if (data.stage === 1) {
          setAllPlayersPlaying(data.players);
          setAdminStage(data.adminPage)
        }else if(data.stage === 2){
          setAdminStage(data.adminPage);
          setStartLoading(false);
          setAdminQuestion(data.currentQuestion)
          setCurrentQuestion(data.currentQuestion);
          setWait(true)
          setCurrentSecond()
          console.log(wait)
        } else if (data.stage === 3) {
          setAdminStage(data.adminPage)
        }else if(data.stage === 4){
          setAdminStage(data.adminPage)
        }

      }
      });
    }
  };
  const checkIfAPlayerJoined = () => {
    if (socket.current) {
      socket.current.on("playersJoinings", (playersJoining) => {
        setAllPlayersPlaying(playersJoining.players);
        console.log(playersJoining);
      });
    }
  };
  const ifYouJoined = () => {
    if (socket.current) {
      socket.current.on("showThatYouJoinedAlso", (playersJoining) => {
        setAllPlayersPlaying(playersJoining.players);
        setAdminStage(playersJoining.adminPage);
      });
    }
  };

  const switchToLoadFunction = () => {
    if (socket.current) {
      socket.current.on("switchToLoad", (data) => {
        setAdminStage(data.adminPage);
        setStartLoading(data.loading);
      });
    }
  };
  const switchToStart = () => {
    if (socket.current) {
      socket.current.on("startGame", (data) => {
        setCurrentSecond(data.time)
        setAdminStage(data.adminPage);
        setStartLoading(data.loading);
        setCurrentQuestion(data.question);
        setCurrentSubjectName(data.currentSubject);
        setAssignedMark(data.assignedMark);
        setWait(true)
        setifPicked(-1)
      });
    }
  };

  const switchToStartAdminPage = () => {
    if (socket.current) {
      socket.current.on("startGameOnAdminPageAlso", (data) => {
        if (data.adminId === roomId) {
          if (admin) {
            console.log(data)
            setStartLoading(false);
            setAdminQuestion(data.currentSubject);
            setCurrentSecond(data.time)
            setWait(true)
          }
        } 

      });
    }
  }

  // if the game has been played before
  const ifGamePlayed = ()=>{
    if(socket.current){
      socket.current.on("ifPlayedBefore", (data) => {
        if (admin) {
          if (data.adminId === roomId) {
          startLoading(false)
          }
        }
      })
    }
  }
  const adminNextQuestion = () => {
    if (socket.current) {
    socket.current.on("adminId", (data)=>{
      if (data.roomId === roomId) {
        setWait(true)
        setAdminQuestion(totoalCurrentQuestion[data.currentGameId]);
       setCurrentSecond(data.time)

      }
    })
  }
}
  const nextQuestion = () => {
    if (socket.current) {
      socket.current.on("nextQuestion", (data) => {
        setWait(true)
        setCurrentime(data.time)
        setCurrentSecond(data.time)
        setAdminStage(data.adminPage);
        setCurrentQuestion(data.question);
        setCurrentSubjectName(data.currentSubject);
        setAssignedMark(data.assignedMark);
        setifPicked(data.check)
        setifPicked(-1)
      } )
    }
    
  }


  const changeToSemiVictoryStage = ()=>{
    if (socket.current) {
      socket.current.on("changeToVictoryPage", (data) => {
        setWait(false)
        setAdminStage(data.adminStage);
        timeFunction(false)
        setPlayerScore(data.playerRanking)
        setPlayerScoreGameIndex(data.currentIndex);
        setCurrentSubject(data.currentSubject);
        setTopActAnimation(1)
        setTimeout(() => {
          setTopActAnimation(2)
        },2000)
      });
    }
  }

  const changeNextSubjectFunction = () => {
    if (socket.current) {
      socket.current.on("changePageToNextSubject", (info) => {
        console.log(info)
        if (info.adminId === roomId) {
          if (admin) {
            setAdminStage("AdminPage01");
          } else {
            setAdminStage("AdminPage02");
            setStartLoading(true);
          }
        }
      })
    }
  }
  const changeToVictoryPageFunction = () => {
    if (socket.current) {
      socket.current.on("overallResult", (data)=>{
        if (data.adminId === roomId) {
          setAdminStage("AdminPage04")
          setPlayerScore(data.overallResult);
          setTopActAnimation(1);
          setWait(false)
           setTimeout(() => {
             setTopActAnimation(2);
           }, 2000);
        }
      })
    }

  }
// till function loads spinner till result is saved
  const loadSpinnerFunction = () => {
    if (socket.current) {
      socket.current.on("openSpinner", (data) => {
        // console.log(data, roomId)
        if (data.adminId === roomId) {
          setSpinnerStatus(true)
        }
      });
    }
  }

  // when result is finally saved
  const whenResultIsSavedFunction = () => {
    if (socket.current) {
     
      socket.current.on("whenSaved", (data) => {
        if (data.adminId === roomId) {
          if (admin) {
             setSpinnerStatus(false);
          setAdminStage("AdminPage01");
            setStartOrPlayerJoining(2)
            setCompletedMessage("You've completed the game");
          }
          // tell them the quiz has been completed and I will get the button disabled
          
          // and it will disable the button

         }
        });
      }
    
  }
  
  var timer 
  const [place, setplace] = useState(0)
  const timeFunction = (   ) => {
      if (wait) {
        
      }
    
  }
  useEffect(() => {
    ifItExistAndProbablyReload();
    checkIfAPlayerJoined();
    ifYouJoined();
    switchToLoadFunction();
    switchToStart();
    switchToStartAdminPage()
    nextQuestion()
    ifGamePlayed()
    adminNextQuestion()
    changeToSemiVictoryStage()
    timeFunction()
    changeNextSubjectFunction()
    changeToVictoryPageFunction()
    loadSpinnerFunction()
    whenResultIsSavedFunction()

    if (wait) {
      timer = setInterval(() => {
        
        setCurrentSecond(currentSecond - 1)
        if (currentSecond === 0) {
          if (admin) {
            if (admin) {
              socket.current.emit("changeQuestion", {
                roomId: roomId,
                currentQuestion: currentQuestion[currentQuestionIndex],
              });
              setWait(false)
            }
          }
        }  
         
         
        //  console.log("yes");
      }, 1000);
      return () => clearInterval(timer);
    }
  
  });
  // useEffect(() => {
    
   
  //     }
  // },[wait])
  
  const checkPlayers = () => {
    setClicked(1);
    setStartOrPlayerJoining(1);
  };
  // responsible for switching  passages
  const startGame = () => {
    setClicked(2);
    setStartOrPlayerJoining(2);
  };
  // the button responsiblefor the starting ofgame
  
  const [nextBtn, setNextBtn] = useState(false)

  const startQuizBtn = (quizname, id) => {
      console.log(adminQuestionTitle[id].subjectMark);

    setAdminStage("AdminPage02");
    setStartLoading(true);
    socket.current.emit("switchToLoad", {
      adminPage: "AdminPage02",
      loading: true,
      roomId: roomId,
    });
    setTimeout(() => {
      socket.current.emit("switchToStart", {
        adminPage: "AdminPage02",
        loading: false,
        roomId: roomId,
        question: adminQuestionTitle[id].questions[currentQuestionIndex],
        currentSubject: quizname,
        assignedMark: adminQuestionTitle[id].subjectMark,
        questionToBeAnswered: adminQuestionTitle[id].questions,
        currentQuestionIndex: currentQuestionIndex,
        currentTime: adminQuestionTitle[id].time,
        allQuizIndex: adminQuestionTitle.length - 1,
        clicked: 1,
      });
      setTotatCurrentQuestion(adminQuestionTitle[id].questions);
      // setStartLoading(false);
      // setAdminQuestion(adminQuestionTitle[id].questions[currentQuestionIndex]);

      // setWait(true);
    }, 2000);
  };


  const pickAnswer = (status, id) => {
    console.log(id, status)
    setifPicked(id)
      socket.current.emit("submitAnwser", {
      roomId:roomId,
      playerName: individualName,
      currentSubject: currentSubjectName,
      assignedMark: assignedMark,
      currentStatus: status,
      // currentIindex:currentQuestionIndex,
    });
  };

  // switch to next game  
  const nextSubjectOrOverallResult = () => {
    console.log(2)
    socket.current.emit("switchPageToNextSubjectOrOverallResult",{
      gameId: roomId,
      
    })
    
  }

  const quizCompleted = () => {
    // alert(20)
    socket.current.emit("completedQuiz", {gameId:roomId})
  }
  return (
    <gameContext.Provider
      value={{
        admin,
        adminQuestionTitle,
        allPlayersPlaying,
        individualName,
        startQuizBtn,
        currentQuestion,
        adminQuestion,
        pickAnswer,
        ifPicked,
        minutes,
        second,
        currentTime,
        playerScore,
        playerScoreGameIndex,
        currentMinutes,
        currentSecond,
        currentSubject,
        nextSubjectOrOverallResult,
        quizCompleted,
        completedMessage,
      }}
    >
      <div>
        {admin ? (
          <div>
            {/* start game */}
            {adminStage === "AdminPage01" && (
              <div>
                {/* start game nav */}
                <div className="flex justify-between py-4 px-3 items-center">
                  <div>
                    <Logo />
                  </div>
                  <div className="flex">
                    <button
                      onClick={() => checkPlayers()}
                      className={`${
                        clicked === 1
                          ? startBtnStyle.clicked
                          : startBtnStyle.notClicked
                      }`}
                    >
                      Players
                    </button>
                    <button
                      onClick={() => startGame()}
                      className={`rouded-r-sideicon ${
                        clicked === 2
                          ? startBtnStyle.clicked
                          : startBtnStyle.notClicked
                      }`}
                    >
                      Start
                    </button>
                  </div>
                </div>
                <div className="w-10p">
                  {startOrPlayerJoining === 1 ? (
                    <AdminPlayers />
                  ) : (
                    <AdminStartGame />
                  )}
                </div>
              </div>
            )}
            {adminStage === "AdminPage02" && (
              <div>
                {startLoading ? (
                  <div>
                    <StartGameLoading />
                  </div>
                ) : (
                  <div>
                    <AdminQuestion />
                  </div>
                )}
              </div>
            )}
            {adminStage === "AdminPage03" &&
              (topActAnimation === 1 ? (
                <div>
                  <TopActAnimation />
                </div>
              ) : (
                <div>
                  <TopActs />
                </div>
              ))}
            {adminStage === "AdminPage04" &&
              (topActAnimation === 1 ? (
                <div>
                  <TopActAnimation />
                </div>
              ) : (
                <div>
                  <OverallResult />
                </div>
              ))}
            {spinnerStatus && (
              <div>
                <StartGameLoading />
              </div>
            )}
          </div>
        ) : (
          <div>
            {adminStage === "AdminPage01" && (
              <div>
                <div className="flex justify-between py-4 px-3 items-center">
                  <div>
                    <Logo />
                  </div>
                </div>
                <AdminPlayers />
              </div>
            )}
            {adminStage === "AdminPage02" && (
              <div>
                {startLoading ? (
                  <div>
                    <StartGameLoading />
                  </div>
                ) : (
                  <div>
                    <PlayerQuestion />
                  </div>
                )}
              </div>
            )}
            {adminStage === "AdminPage03" &&
              (topActAnimation === 1 ? (
                <div>
                  <TopActAnimation />
                </div>
              ) : (
                <div>
                  <TopActs />
                </div>
              ))}
            {adminStage === "AdminPage04" &&
              (topActAnimation === 1 ? (
                <div>
                  <TopActAnimation />
                </div>
              ) : (
                <div>
                  <OverallResult />
                </div>
              ))}
            {spinnerStatus && (
              <div>
                <StartGameLoading />
              </div>
            )}
          </div>
        )}
      </div>
    </gameContext.Provider>
  );
};

export default Game;
