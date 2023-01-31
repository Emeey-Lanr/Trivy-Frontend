import Logo from "./Logo";
import { SlCloudUpload } from "react-icons/sl";
import { FaAngleRight } from "react-icons/fa";
import { appContext } from "../App";
import { useContext, useEffect, useState, useLayoutEffect } from "react";
import { useRevalidator } from "react-router-dom";
const NameJoin = () => {
  const { socket, userName, setUsername } = useContext(appContext);
  const [name, setName] = useState("");
  const [displayName, setDis] = useState("");
  const [userid, setuserid] = useState({});
  const checkifMessage = () => {
     if (socket.current) {
       socket.current.on("message", (data) => {
        setDis(data.name)
      })
    }
  }
  useEffect(() => {
   checkifMessage()
   
  });

  const joinGame = () => {
    socket.current.emit("playing", { name: name });
    
  };

  return (
    <div className="w-10p h-10p fixed top-0 flex justify-center items-center">
      <div className="w-dimageSize">
        <div className="w-10p flex justify-center my-2">
          <Logo />
        </div>
        <div className="w-10p">
          <div className="rounded-sideicon">
            <p>{displayName}</p>
            <p className="text-center text-white">Upload your picture</p>
          </div>
          <div className="w-10p flex justify-center">
            <label htmlFor="" id="img">
              <SlCloudUpload className="text-5xl text-green-like-100" />
              <input type="files" id="img" hidden />
            </label>
          </div>
          <div className="w-10p">
            <div className="bg-green-like-100 py-2 rounded-sideicon">
              <p className="text-center text-white">Enter your user name</p>
            </div>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-10p h-6 border border-green-like-100 text-center text-green-like-100 font-bold text-2xl focus:outline-green-like-100"
            />
          </div>
          <div className="w-10p flex justify-center my-3">
            <button
              className="h-7 w-7 bg-green-like-100 flex justify-center items-center"
              style={{ borderRadius: "48px" }}
              onClick={() => joinGame()}
            >
              <FaAngleRight className="text-5xl text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameJoin;
