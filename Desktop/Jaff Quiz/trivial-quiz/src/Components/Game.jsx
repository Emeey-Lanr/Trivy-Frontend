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
export const gameContext = createContext()
const Game = () => {
  const { socket, gameEndPoint, userName } = useContext(appContext);
  const [admin, setAdmin] = useState(false);
  const [socketId, setSocketId] = useState("")
  const [clicked, setClicked] = useState(1);
  // for the user to know which button is being clicked
  const [startBtnStyle, setStartBtnStyle] = useState({
    clicked: "bg-green-like-100 text-white py-2 px-3 rounded-sideicon",
    notClicked: "bg-dashback-100 text-green-like-100 py-2 px-3",
  });

  const [startOrPlayerJoining, setStartOrPlayerJoining] = useState(1);
  // admin stage show which stage admin is
  const [adminStage, setAdminStage] = useState("AdminPage01");

  // adminQuestion
  const [adminQuestion, setAdminQuestion] = useState([])
  const [playerQuestion, setPlayerQuestion] = useState([])

  const [adminQuestionTitle, setAdminQuestionTitle] = useState([])

  const [allQuestionLength, setAllQuestionLength] = useState()
  const [currentQuestionLength, setCurrentQuestionLength] = useState()
  const [currentQuestionIndex,setCurrentQuestionIndex] = useState()



  // PLAYER 
  const [allPlayersPlaying, setAllPlayersPlaying] = useState([])
  const [individualName, setIndividualName] = useState("")
  const adminVerifyEndPoint = `${gameEndPoint}/verifystatus`;
  const getSocketIdFunction = ()=>{
  
  }
  useEffect(() => {
    getSocketIdFunction()
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
            setAdmin(result.data.adminStatus); 
            setAdminQuestionTitle(result.data.questionToBeAnswered);
            socket.current.emit("createRegistrationBox", {quizId:result.data.quizIdNumberPlayedId})

          } else {
            setIndividualName(result.data.userDetails.playerName);
            setAdmin(result.data.adminStatus)
              if(socket.current){
      socket.current.on("userId", (userId)=>{
        setSocketId(userId.id)
        console.log(userId)
         socket.current.emit("register", {userDetails:result.data.userDetails, uniqueIdentification:result.data.quizIdNumberPlayedId, userId:userId.id})
    })
  }
           
             
          }
        }
      });
  }, []);

  const checkIfAPlayerJoined = () => {
    if (socket.current) {
      socket.current.on("playersJoinings", (playersJoining) => {
        setAllPlayersPlaying(playersJoining.players);
        console.log(playersJoining)
      })
    }
  }
const ifYouJoined =()=>{
if(socket.current){
  socket.current.on("showThatYouJoinedAlso", (playersJoining) => {
        setAllPlayersPlaying(playersJoining.players);
        console.log(playersJoining)
    })
}
  }
  useEffect(() => {
    checkIfAPlayerJoined()
    ifYouJoined()
  })
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
const  startQuizBtn = ()=>{

}
  return (
    <gameContext.Provider value={{adminQuestionTitle, allPlayersPlaying, individualName, startQuizBtn}}>
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
                <AdminQuestion />
              </div>
            )}
            {adminStage === "AdminPage03" && (
              <div>
                <TopActs />
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
                <PlayerQuestion />
              </div>
            )}
            {adminStage === "AdminPage03" && (
              <div>
                <AdminQuestion />
              </div>
            )}
          </div>
        )}
      </div>
    </gameContext.Provider>
  );
};

export default Game;
