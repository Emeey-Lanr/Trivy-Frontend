import { useState, useEffect, useContext } from "react";
import { FaInfo } from "react-icons/fa";
import { appContext } from "../App";
import AdminPlayers from "./AdminPlayers";
import AdminQuestion from "./AdminQuestion";
import AdminStartGame from "./AdminStartGame";
import Logo from "./Logo";
import PlayerQuestion from "./PlayerQuestion";
import TopActs from "./TopActs";
const Game = () => {
  const { socket, userName } = useContext(appContext);
  const [admin, setAdmin] = useState(true)
  const [clicked, setClicked] = useState(1)
  // for the user to know which button is being clicked
  const [startBtnStyle, setStartBtnStyle] = useState({
    clicked: "bg-green-like-100 text-white py-2 px-3 rounded-sideicon",
    notClicked: "bg-dashback-100 text-green-like-100 py-2 px-3",
  });


  const [startOrPlayerJoining, setStartOrPlayerJoining] = useState(1)
  // admin stage show which stage admin is
  const [adminStage, setAdminStage] =useState("AdminPage02")
  const checkPlayers = () => {
    setClicked(1)
    setStartOrPlayerJoining(1)
  }
  const startGame = () => {
    setClicked(2)
    setStartOrPlayerJoining(2)
  }

  return (
    <div>
      {admin ? <div>
        {/* start game */}
        {adminStage === "AdminPage01" && <div>
          {/* start game nav */}
          <div className="flex justify-between py-4 px-3 items-center">
            <div>
              <Logo />
            </div>
            <div className="flex">
              <button onClick={() => checkPlayers()} className={`${clicked === 1 ? startBtnStyle.clicked : startBtnStyle.notClicked}`}>Players</button>
              <button onClick={() => startGame()} className={`rouded-r-sideicon ${clicked === 2 ? startBtnStyle.clicked : startBtnStyle.notClicked}`}>Start</button>
            </div>
          </div>
          <div className="w-10p">
            {startOrPlayerJoining === 1 ? <AdminPlayers /> :
              <AdminStartGame />}
          </div>
        </div>}
        {adminStage === "AdminPage02" &&
          <div>
            <AdminQuestion />
          </div>
        }
        {adminStage === "AdminPage03" && <div>
          <TopActs />
        </div>}
      </div> : <div>
          {adminStage === "AdminPage01" && <div>
            <div className="flex justify-between py-4 px-3 items-center">
            <div>
              <Logo />
            </div>
          </div>
            <AdminPlayers/>

          </div>}
            {adminStage === "AdminPage02" && <div>
             <PlayerQuestion/>
          </div>}
            {adminStage === "AdminPage03" && <div>
             <AdminQuestion/>
          </div>}
      </div>}
    </div>
  );
};

export default Game;
