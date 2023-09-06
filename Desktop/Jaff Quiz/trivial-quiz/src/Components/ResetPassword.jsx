import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { appContext } from '../App'
import AlertModal from './AlertModal'
const ResetPassword = () => {
    const {adminEndPoint, setAlertModalStatus, setAlertMessage } = useContext(appContext);
  let token = useParams()
  const navigate = useNavigate()
  
  const [error, setError] = useState(false)
  const [ifNotPassword, setIfNotPassword] = useState("")
  const [passwordStatus, setPasswordStatus] = useState(true)
  const [adminEmail, setAdminEmail] = useState("")
  const [password, setPassword] = useState("")
  const [verify, setVerify] = useState("Reset")
    useEffect(() => {
        axios.get(`${adminEndPoint}/verifyResetLink`, {
            headers: {
                "Authorization": `bearer ${token.id}`,
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        }).then((result) => {
          setError(true)
          setAdminEmail(result.data.email)
        }).catch((error) => {
          setAlertModalStatus(true)
          setAlertMessage(error.response.data.message)
            //  if(error.Accept)
        });
    }, [])
  const passwordF = (e) => {
    if (e.target.value.length < 6) {
      setIfNotPassword("Password must be aleast 6ix characters")
      setPasswordStatus(true)
    } else {
      setIfNotPassword("")
      setPasswordStatus(false)
      setPassword(e.target.value)
  }
}
  const preventSubmit = (e) => {
    e.preventDefault()
   
    
  }
  const passwordResetBtn = () => {
     if (!passwordStatus) {
       setVerify("Ressetting...");

       axios.put(`${adminEndPoint}/resetForgotPassword`, {adminEmail, password}).then((result) => {
         setAlertModalStatus(true)
         setAlertMessage(result.data.message)
         setTimeout(() => {
           setAlertModalStatus(false);
           navigate("/admin/login")
         },1_500)
       }).catch((err) => {
 setAlertModalStatus(true);
 setAlertMessage(err.response.data.message);
       });
     }
  }
  return (
    <>
      {!error ? (
        <div className="w-10p h-10p fixed top-0 flex justify-center items-ceneter"></div>
      ) : (
        <div className="w-10p h-10p fixed top-0 flex justify-center items-center">
          <div className="w-dimageSize createmodalWidth:w-9p">
            <h1 className="text-center text-green-like-100 text-2xl">
              Forgot Password
            </h1>
            <p className="text-center text-xs text-inputLine">
              Enter a new password
            </p>
            <form onSubmit={preventSubmit} className="my-3">
              <input
                type="password"
                onChange={(e) => passwordF(e)}
                className="h-10 w-10p rounded-sideicon border border-inputLine focus:outline-green-like-100"
              />
              <p className="text-xs text-warning pb-3">{ifNotPassword}</p>
              <button
                disabled={verify !== "Reset"}
                onClick={() => passwordResetBtn()}
                className="w-10p h-6 rounded-sideicon bg-green-like-100 text-white"
              >
                {verify}
              </button>
            </form>
          </div>
          <AlertModal />
        </div>
      )}
      <AlertModal />
    </>
  );
}

export default ResetPassword