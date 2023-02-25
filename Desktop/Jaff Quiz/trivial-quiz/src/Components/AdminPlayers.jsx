import { useContext, useState } from "react";
import userPic from "../Images/bestStudent.jpg";
import "../styles/game.css";
import { gameContext } from "./Game";
const AdminPlayers = () => {
 const { allPlayersPlaying, individualName } = useContext(gameContext);
  return (
    <div className="w-10p">
      <div className="playersJoining bg-green-like-100 rounded-sideicon py-5">
        {allPlayersPlaying.length > 0 &&
          allPlayersPlaying.map((user, id) => (
            <div className="w-10p my-2">
              <div className="w-8p mx-auto">
                <img
                  src={user.playerImage}
                  alt=""
                  className="h-12 w-10p object-cover"
                />
              </div>
              <div className="bg-white py-2 rounded-sideicon">
                <p className="text-green-like-100 text-center text-sm">
                  {individualName === user.playerName
                    ? "You Joined"
                    : user.playerName}{" "}
                
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminPlayers;
