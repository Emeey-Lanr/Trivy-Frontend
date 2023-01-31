import { useState, useEffect, useContext } from "react";
import { FaInfo } from "react-icons/fa";
import { appContext } from "../App";
const Game = () => {
  const { socket, userName } = useContext(appContext);
  const [playing, setPlaying] = useState("");
  const [userid, setUserId] = useState({
    id: "",
  });
  const [messageUser, setUserMessage] = useState("");

  const chatSendDetails = () => {
    if (socket.current) {
      socket.current.on("clientId", (socketId) => {
        socket.current.emit("saveUser", { usercoming: socketId.clientId });
      });
    }
  };
  useEffect(() => {
    chatSendDetails();
  }, []);
  const checkifMessage = () => {
    console.log("m")
     if (socket.current) {
      socket.current.on("message", (message) => {
        // console.log(message)
        setUserMessage(message.name);
      });
    }
  }

  useEffect(() => {
    checkifMessage()
   
  });
  return (
    <div>
      <p>{messageUser}</p>
    </div>
  );
};

export default Game;
