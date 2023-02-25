import Logo from "./Logo";
import axios from "axios";
import { appContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const AdminGameLogin = () => {
  let navigate = useNavigate();
  const {socket, gameEndPoint } = useContext(appContext);
  const [adminUserName, setAdminUserName] = useState("");
  const [message, setMessage] = useState("");
  const [gameId, setGameId] = useState("");
  const [btnStyle, setBtnStyle] = useState("bg-green-like-100 text-white");
  const [loginStyle, setLoginStyle] = useState("Login");
  const [disableBtn, setDisableBtn] = useState(false)

  // picking the type you want
  const [modeBtn, setModeBtn] = useState(0)


  const adimGameLoginEndPoint = `${gameEndPoint}/adminlogin`;
  const adminLoginSchema = {
    username: adminUserName,
    gameid: gameId,
    mode:modeBtn
  };

  const adminBtn = () => {
 setModeBtn(1)
    
  }
  const autoBtn = () => {
   setModeBtn(2)
    
  }
  const selfBtn = () => {
 setModeBtn(3)
  }
 
  const login = () => {
    
      if (adminUserName === "" || gameId === "") {
        setMessage("Fill in input");
      } else {
        if (
          modeBtn !== 0
        ) {
          
           setBtnStyle("bg-green-like-200 text-chartbg");
           setLoginStyle("Login...");
           setDisableBtn(true);
           axios
             .post(adimGameLoginEndPoint, adminLoginSchema)
             .then((result) => {
               if (result.data.status) {
                 socket.current.emit(
                   "ifAdminIsLoggedIn",
                   result.data.checkifAdminLogin
                 );
                 localStorage.adminIdentification = result.data.adminStatusId;
                 navigate("/play");
               } else {
                 setDisableBtn(false);
                 setMessage(result.data.message);
                 setBtnStyle("bg-green-like-100 text-white");
               }
             });
        } else {
          setMessage("pick a method")
        }
         
      }
  };
  return (
    <div className="w-10p h-10p fixed top-0 flex justify-center items-center">
      <div>
        <div className="w-10p flex justify-center">
          <Logo />
        </div>
        <div className="py-3">
          <p className=" text-center text-5xl font-serif text-green-like-100">
            Admin
          </p>
        </div>
        {message !== "" && (
          <div className="py-2 px-1">
            <p className="text-center font-mono text-green-like-100">
              {message}
            </p>
          </div>
        )}
        <div>
          <p>Username</p>
          <div>
            <input
              type="text"
              onChange={(e) => setAdminUserName(e.target.value)}
              className=" text-green-like-100 font-bold h-6 border border-inputLine w-input rounded-sideicon focus:outline-green-like-100"
            />
          </div>
        </div>
        <div className="my-2">
          <p>Game id</p>
          <div>
            <input
              type="password"
              onChange={(e) => setGameId(e.target.value)}
              className=" text-green-like-100 h-6 border border-inputLine w-input rounded-sideicon focus:outline-green-like-100"
            />
          </div>
        </div>
        
        <div>
          <button
            disabled={disableBtn}
            className={`text-center  w-input py-3 rounded-sideicon ${btnStyle}`}
            onClick={() => login()}
          >
            {loginStyle}
          </button>
        </div>
        <div className="flex justify-center py-2">
          <button onClick={()=>adminBtn()} className={`py-1 flex justify-center px-6 w-12 border border-green-like-200  ${modeBtn === 1 ? `bg-dashback-200 text-green-like-100` : `bg-green-like-100 text-white`}`}>Admin</button>
          <button onClick={()=>autoBtn()} className={`py-1 flex justify-center px-6 w-12 border border-green-like-200  ${modeBtn === 2 ? `bg-dashback-200 text-green-like-100` : `bg-green-like-100 text-white`}`}>Auto</button>
          <button onClick={()=>selfBtn()} className={`py-1 flex justify-center px-6 w-12 border border-green-like-200  ${modeBtn === 3 ? `bg-dashback-200 text-green-like-100` : `bg-green-like-100 text-white`}`}>Self</button>
        </div>
      </div>
    </div>
  );
};

export default AdminGameLogin;
