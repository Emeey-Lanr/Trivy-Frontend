import axios from 'axios'
import React, { useContext, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import AlertModal from './AlertModal'
import { appContext } from '../App'
import logo from "../Images/Logo.png";
const EmailForgotPassRestLink = () => {
  const {adminEndPoint, setAlertModalStatus, setAlertMessage } = useContext(appContext);
  const [adminEmail, setAdminEmail] = useState("")
  const [ifNotEmail, setIfNotEmail] = useState("")
  const [emailStatus, setEmailStatus] = useState(false)
  const [verify, setVerify] = useState("verify")
    const emailFunction = (e) => {
     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
       setAdminEmail(e.target.value);
       setIfNotEmail("");
       setEmailStatus(true)
     } else {
       setIfNotEmail("Invalid Email, Enter a valid one");
     }
  };
  const preventSubmit = (e) => {
    e.preventDefault()
  }
  const alert = (message, status) => {
    setAlertMessage(message)
    setAlertModalStatus(status)
  }
  const emailResetBtn = () => {
    if (emailStatus) {
      setAlertMessage("Email sent succesfully")
      setVerify("Verifying...")

      axios.post(`${adminEndPoint}/emailRestPasswordLink`, {adminEmail}).then((result) => {
        alert(result.data.message, true)
      }).catch((err) => {
     alert(err.response.data.message, true)
     setTimeout(()=>{
      alert("", false)
     },1_500)
    
  });
      
    } else {
      
    }
    
}
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
            <div className="w-10p flex justify-center py-2">
              <img src={logo} className="h-5 w-5" alt="" />
            </div>
            <h1 className="text-center text-white text-2xl">Forgot Password</h1>
            <p className="text-center text-xs text-inputLine">
              Enter your email
            </p>
            <form onSubmit={preventSubmit} className="my-3">
              <input
                type="text"
                onChange={(e) => emailFunction(e)}
                className="h-10 w-10p rounded-sideicon border border-inputLine focus:outline-green-like-100"
              />
              <p className="text-xs text-warning pb-3">{ifNotEmail}</p>
              <button
                disabled={verify !== "verify"}
                onClick={() => emailResetBtn()}
                className="w-10p h-6 rounded-sideicon bg-green-like-100 text-white"
              >
                {verify}
              </button>
            </form>
          </div>
        </div>
      </div>

      <AlertModal />
    </div>
  );
}

export default EmailForgotPassRestLink