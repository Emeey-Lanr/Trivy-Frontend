import Logo from "./Logo";
import axios from "axios";
import { appContext } from "../App";
import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Images/Logo.png";

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
let ref  = useRef()
const [pickedState, setPickedState] = useState("")
 const [state, setState] = useState([
"",
"Abia",
"Adamawa",
"Akwa Ibom",
"Anambra",
"Bauchi",
"Bayelsa",
"Benue",
"Borno",
"Cross River",
"Delta",
"Ebonyi",
"Edo",
"Ekiti",
"Enugu",
"Gombe",
"Imo",
"Jigawa",
"Kaduna",
"Kano",
"Katsina",
"Kebbi",
"Kogi",
"Kwara",
"Lagos",
"Nasarawa",
"Niger",
"Ogun",
"Ondo",
"Osun",
"Oyo",
"Plateau",
"Rivers",
"Sokoto",
"Taraba",
"Yobe",
"Zamfara",
"FCT"
  ])
  const adimGameLoginEndPoint = `${gameEndPoint}/adminlogin`;
  const adminLoginSchema = {
    username: adminUserName,
    gameid: gameId,
    mode: modeBtn,
    state:pickedState,
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


      if (adminUserName === "" || gameId === "" ) {
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
                //  setDisableBtn(false);
                //  setMessage(result.data.message);
                //  setBtnStyle("bg-green-like-100 text-white");
               }
             }).catch((err) => {
                  setDisableBtn(false);
                 setMessage(err.response.data.message);
                 setBtnStyle("bg-green-like-100 text-white");
           
             });
        } else {
          setMessage("pick a method")
        }
         
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
          <div className="w-dimageSize createmodalWidth:w-9p">
            <div className="w-10p flex justify-center">
              <img src={logo} className="h-5 w-5" alt="" />
            </div>
            <p className="uppercase text-white text-xl text-center">Admin</p>
            {message !== "" && (
              <div className="py-2 px-1">
                <p className="text-center font-mono text-green-like-100">
                  {message}
                </p>
              </div>
            )}
            <div className="flex justify-center py-2">
              <button
                onClick={() => adminBtn()}
                className={`py-1 flex justify-center px-6 createmodal:px-0 createmodal:w-4p ${
                  modeBtn === 1
                    ? `bg-white text-green-like-100`
                    : `bg-green-like-100 text-white`
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => autoBtn()}
                className={`py-1 flex justify-center px-6  border-l createmodal:px-0 createmodal:w-4p ${
                  modeBtn === 2
                    ? `bg-white text-green-like-100`
                    : `bg-green-like-100 text-white`
                }`}
              >
                Auto
              </button>
              <button
                onClick={() => selfBtn()}
                className={`py-1 flex justify-center px-6 border-l createmodal:px-0 createmodal:w-4p ${
                  modeBtn === 3
                    ? `bg-white text-green-like-100`
                    : `bg-green-like-100 text-white`
                }`}
              >
                Self
              </button>
            </div>
            <div>
              <div className="my-3">
                <p className="text-white text-sm">Admin Username</p>
                <input
                  type="text"
                  onChange={(e) => setAdminUserName(e.target.value)}
                  className="h-10 w-10p rounded-sideicon border border-inputLine focus:outline-green-like-100"
                />
              </div>
            </div>
            <div>
              <div className="my-3">
                <p className="text-white text-sm">Quiz Id</p>
                <input
                  type="text"
                  onChange={(e) => setGameId(e.target.value)}
                  className="h-10 w-10p rounded-sideicon border border-inputLine focus:outline-green-like-100"
                />
              </div>
            </div>
            {/* <div className="my-2">
              <p>Quiz id</p>
              <div>
                <input
                  type="password"
                  onChange={(e) => (e.target.value)}
                  className=" text-green-like-100 h-6 border border-inputLine w-input rounded-sideicon focus:outline-green-like-100"
                />
              </div>
            </div> */}
            <div className="my-2">
              <p className="capitalize text-white">Pick a state</p>
              <div>
                <select
                  onChange={(e) => setPickedState(e.target.value)}
                  className="h-10 w-10p rounded-sideicon border border-inputLine focus:outline-green-like-100"
                >
                  {state.map((state) => (
                    <option>{state}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <button
                disabled={disableBtn}
                className={`w-10p py-3 text-white rounded-sideicon ${btnStyle}`}
                onClick={() => login()}
              >
                {loginStyle}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminGameLogin;
