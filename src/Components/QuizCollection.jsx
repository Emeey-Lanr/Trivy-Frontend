import React, { createContext, useContext, useEffect, useState } from "react";
import DashbarNav from "./DashbarNav";
import Sidebar from "./Sidebar";
import { SlPlus, SlTrash, SlPeople, SlBookOpen } from "react-icons/sl";
import "../styles/collection.css";
import axios from "axios";
import { appContext } from "../App";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { FaArrowLeft, FaLock, FaSpinner, FaTimes, FaToggleOff, FaToggleOn } from "react-icons/fa";
import AlertModal from "./AlertModal";
import SidBarBack from "./SideBarBack";
export const quizCollectionContext = createContext();
const QuizCollection = () => {
  let navigate = useNavigate();
  const {
    adminEndPoint,
   dashboardFuction,
    setAlertModalStatus,
    alertMessage,
    setAlertMessage,
    setSideBarBoxShadow,
     setShowSidebar,
    setDeleteModalState,
    setCurrentSet,
    currentSet
  } = useContext(appContext);
  const loadQuizEndPoint = `${adminEndPoint}/loadcollections`;
  const [collections, setCollections] = useState([]);
    const [btnRollStyle, setBtnRollStyle] = useState(-1);
  const [collectedPass, setCollectedPass] = useState("");
  const [loadingResult, setLoadingResult] = useState(`Getting Collection......`)
  
  // Acess modal
  const [accesModalStatus, setAcessModalStatus] = useState(false)
  const [acessId, setAcessId] = useState("")
  const [removePinBtnStyle, setRemovePinBtnStyle] = useState(1)
  const [removePinMessage,setRemovePinMessage] = useState("")
  const loadcollectionsFunction = () => {
      axios
        .get(loadQuizEndPoint, {
          headers: {
            Authorization: `bearer ${localStorage.class}/${localStorage.adminId}`,
            "Content-Type": "application/json",
          },
        })
        .then((result) => {
         
          if (result.data.status) {
            setCollections(result.data.collections);
            if(result.data.collections.length < 1){
              setLoadingResult("Your quiz collection is empty")
            }
            setCurrentSet(result.data.class);
            if (result.data.class === "Primary") {
              setSideBarBoxShadow(2);
            } else if (result.data.class === "Junior") {
              setSideBarBoxShadow(3);
            } else if (result.data.class === "Senior") {
              setSideBarBoxShadow(4);
            }
          }
        }).catch((error) => {
          
        })
  }

  useEffect(() => {
    dashboardFuction()
    loadcollectionsFunction()
     setShowSidebar("hidden")
  }, []);

  const targetQuizCollectionEndPoint = `${adminEndPoint}/generateQuizSpecificToken`;
  const getQuizFunction = (a, b, c) => {
     axios
      .post(targetQuizCollectionEndPoint, { quizDbId: b})
      .then((result) => {
        if (result.data.status) {
          localStorage.quizxxx = result.data.quizId;
          navigate(c);
        }
      });
  }
  const addQuestion = (id, quizDatabaseid) => {
   getQuizFunction(id, quizDatabaseid, "/add/quiz/questions")
  };
  const [quizIdentificationForDeleting, setquizIdentificationForDeleting] = useState({
    index: "",
    quizId:""
  })
  const deleteSpecificCollection = (index, quizID) => {
    setDeleteModalState(true);
    setquizIdentificationForDeleting({index:index, quizId:quizID})
  };
  // find the user that played
  const findUser = (index, quizId) => {

    getQuizFunction(index, quizId, "/admin/result");
    
  }


  const openQuestion = (id, quizDatabaseid) => {
    getQuizFunction(id, quizDatabaseid, "/questionbank");
  };
  const [openPasswordSpace, setOpenPasswordSpace] = useState(-1)
  const addPassword = (id) => {
    setOpenPasswordSpace(id)
  }

  
  const collectionAcessPasswordEndPoint = `${adminEndPoint}/quizacesspassword`
  const addAcessPasswordBtn = (quizGameId, index) => {
 
    if (collectedPass !== "") {
       setBtnRollStyle(index);
    axios.post(collectionAcessPasswordEndPoint, { collectionId: quizGameId, pass: collectedPass }).then((result) => {
      if (result.data.status) {
        loadcollectionsFunction()
        setAlertModalStatus(true)
        setBtnRollStyle(-1)
        setOpenPasswordSpace(false)
        setAlertMessage(result.data.message)
        setTimeout(() => {
          setAlertMessage("")
          setAlertModalStatus(false)
        },2000)
      } else {
          setBtnRollStyle(-1);
          setOpenPasswordSpace(false);
        setAlertMessage(result.data.message);
        setAlertModalStatus(true)
         setTimeout(() => {
           setAlertMessage("");
           setAlertModalStatus(false);
         }, 2000);
      }
    })
    } else {
    
       setAlertMessage("input a pass");
       setAlertModalStatus(true);
       setTimeout(() => {
         setAlertMessage("");
         setAlertModalStatus(false);
       }, 2000);
  }
  }
  const turnAceesPinOffBtn = (id) => {
    setAcessId(id)
    setAcessModalStatus(true)
  }
  const removeAcessModalBtn = () => {
     setAcessModalStatus(false)
  };
  const removeEndPoint = `${adminEndPoint}/removeAcessPin`
  const proceedToRemoveBtn = () => {
    if (acessId !== "") {
       setRemovePinBtnStyle(0);
      axios.post(removeEndPoint, {access:acessId}).then((result) => {
        if (result.data.status) {
          loadcollectionsFunction()
          setRemovePinMessage(result.data.message)
          setTimeout(() => {
            setRemovePinMessage("")
            setAcessModalStatus(false)
             setRemovePinBtnStyle(1);
       },2000)
        } else {
          setRemovePinMessage(result.data.message);
          setTimeout(() => {
         setRemovePinMessage("");
            setAcessModalStatus(false);
             setRemovePinBtnStyle(1);
          },2000)
        }
      })
    }
   
  }
 
  const cancelProcessBtn = () => {
    setAcessModalStatus(false)
  }
  return (
    <quizCollectionContext.Provider
      value={{
        loadcollectionsFunction,
        quizIdentificationForDeleting,
      }}
    >
      <div>
        <div className="navigateIcon">
          <button onClick={() => navigate(`/${currentSet}/create`)}>
            <FaArrowLeft className="text-green-like-100" />
          </button>
          <div className="border-b-green-like-100 py-2">
            <p  className="text-xl text-green-like-100 text-center uppercase">{currentSet}</p>
          </div>
        </div>

        {collections.length > 0 ? (
          <div className="collections">
            {collections.map((Content, id) => (
              <div key={id} className="w-10p bg-dashback-100 mb-3">
                <div className="flex justify-between items-center my-2 w-9p mx-auto">
                  <div>
                    <FaLock className="text-green-like-100" />
                  </div>
                  <div>
                    {Content.locked ? (
                      <button onClick={() => turnAceesPinOffBtn(Content._id)}>
                        <FaToggleOn className="text-green-like-100 text-2xl" />
                      </button>
                    ) : (
                      <button onClick={() => addPassword(id)}>
                        <FaToggleOff className="text-inputLine text-2xl" />
                      </button>
                    )}
                  </div>
                </div>
                {openPasswordSpace === id && (
                  <div className="">
                    <div className="w-9p flex justify-end">
                      <button onClick={() => setOpenPasswordSpace(-1)}>
                        <FaTimes className="text-green-like-100" />
                      </button>
                    </div>
                    <p className="text-sm text-green-like-100 text-center">
                      If on, the password provided will be used to view your
                      collection results{" "}
                    </p>
                    <div className="flex justify-center">
                      <input
                        onChange={(e) => setCollectedPass(e.target.value)}
                        className="border border-green-like-100 outline-green-like-100"
                        type="text"
                      />
                      <button
                        onClick={() => addAcessPasswordBtn(Content._id, id)}
                        className="bg-green-like-100 text-white px-3"
                      >
                        {btnRollStyle === id ? (
                          <FaSpinner className="spin" />
                        ) : (
                          ` add`
                        )}
                      </button>
                    </div>
                  </div>
                )}
                <div className="bg-green-like-100 my-1 py-2 w-9p mx-auto rounded-sideicon">
                  <p className="text-center text-white font-light">
                    {Content.quizName}
                  </p>
                </div>
                <div className="w-6p mx-auto h-dw flex justify-center items-center rounded-sideicon gradi">
                  <h2 className="text-center text-5xl font-bold text-white">
                    {Content.quizName.split("")[0]}
                  </h2>
                </div>
                <div>
                  <p className="text-center text-sm mb-3">
                    <span>
                      <b>Quiz Id</b>
                    </span>
                    <br />
                    <span>{Content.quizId}</span>
                  </p>
                </div>
                {Content.locked && (
                  <div>
                    <div className="border-b w-6p mx-auto border-inputLine"></div>
                    <p className="text-center text-sm mb-3">
                      <span>
                        <b>Result Acess Pin</b>
                      </span>
                      <br />
                      <span>{Content.quizResultAcessPassword}</span>
                    </p>
                  </div>
                )}
                <div className="border border-line mb-2 rounded-sideicon flex justify-between items-center px-2 py-1 w-9p mx-auto">
                  <div>
                    <div className="flex justify-center bg-green-like-100 shadow-lg rounded-sideicon py-2 px-3">
                      <button onClick={() => addQuestion(id, Content._id)}>
                        <SlPlus className="text-white" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-center bg-green-like-100 shadow-lg rounded-sideicon py-2 px-3">
                      <button
                        onClick={() =>
                          deleteSpecificCollection(id, Content._id)
                        }
                      >
                        <SlTrash className="text-white" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-center bg-green-like-100 shadow-lg rounded-sideicon py-2 px-3">
                      <button>
                        <SlPeople
                          className="text-white"
                          onClick={() => findUser(id, Content._id)}
                        />
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-center bg-green-like-100 shadow-lg rounded-sideicon py-2 px-3">
                      <button onClick={() => openQuestion(id, Content._id)}>
                        <SlBookOpen className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center flex justify-center mt-12">
            <p className="text-4xl uppercase text-inputLine">
                {loadingResult}
            </p>
          </div>
        )}
      </div>
      {accesModalStatus && (
        <div className="w-10p h-10p fixed flex justify-center items-center top-0 bg-modalback">
          <div className="w-createmodal h-dw flex justify-center items-center bg-white rounded-sideicon">
            <div>
              <div className="w-9p flex justify-end">
                <button onClick={() => removeAcessModalBtn()}>
                  <FaTimes className="text-green-like-100" />
                </button>
              </div>
              {removePinMessage !== "" && (
                <div className="bg-dashback-200 py-1 w-9p mx-auto">
                  <p>{removePinMessage}</p>
                </div>
              )}
              <p className="w-8p text-center mx-auto text-green-like-100">
                Are you sure you want to remove the result acces pin
              </p>
              <div className="w-9p flex justify-center items-center mt-3 mx-auto">
                <button
                  onClick={() => cancelProcessBtn()}
                  className="w-5p py-2 bg-dashback-200"
                >
                  cancel
                </button>
                <button
                  onClick={() => proceedToRemoveBtn()}
                  className="flex justify-center items-center w-5p py-2 bg-green-like-100 text-white"
                >
                  {removePinBtnStyle === 1 ? (
                    `Proceed`
                  ) : (
                    <FaSpinner className="spin" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <SidBarBack />
      <DeleteModal />
      <Sidebar />
      <DashbarNav />
      <AlertModal />
    </quizCollectionContext.Provider>
  );
};

export default QuizCollection;
