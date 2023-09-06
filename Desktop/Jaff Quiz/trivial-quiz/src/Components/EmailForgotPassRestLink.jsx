import axios from 'axios'
import React, { useContext, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import AlertModal from './AlertModal'
import { appContext } from '../App'
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
      <div className="w-dimageSize createmodalWidth:w-9p">
        <h1 className='text-center text-green-like-100 text-2xl'>Forgot Password</h1>
           <p className='text-center text-xs text-inputLine'>Enter your email</p>
        <form onSubmit={preventSubmit} className="my-3">
          <input
            type="text"
            onChange={(e) => emailFunction(e)}
            className="h-10 w-10p rounded-sideicon border border-inputLine focus:outline-green-like-100"
          />
          <p className="text-xs text-warning pb-3"  >{ifNotEmail}</p>
          <button disabled={verify !== "verify"} onClick={() => emailResetBtn()} className="w-10p h-6 rounded-sideicon bg-green-like-100 text-white">
           
          {verify}
          </button>
        </form>
      </div>
      <AlertModal/>
    </div>
  );
}

export default EmailForgotPassRestLink