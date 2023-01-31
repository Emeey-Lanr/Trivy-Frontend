import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import axios from "axios";
import AlertModal from "./AlertModal";
import { appContext } from "../App";
import { useNavigate } from "react-router-dom";
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

  const adminSchema = {
    adminEmail: adminEmail,
    adminUserName: adminUserName,
    adminPassword: adminpassword,
    adminImg: "",
    adminEmailVerificationStatus:false
  };

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
          setSignUpShowing("Signup");
          setDisableBtn(false);
          setBtnDisableStyle("bg-green-like-100 text-white");
          setAlertMessage(result.data.message);
          setAlertModalStatus(true);
          setTimeout(() => {
            setAlertMessage("");
            setAlertModalStatus(false);
          }, 2000);
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
          <p>Email</p>
          <input
            type="text"
            onChange={(e) => emailFunction(e)}
            className="h-10 w-10p rounded-sideicon border border-inputLine focus:outline-green-like-100"
          />
          <p className="text-sm text-warning">{ifNotEmail}</p>
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
            onChange={(e) => passwordSetting(e)}
            className="h-10 w-10p rounded-sideicon border border-inputLine focus:outline-green-like-100"
          />
          <p className="text-sm text-warning">{ifNotPassord}</p>
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
          <p>Got an account already?</p>
          <Link to="/admin/login" className="text-green-like-100">
            Login
          </Link>
        </div>
      </div>
      <AlertModal />
    </div>
  );
};

export default AdminRegister;
