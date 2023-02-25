import Logo from "./Logo";
import { FaAngleRight } from "react-icons/fa";
import "../styles/gamelogin.css";
import { appContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const IndividualGameLogin = () => {
  let navigate = useNavigate();
  const {socket, gameEndPoint } = useContext(appContext);
  const [spin, setSpin] = useState("");
  const userLoginEndPoint = `${gameEndPoint}/verifyUserPin`
  const [userGamePassword, setUserGamePassword] = useState("")
  const [message, setMessage] = useState("")
  const [userSocketId, setUserSocketId] = useState("")
  const getIdFunction = () => {
    if (socket.currrent) {
      socket.currrent.on("userId", (unique) => {
        // setUserSocketId(socketId.id);
        console.log(unique);
      });
    }
  }
  useEffect(() => {
    getIdFunction()
  },[])
  const checkForGame = () => {
    console.log(userSocketId)
    
    if (userGamePassword === "") {
      setMessage("Fill in input")
    } else {
      setSpin("spin");
      axios.post(userLoginEndPoint, { password: userGamePassword }).then((result) => {
        if (result.data.status) {
          // socket.currrent.emit("checkIfAdminIsLoggedIn", { ifLoggedInPin: result.data.lastGameUniqueId })
          
         localStorage.pass = result.data.passId
         navigate("/play/username");
        } else {
          setMessage(result.data.message)
          
        }
      
      })
    }
  };
  return (
    <div className="w-10p h-10p fixed top-0 flex justify-center items-center">
      <div className="w-dimageSize">
        <div className="w-10p flex justify-center my-3">
          <Logo />
        </div>
        <p className="text-center text-green-like-100 text-2xl py-2 font-mono">
          {message}
        </p>
        <div className="w-8p bg-green-like-100 rounded-sideicon mx-auto  py-2">
          <p className="text-center text-white">Enter Game Pin</p>
        </div>
        <div className="w-10p flex justify-center">
          <input
            type="password"
            onChange={(e)=>setUserGamePassword(e.target.value)}
            className="w-8p h-8 border border-green-like-100 rounded-sideicon text-center text-2xl font-bold text-green-like-100 focus:outline-green-like-100"
          />
        </div>
        <div className="w-10p flex justify-center my-3">
          <button
            className="h-7 w-7 bg-green-like-100 flex justify-center items-center"
            style={{ borderRadius: "48px" }}
            onClick={() => checkForGame()}
          >
            <FaAngleRight className={`text-5xl text-white ${spin}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndividualGameLogin;
