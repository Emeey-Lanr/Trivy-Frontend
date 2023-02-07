import React, { useContext, useEffect, useState } from "react";
import { appContext } from "../App";
const Trail = () => {
  const { socket } = useContext(appContext);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [ifExist, setIfExist] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [message, setMesage] = useState("");

  const collectId = () => {
    if (socket.current) {
      socket.current.on("clientId", (data) => {
        console.log(data);
        setUserId(data.clientId);
      });
    }
  };

  const [change, setChange] = useState(true);
  const checkIfExistFunction = () => {
    if (socket.current) {
      socket.current.on("ifExist", (message) => {
        console.log(message);
        if (message.status) {
          setIfExist(message.message);
        } else {
          setChange(false);
        }
      });
    }
  };
  const ifMessage = () => {
    if (socket.current) {
      socket.current.on("message", (mess) => {
        setMesage(mess.message);
      });
    }
  };
  useEffect(() => {
    collectId();
    if (socket.current) {
    }
  }, []);
  useEffect(() => {
    checkIfExistFunction();
    ifMessage();
  });

  const enterUserName = () => {
    localStorage.room = name;
    socket.current.emit("userId", { id: userId, name: name });
  };

  const sendMesage = () => {
    socket.current.emit("messageRoom", {
      roomName: localStorage.room,
      comingMessage: messageInput,
    });
  }; 
  return (
    <div>
      {change ? (
        <div>
          <p>Enter Room Name</p>
          <div>
            <p>List of room</p>
            <p>English</p>
            <p>Maths</p>
            <p>Physics</p>
          </div>
          <p>{ifExist}</p>
          <input
            type="text"
            className="border"
            onChange={(e) => setName(e.target.value)}
          />
          <div>
            <button
              onClick={() => enterUserName()}
              className="bg-green-like-100 py-2 px-3"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>{message}</p>
          <p>Input Message</p>
          <input
            type="text"
            className="border"
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <div>
            <button
              className="bg-green-like-100 py-2 px-3"
              onClick={() => sendMesage()}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trail;
