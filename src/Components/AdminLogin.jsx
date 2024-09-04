import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css"
import logo from "../Images/Logo.png";
import { appContext } from "../App";
import AlertModal from "./AlertModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const { adminEndPoint, setAlertModalStatus, setAlertMessage } =
    useContext(appContext);
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [adminUserName, setAdminUserName] = useState("");
  const [btnVerifyStyle, setBtnVerifyStyle] = useState(
    "bg-green-like-100 w-10p py-3 text-white rounded-sideicon"
  );
  const [btnClicked, setBtnClicked] = useState("Login");
  const loginEndPoint = `${adminEndPoint}/adminlogin`;
  const verify = () => {
    if (password === "" || adminUserName === "") {
      setAlertModalStatus(true);
      setAlertMessage("Looks like you forgot something");
      setTimeout(() => {
        setAlertModalStatus(false);
        setAlertMessage("");
      }, 500);
    } else {
      setBtnVerifyStyle(
        "bg-green-like-200 w-10p py-3 text-green-like-100 rounded-sideicon"
      );
      setBtnClicked("Login....");
      axios
        .post(loginEndPoint, { userName: adminUserName, password: password })
        .then((result) => {
        
          if (result.data.status) {
            localStorage.adminId = result.data.adminId;
            navigate("/admindashboard");
            localStorage.removeItem("quizClassId");
            localStorage.removeItem("quizxxx");
            localStorage.removeItem("")
          } else {
            setAlertMessage(result.data.message);
            setAlertModalStatus(true);
            setTimeout(() => {
              setAlertModalStatus(false)
              setBtnVerifyStyle("bg-green-like-100 w-10p py-3 text-white rounded-sideicon")
              setBtnClicked("Login")
            },1000)
          }

          if (result.data.mailStatus === true) {
            navigate("/emailverification");
          } else if (result.data.mailStatus === false) {
            navigate("/admindashboard");
          }
        });
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
            <div>
              <p className="uppercase text-white text-xl text-center">Login</p>
            
             </div>
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
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 w-10p px-2 rounded-sideicon border border-inputLine focus:outline-green-like-100"
              />
            </div>
            <div className="w-10p">
              <button className={btnVerifyStyle} onClick={() => verify()}>
                {btnClicked}
              </button>
            </div>
            <div className="w-10p flex justify-between py-2 items-center">
              <p className="text-white text-sm">Don't have an account?</p>
              <Link to="/admin/register" className="text-green-like-100">
                Signup
              </Link>
            </div>
            <div className="w-10p h-5 rounded-sideicon border border-white flex justify-center items-center">
              <Link
                to="/forgot/password"
                className="text-green-like-100 font-medium text-sm"
              >
                Forgot Password ?
              </Link>
            </div>
          </div>
        </div>
      </div>

      <AlertModal />
    </div>
  );
};

export default AdminLogin;
