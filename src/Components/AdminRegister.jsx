import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import logo from "../Images/Logo.png";
import axios from "axios";
import AlertModal from "./AlertModal";
import { appContext } from "../App";
import { useNavigate } from "react-router-dom";

import { IoEye, IoEyeOff } from "react-icons/io5";
const AdminRegister = () => {
  const { adminEndPoint, setAlertModalStatus, setAlertMessage } =
    useContext(appContext);
  let navigate = useNavigate();
  // empty input
  const [ifNotPassord, setIfNotPassword] = useState("");
  const [ifNotEmail, setIfNotEmail] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminUserName, setAdminUserName] = useState("");
  const [adminpassword, setAdminPassword] = useState("");
  const [passShow, setPasswordShow] = useState(false)
  const emailFunction = (e) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
      setAdminEmail(e.target.value);
      setIfNotEmail("");
    } else {
      setIfNotEmail("Invalid Email, Enter a valid one");
    }
  };
  const passwordSetting = (e) => {
    if (e.target.value.trim().length < 6) {
      setIfNotPassword("Password should be at least 6 characters");
    } else {
      setIfNotPassword("");
      setAdminPassword(e.target.value);
    }
  };
  const [signupShowing, setSignUpShowing] = useState("Signup");
  const [disableBtn, setDisableBtn] = useState(false);
  const [btnDisableStyle, setBtnDisableStyle] = useState(
    "bg-green-like-100 text-white"
  );
  const adminEndPointUrl = `${adminEndPoint}/signup`;
    
  console.log(adminEndPointUrl)
  const adminSchema = {
    adminEmail: adminEmail,
    adminUserName: adminUserName,
    adminPassword: adminpassword,
    adminImg: "",
    adminEmailVerificationStatus: false,
    searchId:"mTQ",
    locked:false,
  };

  const errorMessage = (errorMessage) => {
     // If Email or Username is already in use, it display this message
          setSignUpShowing("Signup");
          setDisableBtn(false);
          setBtnDisableStyle("bg-green-like-100 text-white");
          setAlertMessage(errorMessage);
          setAlertModalStatus(true);
          setTimeout(() => {
            setAlertMessage("");
            setAlertModalStatus(false);
          }, 2000);
  }
  const signUp = () => {

    if (adminEmail === "" || adminUserName === "" || adminpassword === "") {
      setAlertModalStatus(true);
      setAlertMessage("Looks like you forgot something");
      setTimeout(() => {
        setAlertModalStatus(false);
        setAlertMessage("");
      }, 500);
    } else {
      setSignUpShowing("Signup...");
      setDisableBtn(true);
      setBtnDisableStyle("bg-green-like-200 text-green-like-100");

      axios.post(adminEndPointUrl, adminSchema).then((result) => {
      
        if (result.data.status) {
          navigate("/emailverification");
        } else {
         errorMessage(result.data.message);
        }
      }).catch((err) => {
        errorMessage(err.response.data.message)
     
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
        <div className="bg-l_bold sign_up_div px-1">
          <div className="w-dimageSize createmodalWidth:w-9p">
            <div className="w-10p flex justify-center py-2">
              <img src={logo} className="h-5 w-5" alt="" />
            </div>
            <p className="uppercase text-white text-xl text-center">Register</p>
            <div className="my-3">
              <p className="text-white text-sm pb-1">Admin Email</p>
              <input
                type="text"
                onChange={(e) => emailFunction(e)}
                className="h-10 w-10p px-2 rounded-sideicon border border-inputLine focus:outline-green-like-100"
              />
            </div>
            <p className="text-xs text-warning">{ifNotEmail}</p>
            <div className="my-3">
              <p className="text-white text-sm pb-1">Admin Username</p>
              <input
                type="text"
                onChange={(e) => setAdminUserName(e.target.value)}
                className="h-10 w-10p px-2 rounded-sideicon border border-inputLine focus:outline-green-like-100"
              />
            </div>
            <div className="my-3">
              <p className="text-white text-sm pb-1">Password</p>
              <div className="relative">
                <input
                  className="px-2 h-10 w-10p flex  rounded-sideicon border border-inputLine focus:outline-green-like-100"
                  type={`${passShow ? "text" : "password"}`}
                  onChange={(e) => passwordSetting(e)}
                />
                <button onClick={()=>setPasswordShow(!passShow)} className="absolute top-[40%] right-[5%] ">{passShow ?<IoEye /> : <IoEyeOff />  } </button>
              </div>

              <p className="text-xs" style={{ color: "red" }}>
                {ifNotPassord}
              </p>
            </div>
            <div className="w-10p">
              <button
                disabled={disableBtn}
                className={`${btnDisableStyle} w-10p py-3 text-white rounded-sideicon`}
                onClick={() => signUp()}
              >
                {signupShowing}
              </button>
            </div>
            <div className="w-10p flex justify-between py-2 items-center">
              <p className="text-white text-sm">Got an account already?</p>
              <Link to="/admin/login" className="text-green-like-100">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      <AlertModal />
    </div>
  );
};

export default AdminRegister;
