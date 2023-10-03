import Logo from "./Logo";
import { FaAngleRight } from "react-icons/fa";
import "../styles/gamelogin.css";
import { appContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../Images/Logo.png";
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
      
      });
    }
  }
  useEffect(() => {
    getIdFunction()
  },[])
  const checkForGame = () => {

    
    if (userGamePassword === "") {
      setMessage("Fill in input")
    } else {
      setSpin("spin");
      axios.post(userLoginEndPoint, { password: userGamePassword }).then((result) => {
        if (result.data.status) {
      
         localStorage.pass = result.data.passId
         navigate("/play/username");
        } else {
          setSpin("")
          setMessage(result.data.message)
          
        }
      
      })
    }
  };
  return (
    <div className="w-10p h-10p fixed top-0 flex justify-center items-center">
      <div className="sign_Up">
        <div className="logo_name">
          <h2 className="text-l_bold">
            <span>T</span> <br />
            <span>R</span> <br />
            <span>I</span> <br />
            <span>V</span> <br />
            <span>Y</span> <br />
          </h2>
        </div>
        <div className="bg-l_bold sign_up_div">
          <div className="w-dimageSize">
            <div className="w-10p flex justify-center my-3">
              <img src={logo} className="h-4 w-4" alt="" />
            </div>
            <p className="text-center text-green-like-100 text-2xl font-mono">
              {message}
            </p>
            <div className="w-8p  mx-auto  py-2">
              <p className="text-center text-white">Enter Game Pin</p>
            </div>
            <div className="w-10p flex justify-center">
              <input
                type="password"
                onChange={(e) => setUserGamePassword(e.target.value)}
                className="w-8p h-8 border border-green-like-100 rounded-sideicon text-center text-2xl font-bold text-green-like-100 focus:outline-green-like-100"
              />
            </div>
            <div className="w-10p flex justify-center my-3">
              <button disabled={spin === "spin"}
                className="h-7 w-7 bg-green-like-100 flex justify-center items-center"
                style={{ borderRadius: "48px" }}
                onClick={() => checkForGame()}
              >
                <FaAngleRight className={`text-5xl text-white ${spin}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualGameLogin;
