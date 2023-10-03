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
import AdminModeTopActs from "./AdminModeTopActs";
import AlertModal from "./AlertModal";
export const gameContext = createContext();
const Game = () => {
  const {
    socket,
    gameEndPoint,
    userName,
    setAlertModalStatus,
    setAlertMessage,
  } = useContext(appContext);
  const [admin, setAdmin] = useState(false);
  const [socketId, setSocketId] = useState("");
  let date = new Date();
  const [clicked, setClicked] = useState(1);
  // for the user to know which button is being clicked
  const [startBtnStyle, setStartBtnStyle] = useState({
    clicked: "bg-green-like-100 text-white py-2 px-3 rounded-sideicon",
    notClicked: "bg-dashback-100 text-green-like-100 py-2 px-3",
  });

  const [startOrPlayerJoining, setStartOrPlayerJoining] = useState(1);
  // admin stage show which stage admin is
  const [adminStage, setAdminStage] = useState("AdminPage01");
  const [quizMode, setQuizMode] = useState(0);
  const [roomId, setRoomId] = useState("");
  // adminQuestion
  const [adminQuestion, setAdminQuestion] = useState({
    question: { text: "", image: "" },
    answers: [],
  });
  const [startLoading, setStartLoading] = useState(false);
  const [currentSubjectName, setCurrentSubjectName] = useState("");
  const [playerQuestion, setPlayerQuestion] = useState([]);

  const [adminQuestionTitle, setAdminQuestionTitle] = useState([]);

  const [allQuestionLength, setAllQuestionLength] = useState();
  const [currentQuestionLength, setCurrentQuestionLength] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [adminCurrentIndex, setAdminCurrenIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [totoalCurrentQuestion, setTotatCurrentQuestion] = useState([]);
  const [totalAllQuestion, setTotalAllQuestion] = useState([]);
  const [playerScore, setPlayerScore] = useState([]);
  const [playerScoreGameIndex, setPlayerScoreGameIndex] = useState(0);
  const [assignedMark, setAssignedMark] = useState(0);
  const [topActAnimation, setTopActAnimation] = useState(2);
  const [spinnerStatus, setSpinnerStatus] = useState(false);
  const [currentTime, setCurrentime] = useState({
    minutes: 0,
    second: 0,
  });

  const [currentSecond, setCurrentSecond] = useState(-1);
  const [currentSecond2, setCurrentSecond2] = useState(60);
  const [currentMinutes, setCurrentMinutes] = useState(-1);

  // PLAYER
  const [allPlayersPlaying, setAllPlayersPlaying] = useState([]);
  const [individualName, setIndividualName] = useState("");
  const [ifPicked, setifPicked] = useState(-1);
  const [currentSubject, setCurrentSubject] = useState("");
  const adminVerifyEndPoint = `${gameEndPoint}/verifystatus`;
  let socketIdentification = "";

  //  time
  const [minutes, setMinutes] = useState(-1);
  const [second, setSecond] = useState(-1);
  const [timerStatus, setTimerStatus] = useState(false);

  // self
  const [selTime, setSelfTime] = useState(0);
  const getSocketIdFunction = () => {};
  // completed message
  const [completedMessage, setCompletedMessage] = useState("");
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
          

          if (result.data.adminStatus) {
          
            setAdmin(result.data.adminStatus);
            // setAdmin(false)
            setRoomId(result.data.quizIdNumberPlayedId);
            // setAdminQuestion(result.data.questionToBeAnswered);
            setAdminQuestionTitle(result.data.questionToBeAnswered);
            setQuizMode(result.data.mode);
            socket.current.emit("createRegistrationBox", {
              quizId: result.data.quizIdNumberPlayedId,
              adminPage: adminStage,
              mode: result.data.mode,

              date: new Date(),
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
  let uses = {};

  useEffect(() => {
    joinTheGame();
  
  }, []);
  const [wait, setWait] = useState(false);
  const [socketUniqueId, setSocketUniqueId] = useState("");
  // generate your socket uniquq=e id
  const getUniqueId = () => {
    if (socket.current) {
      socket.current.on("userId", (uid) => {
        setSocketUniqueId(uid.id);
      });
    }
  };
  // function for alert modal
  const alertModalMessage = (a, b, c, d) => {
    setAlertModalStatus(a);
    setAlertMessage(b);
    setTimeout(() => {
      setAlertModalStatus(c);
      setAlertMessage(d);
    }, 2000);
  };
  // responsible for the current page incase the admin reload
  const ifItExistAndProbablyReload = () => {
    if (socket.current) {
      socket.current.on("currentPage", (data) => {
        if (data.roomId === roomId) {
          if (data.stage === 1) {
            setAllPlayersPlaying(data.players);
            setAdminStage(data.adminPage);
          } else if (data.stage === 2) {
            setAdminStage(data.adminPage);
            setStartLoading(false);
            setAdminQuestion(data.currentQuestion);
            setCurrentQuestion(data.currentQuestion);
            setWait(true);
            setCurrentSecond();
       
          } else if (data.stage === 3) {
            setAdminStage(data.adminPage);
          } else if (data.stage === 4) {
            setAdminStage(data.adminPage);
          }
        }
      });
    }
  };
  const checkIfAPlayerJoined = () => {
    if (socket.current) {
      socket.current.on("playersJoinings", (playersJoining) => {
        setAllPlayersPlaying(playersJoining.players);
     
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

  const [adminModeQuestion, setAdminModeQuestion] = useState({});

  // this makes the time and the answer to be unseen untill a time is given to
  // answer the question
  const [startBtnForAdmin, setStartBtnForAdmin] = useState(false);
  const [answerTimeStatus, setAnswerTimeStatus] = useState(false);

  const [assignedScoreMode1, setAssignedScoreMode1] = useState(1);
  const [mode1Score, setMode1Score] = useState(-1);
  // makes it impossible for them to answer and pick the answer by itself
  const [showScreen, setShowScreen] = useState(false);
  const [answerId, setAnswerId] = useState(-1);
  const [answerStyle, setAnswerStyle] = useState("");
  const [adminIdButtonClickedIndicator, setadminIdButtonClickedIndicator] =
    useState(-1);
  const [scoreIndex, setScoreIndex] = useState(-1);
  const [adminMode1QuestionNumber, setAdminModeQuestionNumber] = useState(1);
  // const [correctAnswerIndex, se]
  const CancelStyleFunction = () => {
    setShowScreen(false);
    setAnswerStyle("");
    setadminIdButtonClickedIndicator(-1);
    setAnswerTimeStatus(false);
  };

  // already played
  const alreadyPlayedFunction = () => {
    if (socket.current) {
      socket.current.on("alreadyPlayed", (data) => {
        if (data.roomId === roomId) {
          if (admin) {
            alertModalMessage(true, "Already done with", false, "");
            setAdminStage("AdminPage01");
            setStartLoading(false);
          }
        }
      });
    }
  };

  // Stage 1
  const mode1StartSubjectPlayers = () => {
    if (socket.current) {
      socket.current.on("openQuestionAdminMode1Players", (data) => {
       
        setAnswerTimeStatus(false);
        setAnswerStyle("");
        setShowScreen(false);
        setAdminModeQuestionNumber(data.currentGameIndex);
        setAdminStage(data.adminStage);
        setAdminModeQuestion(data.currentQuestion);
        setCurrentSubject(data.currentSubject);
        setStartLoading(false);
        setQuizMode(data.mode);
        setStartBtnForAdmin(false);
        data.currentQuestion.answers.map((answers, id) => {
          if (answers.status) {
            setAnswerId(id);
          }
        });
      });
    }
  };
  const mode1StartSubjectAdmin = () => {
    if (socket.current) {
      socket.current.on("openQuestionAdminMode1", (data) => {
        if (data.roomId === roomId) {
          if (admin === true) {
            setAnswerTimeStatus(false);
            setAnswerStyle("");
            setShowScreen(false);
            setAdminModeQuestionNumber(data.currentGameIndex);
            setAdminStage(data.adminStage);
            setAdminModeQuestion(data.currentQuestion);
            setCurrentSubject(data.currentSubject);
            setStartLoading(false);
            setStartBtnForAdmin(true);
            data.currentQuestion.answers.map((answers, id) => {
              if (answers.status) {
                setAnswerId(id);
              }
            });
          }
        }
      });
    }
  };

  // responsible for time
  const mode1TimeFunction = () => {
    if (socket.current) {
      socket.current.on("quizMode1Time", (data) => {
        if (data.roomId === roomId) {
          setCurrentSecond(data.time);
          setAssignedScoreMode1(data.mark);
          setAnswerTimeStatus(true);
          setWait(true);
          setStartBtnForAdmin(false);
        }
      });
    }
  };

  // responsible for submitting every subject
  const submitModeOneSubject = () => {
    if (socket.current) {
      socket.current.on("collectAnswer", (data) => {
        if (data.roomId === roomId) {
          setShowScreen(true);
          setAnswerStyle(answerId + "yes");
          setadminIdButtonClickedIndicator(-1);

          if (admin) {
            setTimeout(() => {
              setStartLoading(true);
            }, 4000);
          }

          if (admin === false) {
            if (mode1Score === -1) {
              setMode1Score(0);
            }
            setTimeout(() => {
              setStartLoading(true);
              socket.current.emit("submittedAnswer", {
                currentSubject: currentSubject,
                name: individualName,
                roomId: data.roomId,
                score: mode1Score,
              });
            }, 4000);
          }
        }
      });
    }
  };

  // It shows what they get after each Question
  const showScoreAfterEachQuestion = () => {
    if (socket.current) {
      socket.current.on("showAdminMode1CurrentScore", (data) => {
        if (data.roomId === roomId) {
          setSpinnerStatus(false);
          setAdminStage("AdminPage05");
          setScoreIndex(data.scoreIndex);
          setPlayerScore(data.players);
          setPlayerScoreGameIndex(data.subjectDoneIdentification);
          setCurrentSubject(data.currentSubject);
          setTopActAnimation(1);

          setTimeout(() => {
            setTopActAnimation(2);
          }, 2000);
        }
      });
    }
  };

  const adminMode1NextQuestionPlayers = () => {
    if (socket.current) {
      socket.current.on("changeQuestionAdminMode1Players", (data) => {
        // meant to cancel the style
        setShowScreen(false);
        setAnswerStyle("");

        setadminIdButtonClickedIndicator(-1);
        setAnswerTimeStatus(false);
        // ////////////////////////
        setAdminModeQuestionNumber(data.currentGameIndex);
        setAdminStage(data.adminStage);
        setAdminModeQuestion(data.currentQuestion);
        setCurrentSubject(data.currentSubject);
        setStartLoading(false);
        setQuizMode(data.mode);
        data.currentQuestion.answers.map((answers, id) => {
          if (answers.status) {
            setAnswerId(id);
          }
        });
      });
    }
  };
  const adminMode1NextQuestionAdmin = () => {
    if (socket.current) {
      socket.current.on("changeQuestionAdminMode1Admin", (data) => {
        if (data.roomId === roomId) {
          if (admin) {
            // meant to cancel the style
            setShowScreen(false);
            setAnswerStyle("");
            setadminIdButtonClickedIndicator(-1);
            setAnswerTimeStatus(false);
            // ////////////////////////
            setAdminModeQuestionNumber(data.currentGameIndex);
            setAdminStage(data.adminStage);
            setAdminModeQuestion(data.currentQuestion);
            setCurrentSubject(data.currentSubject);
            setStartLoading(false);
            setStartBtnForAdmin(true);
            data.currentQuestion.answers.map((answers, id) => {
              if (answers.status) {
                setAnswerId(id);
              }
            });
          }
        }
      });
    }
  };

  const adminMode1SubjectOverallFunction = () => {
    if (socket.current) {
      socket.current.on("adminMode1SubjectOverall", (data) => {
        if (data.roomId === roomId) {
        
          setWait(false);
          setAdminStage(data.adminStage);
          setPlayerScore(data.ranking);
          setPlayerScoreGameIndex(data.index);
          setCurrentSubject(data.subject);
          setTopActAnimation(1);

          setTimeout(() => {
            setTopActAnimation(2);
          }, 2000);
        }
      });
    }
  };

  ////////////
  // stage 2
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

        setCurrentSecond(data.time);
        setAdminStage(data.adminPage);
        setStartLoading(data.loading);
        setCurrentQuestion(data.question);
        setCurrentSubjectName(data.currentSubject);
        setAssignedMark(data.assignedMark);
        setQuizMode(data.mode);
        setWait(true);
        setifPicked(-1);
      });
    }
  };

  const switchToStartAdminPage = () => {
    if (socket.current) {
      socket.current.on("startGameOnAdminPageAlso", (data) => {
        if (data.adminId === roomId) {
          if (admin) {
      
            setStartLoading(false);
            setAdminQuestion(data.currentSubject);
            setCurrentSecond(data.time);
            setWait(true);
          }
        }
      });
    }
  };

  // if the game has been played before
  const ifGamePlayed = () => {
    if (socket.current) {
      socket.current.on("ifPlayedBefore", (data) => {
        if (admin) {
          if (data.adminId === roomId) {
            alertModalMessage(true, "Already done with", false, "");
            startLoading(false);
          }
        }
      });
    }
  };
  const adminNextQuestion = () => {
    if (socket.current) {
      socket.current.on("adminId", (data) => {
        if (data.roomId === roomId) {
          setWait(true);
          setAdminQuestion(totoalCurrentQuestion[data.currentGameId]);
          setCurrentSecond(data.time);
        }
      });
    }
  };
  const nextQuestion = () => {
    if (socket.current) {
      socket.current.on("nextQuestion", (data) => {
        setWait(true);
        setCurrentime(data.time);
        setCurrentSecond(data.time);
        setAdminStage(data.adminPage);
        setCurrentQuestion(data.question);
        setCurrentSubjectName(data.currentSubject);
        setAssignedMark(data.assignedMark);
        setifPicked(data.check);
        setifPicked(-1);
      });
    }
  };

  const changeToSemiVictoryStage = () => {
    if (socket.current) {
      socket.current.on("changeToVictoryPage", (data) => {
        setWait(false);
        setAdminStage(data.adminStage);

        setPlayerScore(data.playerRanking);
        setPlayerScoreGameIndex(data.currentIndex);
        setCurrentSubject(data.currentSubject);
        setTopActAnimation(1);
        setTimeout(() => {
          setTopActAnimation(2);
        }, 2000);
      });
    }
  };

  const changeNextSubjectFunction = () => {
    if (socket.current) {
      socket.current.on("changePageToNextSubject", (info) => {
    
        if (info.adminId === roomId) {
          if (admin) {
            setAdminStage("AdminPage01");
          } else {
            setAdminStage("AdminPage02");
            setStartLoading(true);
          }
        }
      });
    }
  };
  //alert user to submit
  // const alertUserToSubmit = () => {
  //   if (socket.current) {
  //     socket.current.on("alertUserToSubmit", (data) => {
  //       if (data.info === roomId) {
  //         if (!admin) {
  //           socket.current.emit("overallResult", { name: individualName, gameId:roomId });
  //         }
  //       }
  //     });
  //   }
  // }
  const [userPosition, setUserPosition] = useState([]);
  const changeToVictoryPageFunction = () => {
    if (socket.current) {
      socket.current.on("overallResult", (data) => {
        if (data.adminId === roomId) {
          CancelStyleFunction();
          setAdminStage("AdminPage04");
          setPlayerScore(data.overallResult);
          setUserPosition(data.position);
          setTopActAnimation(1);
          setWait(false);
          setTimeout(() => {
            setTopActAnimation(2);
          }, 2000);
        }
      });
    }
  };
  // till function loads spinner till result is saved
  const loadSpinnerFunction = () => {
    if (socket.current) {
      socket.current.on("openSpinner", (data) => {
        if (data.adminId === roomId) {
          setSpinnerStatus(true);
        }
      });
    }
  };

  // when result is finally saved
  const whenResultIsSavedFunction = () => {
    if (socket.current) {
      socket.current.on("whenSaved", (data) => {
        if (data.adminId === roomId) {
          if (admin) {
            setSpinnerStatus(false);
            setAdminStage("AdminPage01");
            setStartOrPlayerJoining(2);
            setCompletedMessage("You've completed the game");
          }
          // tell them the quiz has been completed and I will get the button disabled

          // and it will disable the button
        }
      });
    }
  };

  var timer;
  const [place, setplace] = useState(0);

  //Stage 3
  // self more like a cbt question
  // user
  const [selfQuizQuestion, setSelfQuizQuestion] = useState([]);
  const [selfCurrentQuestion, setSelfCurrentQuestion] = useState({});
  const [subjectScoreBox, setSubjectScoreBox] = useState([]);
  const [quizNumberAttempted, setQuizNumberAttempted] = useState([]);
  const [knowPickedAnswer, setPickedAnwser] = useState([]);

  const startStage3QuestionFunction = () => {
    if (socket.current) {
      socket.current.on("stage3Question", (data) => {
    
        setCurrentQuestionIndex(0);
        setAdminStage(data.adminPage);
        setStartLoading(true);
        setCurrentSubjectName(data.subjectName);
        setSelfQuizQuestion(data.question);
        setSelfCurrentQuestion(data.question[currentQuestionIndex]);
        setQuizNumberAttempted(data.scoreBox);
        setQuizNumberAttempted(data.scoreBox);
        setPickedAnwser(data.scoreBox);
        setCurrentSecond(data.time);
        setAssignedMark(data.subjectMark);
      
        setTimeout(() => {
          setQuizMode(data.mode);
          setWait(true);
          setStartLoading(false);
        }, 1000);
      });
    }
  };
  // check if youv've completed a subject for stage 3
  const selfModeAlreadyPlayed = () => {
    if (socket.current) {
      socket.current.on("youcant", (data) => {
        alertModalMessage(true, "Already done with", false, "");
        setAdminStage("AdminPage01");
        setStartOrPlayerJoining(2);
      });
    }
  };

  // what shows on the adminpage is the time while the participants answer the question

  const adminPageWhileQuizFunction = () => {
    if (socket.current) {
      if (admin) {
        socket.current.on("stage3AdminQuestion", (data) => {
          if (data.adminId === roomId) {
            setStartLoading(true);
            setTimeout(() => {
              setAdminStage(data.adminPage);
              setCurrentSecond(data.time);
              setWait(true);
              setStartLoading(false);
            }, 1000);
          }
        });
      }
    }
  };
  // self Submit
  const selfSubmitFunction = () => {
    if (socket.current) {
      socket.current.on("youveSubmitted", (data) => {
        alertModalMessage(true, data.message, false, "");
      });
    }
  };
  const [sendResult, setSendResult] = useState(0);
  const [userNamee, setUserName] = useState("");

  const submitAnswerFunction = () => {
    let totalScore = 0;
    if (socket.current) {
      socket.current.on("collectPlayersAnswers", (data) => {
        const calculate = () => {
          return new Promise((resolve, reject) => {
           
            setUserName(individualName);

          
            setStartLoading(true);
            const error = false;
            if (!error) {
              resolve();
            } else {
              reject();
            }
          });
        };

        const sendMessage = () => {
          return new Promise((resolve, reject) => {
            socket.current.emit("verifyToSubmitAnswer", {
              username: individualName,
              roomId: data.roomId,
              currentSubject: currentSubjectName,
              totalScore: subjectScoreBox,
              status: true,
            });

            const error = false;
            if (!error) {
              resolve();
            } else {
              reject();
            }
          });
        };
        const sendAll = async () => {
          await calculate();
          await sendMessage();
        };
        sendAll();
      });

      // we will collect the current subject
      // the name, the roomId
    }
  };

  // Stage 3 pre result based on the total after each subject
  const stage3PreResultFunction = () => {
    if (socket.current) {
      socket.current.on("stage3PreSubject", (data) => {
        if (data.roomId === roomId) {
      
          setAdminStage(data.adminStage);
          setPlayerScore(data.ranking);
          setPlayerScoreGameIndex(data.subjectId);
          setCurrentSubject(data.currentSubject);

          // //////////////////
          setCurrentSubjectName("");
          setPickedAnwser([]);
          setSubjectScoreBox([]);
          setTimeout(() => {
            setTopActAnimation(2);
          }, 1000);
        }
      });
    }
  };

  useEffect(() => {
    getUniqueId();
    // stage1 the admin has the control to read the question, next
    alreadyPlayedFunction();
    ifItExistAndProbablyReload();
    checkIfAPlayerJoined();
    ifYouJoined();
    switchToLoadFunction();
    // stage 1 Admin
    mode1StartSubjectAdmin();
    mode1StartSubjectPlayers();
    mode1TimeFunction();
    submitModeOneSubject();
    showScoreAfterEachQuestion();
    adminMode1NextQuestionPlayers();
    adminMode1NextQuestionAdmin();
    adminMode1SubjectOverallFunction();
    // adminMode1QuestionNumber()
    // stage2, this is the automatic one that runs based on the time
    switchToStart();
    switchToStartAdminPage();
    nextQuestion();
    ifGamePlayed();
    adminNextQuestion();
    selfSubmitFunction();
    // alertUserToSubmit()
    changeToSemiVictoryStage();
    changeNextSubjectFunction();
    changeToVictoryPageFunction();
    loadSpinnerFunction();
    whenResultIsSavedFunction();

    // stage 3
    // self more like a cbt question
    startStage3QuestionFunction();
    selfModeAlreadyPlayed();
    adminPageWhileQuizFunction();
    submitAnswerFunction();
    stage3PreResultFunction();

    if (wait) {
      timer = setInterval(() => {
        setCurrentSecond(currentSecond - 1);
        if (currentSecond === 0) {
          if (admin) {
            if (admin) {
              if (quizMode === 1) {
                if (admin) {
                  socket.current.emit("mode1SubmitQuestion", {
                    roomId: roomId,
                  });
                  setWait(false);
                }
              } else if (quizMode === 2) {
                socket.current.emit("changeQuestion", {
                  roomId: roomId,
                  currentQuestion: currentQuestion[currentQuestionIndex],
                });
                setWait(false);
              } else if (quizMode === 3) {
                socket.current.emit("selfSubmitQuestion", {
                  roomId: roomId,
                });
                setStartLoading(true);
                setWait(false);
              }
            }
          } else {
            setWait(false);
          }
        }

      
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

  const [nextBtn, setNextBtn] = useState(false);

  const startQuizBtn = (quizname, id) => {
  
    if (adminQuestionTitle[id].questions.length > 0) {
      if (quizMode === 1) {
      setAdminStage("AdminPage02");
      setStartLoading(true);
      socket.current.emit("adminModeStart", {
        allQuestion: adminQuestionTitle,
        currentQuestion: adminQuestionTitle[id].questions,
        allQuestionLength: adminQuestionTitle.length,
        currentIndex: 0,
        identification: roomId,
        adminPage: "AdminPage02",
        currentSubjectName: adminQuestionTitle[id].quizName,
        assignedMark: adminQuestionTitle[id].subjectMark,
      });
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
      
      }, 2000);
    } else if (quizMode === 3) {
      // here the admin will give the student a time to answer all the whole questions
      setCurrentSubject(adminQuestionTitle[id].quizName);
      setPlayerQuestion(adminQuestionTitle[id].questions);

    
      setTimerStatus(true);
    }
    } else {
       alertModalMessage(true, "QuestionBox is Empty", false, "")
    }
    
  };

  // stage 1

  const startAdminGameBtn = () => {
    setTimerStatus(true);
  };

  const adminModePickAnswerBtn = (status, answerId) => {
    if (status) {
      setMode1Score(assignedScoreMode1);
    } else {
      setMode1Score(0);
    }
  
    setadminIdButtonClickedIndicator(answerId);
  };

  const adminMode1NextButton = () => {
    socket.current.emit("changedToNextQuestionOrSubjectOverallAdminMode1", {
      roomId: roomId,
    });
  };

  // stage 2
  const pickAnswer = (status, id) => {
  
    setifPicked(id);
    socket.current.emit("submitAnwser", {
      roomId: roomId,
      playerName: individualName,
      currentSubject: currentSubjectName,
      assignedMark: assignedMark,
      currentStatus: status,
      // currentIindex:currentQuestionIndex,
    });
  };

  // switch to next game
  const nextSubjectOrOverallResult = () => {
   
    socket.current.emit("nextSubjectOrOverallResult", {
      gameId: roomId,
    });
  };

  const quizCompleted = () => {
    // alert(20)
    socket.current.emit("completedQuiz", { gameId: roomId });
  };

  // stage 3

  const startSelfModeBtn = () => {
    if (quizMode === 1) {
      if (selTime > 0) {
        socket.current.emit("emitTimeAndEnabledButton", {
          roomId: roomId,
          currentTime: selTime,
        });
        setTimerStatus(false);
         setSelfTime(0);
      } else {
         alertModalMessage(true, "Time counts in seconds, enter a digit", false, "")
      }
    } else if (quizMode === 3) {
      if (selTime > 0) {  
        socket.current.emit("startSelfMode", {
          socketId: socketUniqueId,
          question: playerQuestion,
          currentSubjectName: currentSubject,
          roomId: roomId,
          allSubjects: adminQuestionTitle,
          time: selTime,
          allTotalSubject: adminQuestionTitle,
        });
        setAdminStage("AdminPage02");
        setStartLoading(true);
        setTimerStatus(false);
        setSelfTime(0)
      } else {
            alertModalMessage(true, "Time counts in seconds, enter a digit", false, "")
      }
    }
  };

  // next and prev btn
  const selfPrevBtn = () => {
    if (currentQuestionIndex === 0) {
      setCurrentQuestionIndex(selfQuizQuestion.length - 1);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }

    setSelfCurrentQuestion(selfQuizQuestion[currentQuestionIndex]);
  };
  const selfNextBtn = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    // setSelfCurrentQuestion(selfQuizQuestion(2))
    if (currentQuestionIndex === selfQuizQuestion.length - 1) {
      setCurrentQuestionIndex(0);
    }
    setSelfCurrentQuestion(selfQuizQuestion[currentQuestionIndex]);
  };
  useEffect(() => {
    setSelfCurrentQuestion(selfQuizQuestion[currentQuestionIndex]);
  }, [currentQuestionIndex]);
  const selfQuestionIndicatorBtn = (id) => {
    setCurrentQuestionIndex(id);
  };

  const selfPickAnswerBtn = (status, id) => {
    const changeStyle = [...knowPickedAnswer];
    changeStyle[currentQuestionIndex] = id + 1;
    setPickedAnwser(changeStyle);
    if (status) {
      const item = [...subjectScoreBox];
      item[currentQuestionIndex] = assignedMark;
      setSubjectScoreBox(item);
    } else {
      const item = [...subjectScoreBox];
      item[currentQuestionIndex] = 0;
      setSubjectScoreBox(item);
    }
  

    // It shows youv've attempted a question and the number of questions attempted
    const attemptedQuestion = [...quizNumberAttempted];
    attemptedQuestion[currentQuestionIndex] = 1;
    setQuizNumberAttempted(attemptedQuestion);
  };

  const selfSubmitBtn = () => {
    socket.current.emit("selfSubmit", {
      uniqueId: socketUniqueId,
      username: individualName,
      roomId: roomId,
      currentSubject: currentSubjectName,
      totalScore: subjectScoreBox,
      status: true,
    });
    setStartLoading(true);
  };
  return (
    <gameContext.Provider
      value={{
        admin,
        adminQuestionTitle,
        allPlayersPlaying,
        individualName,
        startQuizBtn,
        currentSecond,
        //  Stage 1
        startAdminGameBtn,
        adminMode1QuestionNumber,
        adminModePickAnswerBtn,
        adminIdButtonClickedIndicator,
        adminModeQuestion,
        answerTimeStatus,
        startBtnForAdmin,
        showScreen,
        answerStyle,
        scoreIndex,
        adminMode1NextButton,
        // stage2 and some not cause I did stage 2 first
        currentQuestion,
        adminQuestion,
        pickAnswer,
        ifPicked,
        currentTime,
        playerScore,
        userPosition,
        playerScoreGameIndex,
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
        selfSubmitBtn,
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
                    {quizMode === 1 && (
                      <div className="w-10p">
                        <AdminModeQuestionPlayer />
                      </div>
                    )}
                    {quizMode === 2 && (
                      <div>
                        <AdminQuestion />
                      </div>
                    )}
                    {quizMode === 3 && (
                      <div className="w-10p h-10p fixed top-0 bg-green-like-100 flex justify-center items-center">
                        <div className="w-dw h-dw">
                          <p className="text-white  text-5xl text-serif texty">
                            {currentSecond}
                          </p>
                        </div>
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
            {adminStage === "AdminPage05" &&
              (topActAnimation === 1 ? (
                <div>
                  <TopActAnimation />
                </div>
              ) : (
                <div>
                  <AdminModeTopActs />
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
                      <div className="w-10p">
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
            {adminStage === "AdminPage05" &&
              (topActAnimation === 1 ? (
                <div>
                  <TopActAnimation />
                </div>
              ) : (
                <div>
                  <AdminModeTopActs />
                </div>
              ))}
            {spinnerStatus && (
              <div>
                <StartGameLoading />
              </div>
            )}
          </div>
        )}
        <AlertModal />
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
