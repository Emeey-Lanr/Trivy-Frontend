import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
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
          console.log(result.data);
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
      <div className="w-dimageSize">
        <div className="w-10p flex justify-center py-2">
          <Logo />
        </div>

        <div className="my-3">
          <p>UserName</p>
          <input
            type="text"
            onChange={(e) => setAdminUserName(e.target.value)}
            className="h-10 w-10p rounded-sideicon border border-inputLine focus:outline-green-like-100"
          />
        </div>
        <div className="my-3">
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 w-10p rounded-sideicon border border-inputLine focus:outline-green-like-100"
          />
        </div>
        <div className="w-10p">
          <button className={btnVerifyStyle} onClick={() => verify()}>
            {btnClicked}
          </button>
        </div>
        <div className="w-10p flex justify-between py-2 items-center">
          <p>Don't have an account?</p>
          <Link to="/admin/register" className="text-green-like-100">
            Signup
          </Link>
        </div>
      </div>
      <AlertModal />
    </div>
  );
};

export default AdminLogin;
