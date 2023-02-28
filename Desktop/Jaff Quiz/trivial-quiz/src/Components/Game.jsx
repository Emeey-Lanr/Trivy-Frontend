import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";
import { FaTimes } from "react-icons/fa";
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
import AdminModeQuestionPlayer from "./AdminModeQuestionPlayer";
import UserModeQuestionPlayer from "./UserModeQuestionPlayer";
import IndividualGameLogin from "./IndividualGameLogin";
export const gameContext = createContext();
const Game = () => {
  const { socket, gameEndPoint, userName } = useContext(appContext);
  const [admin, setAdmin] = useState(false);
  const [socketId, setSocketId] = useState("");
  let date = new Date()
  const [clicked, setClicked] = useState(1);
  // for the user to know which button is being clicked
  const [startBtnStyle, setStartBtnStyle] = useState({
    clicked: "bg-green-like-100 text-white py-2 px-3 rounded-sideicon",
    notClicked: "bg-dashback-100 text-green-like-100 py-2 px-3",
  });

  const [startOrPlayerJoining, setStartOrPlayerJoining] = useState(1);
  // admin stage show which stage admin is
  const [adminStage, setAdminStage] = useState("AdminPage01");
  const [quizMode, setQuizMode] = useState(0)
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
  const [second, setSecond] = useState(-1)
  const [timerStatus, setTimerStatus] = useState(false)

  // self
  const [selTime, setSelfTime] = useState(0)
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
            // setAdmin(false)
            setRoomId(result.data.quizIdNumberPlayedId);
            // setAdminQuestion(result.data.questionToBeAnswered);
            setAdminQuestionTitle(result.data.questionToBeAnswered);
            setQuizMode(result.data.mode)
            socket.current.emit("createRegistrationBox", {
              quizId: result.data.quizIdNumberPlayedId,
              adminPage: adminStage,
              mode:result.data.mode,
             
              date:new Date
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

  //Stage 3
 // self more like a cbt question
  // user
  const [selfQuizQuestion, setSelfQuizQuestion] = useState([]);
  const [selfCurrentQuestion, setSelfCurrentQuestion] = useState({});
  const [subjectScoreBox, setSubjectScoreBox] = useState([])
  const [quizNumberAttempted, setQuizNumberAttempted] = useState([])
  const [knowPickedAnswer, setPickedAnwser] = useState([])
  
 
  const startStage3QuestionFunction = () => {
    if (socket.current) {
      socket.current.on("stage3Question", (data) => {
        console.log(data)
        setAdminStage(data.adminPage);
        setStartLoading(true)
        setCurrentSubjectName(data.subjectName);
        setSelfQuizQuestion(data.question);
        setSelfCurrentQuestion(data.question[currentQuestionIndex]);
        setQuizNumberAttempted(data.scoreBox);
        setQuizNumberAttempted(data.scoreBox);
        setPickedAnwser(data.scoreBox);
        setCurrentSecond(data.time);
        setAssignedMark(data.subjectMark);
        console.log(quizMode)
        setTimeout(() => {
          setQuizMode(data.mode)
          setWait(true)
          setStartLoading(false)
        }, 1000)
        

      });
    }
  }

  // what shows on the adminpage is the time while the participants answer the question
 
  const adminPageWhileQuizFunction = () => {
    if (socket.current) {
      if (admin) {
        socket.current.on("stage3AdminQuestion", (data) => {
          if (data.adminId === roomId) {
            setStartLoading(true)
            setTimeout(() => {
               setAdminStage(data.adminPage);
               setCurrentSecond(data.time);
               setWait(true);
               setStartLoading(false)
            },1000)
           

          }
        });
      }
    }
  }
const [sendResult, setSendResult] = useState(0)
const [userNamee, setUserName] = useState("")

  const submitAnswerFunction = () => {
    let totalScore = 0;
    if (socket.current) {
  
      socket.current.on("collectPlayersAnswers", (data) => {
        const calculate =()=>{
        return new Promise((resolve, reject) => {
             console.log(individualName, roomId);
             setUserName(individualName);
             
           console.log(sendResult)
           setStartLoading(true)
              const error = false;
                if (!error) {
                  resolve();
                } else {
                  reject();
                }
            
        })
        }
     
  const sendMessage = ()=>{
    return new Promise((resolve, reject) => {
      socket.current.emit("verifyToSubmitAnswer", {
        username: individualName,
        roomId: data.roomId,
        currentSubject: currentSubjectName,
        totalScore:subjectScoreBox,
        status: true,
      });

      const error = false
      if(!error){
        resolve()
      }else{
        reject()
      }
    })
  }
  const sendAll = async()=>{
await calculate()
await sendMessage()
  }
  sendAll()
  
})
      
      // we will collect the current subject
      // the name, the roomId
      
    }
  }
  
  useEffect(() => {

    // stage1 the admin has the control to read the question, next 


    // stage2, this is the automatic one that runs based on the time
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
    changeNextSubjectFunction()
    changeToVictoryPageFunction()
    loadSpinnerFunction()
    whenResultIsSavedFunction()

    // stage 3
    // self more like a cbt question
    startStage3QuestionFunction()
    adminPageWhileQuizFunction()
    submitAnswerFunction()

    if (wait) {
      timer = setInterval(() => {
        
        setCurrentSecond(currentSecond - 1)
        if (currentSecond === 0) {
          if (admin) {
            if (admin) {
              if (quizMode === 1) {
                
              } else if (quizMode === 2) { 
                socket.current.emit("changeQuestion", {
                  roomId: roomId,
                  currentQuestion: currentQuestion[currentQuestionIndex],
                });
                setWait(false);

              } else if (quizMode === 3) {
                socket.current.emit("selfSubmitQuestion", {
                  roomId: roomId,
                
                })
                setStartLoading(true)
                setWait(false)
              }
              
            }
          }else{
            setWait(false)
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
    if (quizMode === 1) {
      // here there will be button for each question where the admin can read assign time and next
    } else if (quizMode === 2) {
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
    } else if (quizMode === 3) {
      // here the admin will give the student a time to answer all the whole questions
      setCurrentSubject(adminQuestionTitle[id].quizName);
      setPlayerQuestion(adminQuestionTitle[id].questions);
   
      // console.log(adminQuestionTitle[id])
      // console.log();
      setTimerStatus(true)
    }

   
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



  // stage 3
  const startSelfModeBtn = () => {
    if (selTime > 0) {
      socket.current.emit("startSelfMode", {
        question: playerQuestion,
        currentSubjectName: currentSubject,
        roomId:roomId,
        allSubjects:adminQuestionTitle,
        time:selTime
      });
      setAdminStage("AdminPage02");
      setStartLoading(true)
      setTimerStatus(false)
      
   
    } else {
      alert("pls input a specific time")
    }
    
  }

  // next and prev btn
  const selfPrevBtn = () => {
    if (currentQuestionIndex === 0) {
      setCurrentQuestionIndex(selfQuizQuestion.length - 1)
    } else {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
    
    setSelfCurrentQuestion(selfQuizQuestion[currentQuestionIndex]);
    
  }
  const selfNextBtn = () => {

    setCurrentQuestionIndex(currentQuestionIndex + 1)
    // setSelfCurrentQuestion(selfQuizQuestion(2))
    if (currentQuestionIndex === selfQuizQuestion.length - 1) {
      setCurrentQuestionIndex(0)
    }
    setSelfCurrentQuestion(selfQuizQuestion[currentQuestionIndex])
    
  }
  useEffect(() => {
    setSelfCurrentQuestion(selfQuizQuestion[currentQuestionIndex]); 
  },[currentQuestionIndex])
  const selfQuestionIndicatorBtn = (id) => {
    setCurrentQuestionIndex(id)

  }


  const selfPickAnswerBtn = (status, id) => {
    
    const changeStyle = [...knowPickedAnswer]
    changeStyle[currentQuestionIndex] = id + 1
    setPickedAnwser(changeStyle)
    if (status) {
    const item = [...subjectScoreBox]
   item[currentQuestionIndex]  = assignedMark
      setSubjectScoreBox(item)
    }
    
    // It shows youv've attempted a question and the number of questions attempted
    const attemptedQuestion = [...quizNumberAttempted]
    attemptedQuestion[currentQuestionIndex] = 1
    setQuizNumberAttempted(attemptedQuestion)

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
        currentSubjectName,
        nextSubjectOrOverallResult,
        quizCompleted,
        completedMessage,

        // stage 3 self
        currentQuestionIndex,
        selfCurrentQuestion,
        quizNumberAttempted,
        knowPickedAnswer,
        selfNextBtn,
        selfPrevBtn,
        selfQuestionIndicatorBtn,
        selfPickAnswerBtn,
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
                  <>
                    {quizMode === 1 && <div></div>}
                    {quizMode === 2 && (
                      <div>
                        <AdminQuestion />
                      </div>
                    )}
                    {quizMode === 3 && (
                      <div className="w-10p h-10p fixed top-0 bg-green-like-100 flex justify-center items-center">
                        <div className="w-dw h-dw"><p className="text-white  text-5xl text-serif texty">{currentSecond}</p></div>
                      </div>
                    )}
                  </>
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
                  // <div>
                  //
                  // </div>
                  <>
                    {/* this one has button to next the question */}
                    {quizMode === 1 && (
                      <div>
                        <AdminModeQuestionPlayer />
                      </div>
                    )}
                    {quizMode === 2 && (
                      // this one is automatic
                      <div>
                        <PlayerQuestion />
                      </div>
                    )}
                    {quizMode === 3 && (
                      <div>
                        {/* this place the user is given all the question to answer */}
                        <UserModeQuestionPlayer />
                      </div>
                    )}
                  </>
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
        {timerStatus && (
          <div className="w-10p h-10p fixed top-0 flex justify-center items-center bg-modalback">
            <div className="bg-white rounded-sideicon w-createModalSize">
              <div className="w-10p flex justify-end px-1 py-1">
                <button onClick={() => setTimerStatus(false)}>
                  <FaTimes className="text-green-like-100" />
                </button>
              </div>
              <div className="w-9p mx-auto flex justify-center my-4">
                <input
                  onChange={(e) => setSelfTime(e.target.value)}
                  type="number"
                  className="border border-green-like-100 h-7 outline-green-like-100 font-mono font-bold  text-center text-lg text-green-like-100"
                />
              </div>
              <div className="w-9p mx-auto">
                <button
                  onClick={() => startSelfModeBtn()}
                  className="bg-green-like-100 py-4 w-10p text-white font-bold"
                >
                  Start
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </gameContext.Provider>
  );
};

export default Game;
