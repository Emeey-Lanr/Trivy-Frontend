import { useContext, useState } from "react";
import userPic from "../Images/bestStudent.jpg";
import "../styles/game.css";
import { gameContext } from "./Game";
const AdminPlayers = () => {
 const { allPlayersPlaying, individualName } = useContext(gameContext);
  return (
    <div className="w-10p">
      <div className="playersJoining rounded-sideicon py-5">
        {allPlayersPlaying.length > 0 &&
          allPlayersPlaying.map((user, id) => (
            <div className="playerPlaying w-10p my-2 shadow-lg">
              <div className="w-8p mx-auto">
                <img
                  src={user.playerImage}
                  alt=""
                  className="h-12 w-10p object-cover"
                />
              </div>
              <div className="bg-green-like-100 py-2 rounded-sideicon">
                <p className="text-white text-center text-sm">
                  {user.playerName.split("").length > 10}
                  {individualName === user.playerName
                    ? "You Joined"
                    : user.playerName }
                
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminPlayers;
