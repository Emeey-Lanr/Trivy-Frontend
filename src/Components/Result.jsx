import { createContext, useState, useContext, useEffect } from "react";
import noImg from "../Images/noImage.png"
import { FaEye, FaSearch, FaSpinner, FaThumbsUp, FaTimes,  } from 'react-icons/fa';
import SearchResult from "./SearchResult";
import { SlPeople, SlSettings, SlUserFollowing } from "react-icons/sl";
import CollectionSearchResult from "./CollectionSearchResult";
import { appContext } from "../App";  
import axios from "axios";
import AlertModal from "./AlertModal";
import ordinal from "ordinal";
export const searchContext = createContext();
const Result = () => {
  const {socket, searchEndPoint, setAlertMessage, setAlertModalStatus } =
    useContext(appContext);
  const [adminDetails, setAdminDetails] = useState({
    adminUserName: "",
    adminImg: "",
  });
  
  const [btnStyle, setBtnStyle] =useState(0)
  const [userRecords, setUserRecords] = useState([]);
  const [btnStyleSpin,setBtnStyleSpin] =useState(1)
  const [currentClass, setCurrentClass] = useState("")
  const [collectionName, setCollectionName] = useState("")
  const [collectionFound, setCollectionFound] =useState([])
  const [ifFoundStyle, setIfFoundStyle] = useState(0)
  const [resultMessage, setResultMessage] = useState("")
  const [accessModal, setAcessModal] = useState(false)
  const [quizId, setQuizId] = useState("")
  const [acessPin, setAcessPin] = useState("")
  const [quizName, setQuizName] = useState("")
  const [btnAcessStatus, setBtnAcessStatus] = useState(false)
  const [views, setViews] = useState([])
  const [profileModal, setprofileModal] = useState(0)
  const [userRanking,setUserRanking] =useState([])
  const alertFunction = (a,b,c,d) => {
     setAlertMessage(a);
     setAlertModalStatus(b);
     setTimeout(() => {
       setAlertMessage(c);
       setAlertModalStatus(d);
     }, 2000);
  }
  const loadAdminDetails = `${searchEndPoint}/loadAdminDetails`
  useEffect(() => {
    axios
      .get(loadAdminDetails, {
        headers: {
          Authorization:`header ${localStorage.xxxxxxxxxx}`,
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        if (result.data.status) {
        
            setAdminDetails(result.data.admin)
        } else {
       alertFunction("an error occured", true, "",false)
        }
      });
      
    },[])
  const [userId, setUserId] = useState("")
  const getUserId = () => {
    if (socket.current) {
      socket.current.on("userId", (data) => {
      setUserId(data.id)
    });
  }
}
 const [socketViews, setSocketView] = useState([]) 
  const getCurrentResultView = () => {
    if (socket.current) {
      socket.current.on("views", (data)=>{
        setSocketView(data.views)
      })
    }
  }


  const countedViews = ()=>{
    if (socket.current) {
      socket.current.on("countedViews", (data) => {
        setSocketView(data.views)
      })
    }
  }
  useEffect(() => {
    getUserId()
    getCurrentResultView()
    countedViews()
  })
  const primaryBtn = () => {
    setBtnStyle(1)
    setCurrentClass("Primary")
  }
  const juniorBtn = () => {
    setBtnStyle(2);
    setCurrentClass("Junior");
  }
  const secBtn = () => {
    setBtnStyle(3);
    setCurrentClass("Senior");
  }
  const profileBtn = () => {
    setBtnStyle(4);
    setprofileModal(1)
    
  }
  const collectionEndPoint = `${searchEndPoint}/adminCollection`
  const lookForCollection = () => {
    if (btnStyle === 0 || btnStyle === 4 ) {
      alertFunction("click on either the primary or the junior or the sec button", true, "", false);
    } else if (collectionName === "") {
      alertFunction("Fill in input", true, "", false);
    }
    else {
      setBtnStyleSpin(2)
      axios.post(collectionEndPoint, {class:currentClass, data:collectionName, adminId:adminDetails._id}).then((result) => {
        if (result.data.status) {
          setIfFoundStyle(2)
          setBtnStyleSpin(1)
          setCollectionFound(result.data.userFound)
        } else {
          alertFunction(result.data.message, true, "", false);
          setBtnStyleSpin(1)
         
        }
      })
    }
  }
    const acessPinEndPoint = `${searchEndPoint}/gamePlayedResult`
  
  const acessRightAway = (id) => {
    axios.post(acessPinEndPoint, { quizId: id, locked:"no" }).then((result) => {
        if (result.data.status) {
          setUserRecords(result.data.gamePlayedResult);
          setIfFoundStyle(3)
            socket.current.emit("views",{ name: quizId, result:result.data.gamePlayedResult, id:userId });
        } else {
          alertFunction(result.data.message, true, "", false);
          setBtnAcessStatus(false)
        }
      })
 } 
  const enterAcessPin = (id, name) => {
    setQuizId(id)
    setAcessModal(true)
    setQuizName(name)
  }

  const enterAcessPinBtn = () => {
    if (acessPin === "") {
      alertFunction("Enter access pin", true, "", false)
    } else {
      setBtnAcessStatus(true)
      axios.post(acessPinEndPoint, { quizId: quizId, acessPass: acessPin, locked:"yes" }).then((result) => {
        if (result.data.status) {

          setUserRecords(result.data.gamePlayedResult);
          
          socket.current.emit("views",{ name: quizId, result:result.data.gamePlayedResult, id:userId });
          setIfFoundStyle(3)
          setAcessModal(false)
          setBtnAcessStatus(false)
        } else {
          alertFunction(result.data.message, true, "", false);
          setBtnAcessStatus(false)
        }
      })
    }
  }

  const countViews = (id) => {
    socket.current.emit("countView", {collectionId:quizId, quizId:id, sId:userId})
  }
   return (
      <searchContext.Provider
        value={{
          userRecords,
          collectionFound,
          acessRightAway,
          enterAcessPin,
         socketViews,
          countViews,
        }}
      >
        <div className="w-10p resultGrid">
          <div
            className="flex justify-center items-center"
            style={{ height: "100vh" }}
          >
            <div
              className="w-9 flex justify-center items-center bg-green-like-100 rounded-sideicon"
              style={{ height: "420px" }}
            >
              <div className="w-10p">
                <button
                  onClick={() => primaryBtn()}
                  className={`w-10p border-b border-white rounded-sideicon my-2 ${
                    btnStyle === 1 ? `bg-white` : `bg-green-like-100`
                  }`}
                >
                  <div className="w-8p flex justify-center items-center  mx-auto h-5 rounded-sideicon bg-white">
                    <SlPeople />
                  </div>
                  {btnStyle === 1 && <div className="border-b"></div>}
                  <p
                    className={`${
                      btnStyle === 1 ? `text-chartbg` : `text-white`
                    } text-sm py-1`}
                  >
                    Primary
                  </p>
                </button>
                <button
                  onClick={() => juniorBtn()}
                  className={`w-10p border-b border-white rounded-sideicon my-2 ${
                    btnStyle === 2 ? `bg-white` : `bg-green-like-100`
                  }`}
                >
                  <div className="w-8p flex justify-center items-center  mx-auto h-5 rounded-sideicon bg-white">
                    <SlPeople />
                  </div>
                  {btnStyle === 2 && <div className="border-b"></div>}
                  <p
                    className={`${
                      btnStyle === 2 ? `text-chartBG` : `text-white`
                    } text-sm py-1`}
                  >
                    Junior
                  </p>
                </button>
                <button
                  className={`w-10p border-b border-white rounded-sideicon my-2 ${
                    btnStyle === 3 ? `bg-white` : `bg-green-like-100`
                  }`}
                >
                  <div
                    onClick={() => secBtn()}
                    className="w-8p flex justify-center items-center  mx-auto h-5 rounded-sideicon bg-white"
                  >
                    <SlPeople />
                  </div>
                  {btnStyle === 3 && <div className="border-b"></div>}
                  <p
                    className={`${
                      btnStyle === 3 ? `text-chartbg` : `text-white`
                    } text-sm py-1`}
                  >
                    Sec
                  </p>
                </button>
                <button
                  onClick={() => profileBtn()}
                  className={`w-10p border-b border-white rounded-sideicon my-2 ${
                    btnStyle === 4 ? `bg-white` : `bg-green-like-100`
                  }`}
                >
                  <div className="w-8p flex justify-center items-center  mx-auto h-5 rounded-sideicon bg-white">
                    <SlUserFollowing />
                  </div>
                  {btnStyle === 4 && <div className="border-b"></div>}
                  <p
                    className={`${
                      btnStyle === 4 ? `text-chartbg` : `text-white`
                    } text-sm py-1`}
                  >
                    Profile
                  </p>
                </button>
              </div>
            </div>
          </div>
          <div className="w-10p bg-dashback-200 border-l border-r border-inputLine py-3">
            <div className="border-b w-10p flex justify-center items-center border-inputLine  py-3 mb-2">
              <div
                style={{ borderRadius: "40px" }}
                className="w-6p  sticky  flex justify-center items-center mx-auto border border-green-like-100 sidebarNone:w-8p"
              >
                <input
                  onChange={(e) => setCollectionName(e.target.value)}
                  placeholder="Enter Collection Name"
                  style={{ borderRadius: "30px 0 0 30px" }}
                  type="text"
                  className="border-0 outline-0 w-8p h-6"
                />
                <button
                  onClick={() => lookForCollection()}
                  className="flex justify-center items-center w-2p"
                >
                  {btnStyleSpin === 1 ? (
                    <FaSearch />
                  ) : (
                    <FaSpinner className="spin" />
                  )}
                </button>
              </div>
            </div>

            {ifFoundStyle === 2 && <CollectionSearchResult />}
            {ifFoundStyle === 3 && <SearchResult />}
          </div>
          <div className="organizationDetails">
            <div className="w-8p bg-white shadow-lg mx-auto py-3">
              <div
                className="h-8 w-8 mx-auto flex justify-center items-center"
                style={{ border: "3px solid #03a26c" }}
              >
                <img
                  className="h-6 w-6"
                  style={{ borderRadius: "60px" }}
                  src={
                    adminDetails.adminImg !== "" ? adminDetails.adminImg : noImg
                  }
                  alt=""
                />
              </div>
              <div className="flex justify-between items-center w-9p mx-auto my-3">
                <div className="bg-green-like-100 w-5p py-3">
                  <p className="text-white text-sm text-center">
                    Organisation UserName
                  </p>
                </div>
                <div className="bg-dashback-200 w-5p py-2">
                  <p className="text-center"> {adminDetails.adminUserName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {accessModal && (
          <div className="w-10p h-10p fixed top-0 bg-modalback flex justify-center items-center">
            <div
              style={{ height: "170px" }}
              className="bg-white w-createModalSize  rounded-sideicon py-2"
            >
              <div className="w-9p flex justify-end">
                <button onClick={() => setAcessModal(false)}>
                  <FaTimes className="text-green-like-100" />
                </button>
              </div>
              <p className="text-center">Enter collection access pin</p>
              <div className="w-8p mx-auto">
                <input onChange={(e)=>setAcessPin(e.target.value)}
                  type="password"
                  className="h-5 w-10p text-center border-2 border-green-like-100 outline-green-like-100"
                />
              </div>
              <div className="w-8p mx-auto my-2">
                <button disabled={btnAcessStatus} onClick={()=>enterAcessPinBtn()} className="w-10p flex justify-center items-center  bg-green-like-100 py-2 rounded-sideicon text-white">
                  Proceed {btnAcessStatus && <FaSpinner className="spin" />}
                </button>
              </div>
            </div>
          </div>
        )}
       <div className={`${profileModal === 0 ? "profileNone" : `profileModal`}`}>
         <div className="bg-white w-9p">
           <div className="w-10p flex justify-end py-1 px-1">
             <button onClick={()=>setprofileModal(0)}>
               <FaTimes/>
             </button>
           </div>
            <div className="w-8p bg-white shadow-lg mx-auto py-3">
              <div
                className="h-8 w-8 mx-auto flex justify-center items-center"
                style={{ border: "3px solid #03a26c" }}
              >
                <img
                  className="h-6 w-6"
                  style={{ borderRadius: "60px" }}
                  src={
                    adminDetails.adminImg !== "" ? adminDetails.adminImg : noImg
                  }
                  alt=""
                />
              </div>
              <div className="flex justify-between items-center w-9p mx-auto my-3">
                <div className="bg-green-like-100 w-5p py-3">
                  <p className="text-white text-sm text-center">
                    Organisation UserName
                  </p>
                </div>
                <div className="bg-dashback-200 w-5p py-2">
                  <p className="text-center"> {adminDetails.adminUserName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <AlertModal />
      </searchContext.Provider>
    );
}

export default Result