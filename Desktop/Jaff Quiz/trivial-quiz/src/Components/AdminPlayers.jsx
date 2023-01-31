import { useState } from "react";
import userPic from "../Images/bestStudent.jpg";
import "../styles/game.css";
const AdminPlayers = () => {
  const [players, setPlayers] = useState([
    {
      name: "mike",
    },
    {
      name: "mike",
    },
    {
      name: "mike",
    },
    {
      name: "mike",
    },
    {
      name: "mike",
    },
    {
      name: "mike",
    },
    {
      name: "mike",
    },
    {
      name: "mike",
    },
    {
      name: "mike",
    },
    {
      name: "mike",
    },
    {
      name: "mike",
    },
    {
      name: "mike",
    },
    {
      name: "mike",
    },
  ]);
  return (
    <div className="w-10p">
      <div className="playersJoining bg-green-like-100 rounded-sideicon py-5">
        {players.map((ui) => (
          <div className="w-10p my-2">
            <div className="w-8p mx-auto">
              <img src={userPic} alt="" className="h-12 w-10p object-cover" />
            </div>
            <div className="bg-white py-2 rounded-sideicon">
              <p className="text-green-like-100 text-center text-sm">
                {ui.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPlayers;
