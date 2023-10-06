import DashbarNav from "./DashbarNav";
import Sidebar from "./Sidebar";
import { useState, useEffect, useContext } from "react";
import { appContext } from "../App";
import axios from "axios";
import { FaArrowLeft, FaCheck, FaSlash, FaSpinner, FaTimes } from "react-icons/fa";
import SidBarBack from "./SideBarBack";
import { useNavigate } from "react-router-dom";
const Questionbank = () => {
  let navigate = useNavigate()
  const { adminEndPoint, dashboardFuction } = useContext(appContext);
  const getSpecificQuizEndPoint = `${adminEndPoint}/getSpecificQuiz`;
  const [collectionId, setCollectionId] = useState("")
  const [questionTitle, setQuestionTitle] = useState([]);
  const [question, setQuestion] = useState([])
  const [question1, setQuestion1] = useState([])
  const [styleId, setStyleId] = useState(-1);
  const [questionPasswordBank, setQuestionPasswordBank] = useState("question")
  const [userPassword, setUserPassword] = useState([])
  const [checkStyle, setCheckStyle] = useState(1)
  const [generateInput, setGenerateInput] = useState(0)
  const [generateModal, setGenerateModal] = useState(false)
  const [modalSpin, setModalSpin] = useState(false)
  const [message,setMessage] =useState("")

  // check if it'ssingle or multiple
  const [singleOrMultiple, setSingleMultiple] = useState(false)
  // delete question modal
  const [deleteQuestionModal, setDeleteQuestionModal] = useState(false)
  const [currentQuizName, setCurrentQuizName] = useState("")
  const [questionId, setQuestionId] = useState(-1)

  // edit question
  const [editedQuestion,setEditedQuestion] = useState({})
  const [editQuestionText, setEditedQuestionText] = useState("")
  const [openEditModal, setEditModal] = useState(false)
  const getInfo = () => {
       dashboardFuction()
         axios
           .get(getSpecificQuizEndPoint, {
             headers: {
               Authorization: `bearer, ${localStorage.quizxxx}`,
               "Content-Type": "application/json",
             },
           })
           .then((result) => {
             if (result.data.status) {
               setSingleMultiple(result.data.currentQuiz.multiple);
               setCollectionId(result.data.currentQuiz._id);
               setQuestionTitle(result.data.currentQuiz.quizSubject);
               setQuestion1(result.data.currentQuiz.quizSubject);
              
               if (localStorage.subjectId ) {
                
                 setStyleId(Number(localStorage.subjectId))
                 
               } else {
                 setCheckStyle(0)
              }
          
                
                 setQuestion(
                   result.data.currentQuiz.quizSubject[localStorage.subjectId ? localStorage.subjectId : styleId ].questions
                 );
             
                
               setUserPassword(result.data.currentQuiz.quizMultiplePassword);
               if (result.data.currentQuiz.quizSubject.length > 0) {
                 setCurrentQuizName(
                   result.data.currentQuiz.quizSubject[localStorage.subjectId ? localStorage.subjectId :  styleId].quizName
                 );
                 
               } else {
                 setCurrentQuizName("");
               }
             } else {
             }
           });
  }
  useEffect(() => {
   getInfo()
  }, []);

  const openPassword = () => {
    setQuestionPasswordBank("password")
    setCheckStyle(2)
 
  }
  const openQuestion = () => {
    setQuestionPasswordBank("question");
    setCheckStyle(1)
  }
  
  const checkQuestionSet = (id, currentSubject) => {
    localStorage.subjectId = id
    setStyleId(id);
    setQuestion(question1[id].questions);
    setCurrentQuizName(currentSubject)
  
  };
  // meant toopen the modal
  const GenerateNewPassword = () => {
    setCheckStyle(3)
    setGenerateModal(true)
  }
  const genratePasswordEndPoint = `${adminEndPoint}/generateMorePassword`;
  // meant to genrate password
  const whenGeneratingFunction = (a) => {
     setMessage(a);
     setTimeout(() => {
       setMessage("");
       setGenerateModal(false);
       setModalSpin(false);
       setDeleteQuestionModal(false)
     }, 2000);
  }
  const generatePasswordBtn = () => {
    if (singleOrMultiple) {
      if (generateInput > 0) {
        setModalSpin(true)
       axios.post(genratePasswordEndPoint, { collectionId: collectionId, numberToGenarate: generateInput }).then((result) => {
         if (result.data.status) {
        getInfo()
          whenGeneratingFunction(result.data.message)
      } else {
      whenGeneratingFunction(result.data.message)
      }
    })
    } else {
      
    }
   
    } else {
      setMessage("You can't generate multiple password")
    }
    
  }
  const openDeleteQuestionModal = (id) => {
    setQuestionId(id)
    setDeleteQuestionModal(true)
  }
  const deleteQuestionEndPoint = `${adminEndPoint}/deleteQuestion`;
  const deleteQuestion = () => {
    if (questionId === -1 && currentQuizName === "") {
      alert("reload cannot delete")
    } else {
      axios.post(deleteQuestionEndPoint, {collectionId: collectionId,subjectName: currentQuizName, questionId: questionId }).then((result) => {
        if (result.data.status) {
          whenGeneratingFunction(result.data.message)
        } else {
          whenGeneratingFunction(result.data.message)
        }
      })
    }
  }
  const [editAnswerOption1, setEditAnswerOption1] = useState("")
  const [editAnswerOption2, setEditAnswerOption2] = useState("")
  const [editAnswerOption3, setEditAnswerOption3] = useState("")
  const [editAnswerOption4, setEditAnswerOption4] = useState("")

  const [editAnswerStatus1, setEditAnswerStatus1] = useState(false)
  const [editAnswerStatus2, setEditAnswerStatus2] = useState(false)
  const [editAnswerStatus3, setEditAnswerStatus3] = useState(false)
  const [editAnswerStatus4, setEditAnswerStatus4] = useState(false)


  
  const showAnswers_Option = (questionId ,frstIndex, sndId, thrdId, lstId) => {
    setEditAnswerOption1(question[questionId].answers[frstIndex].option);
       setEditAnswerOption2(question[questionId].answers[sndId].option)
       setEditAnswerOption3(question[questionId].answers[thrdId].option)
       setEditAnswerOption4(question[questionId].answers[lstId].option)

      setEditAnswerStatus1(question[questionId].answers[frstIndex].status)
      setEditAnswerStatus2(question[questionId].answers[sndId].status)
      setEditAnswerStatus3(question[questionId].answers[thrdId].status)
      setEditAnswerStatus4(question[questionId].answers[lstId].status)
  }
  const openEditModalBtn = (id) => {
    setQuestionId(id)
    setEditedQuestionText(question[id].question.text)
    setEditedQuestion(question[id])
    setEditModal(true)
    showAnswers_Option( id,0,1,2,3)
  }
  const changeStatus = (id) => {
       setEditAnswerStatus1(id === 1 ? true : false);
       setEditAnswerStatus2(id === 2 ? true : false);
       setEditAnswerStatus3(id === 3 ? true : false);
       setEditAnswerStatus4(id === 4  ? true : false);
  }
 
  
  const editQuestionEndPoint = `${adminEndPoint}/editQuestion`;
  

  const [response, setResponse] = useState("")
  const [disableBtn, setDisableBtn] =useState(false)
  const editQuestionBtn = () => {
    const answers = [
      { option: editAnswerOption1, status: editAnswerStatus1 },
      { option: editAnswerOption2, status: editAnswerStatus2 },
      { option: editAnswerOption3, status: editAnswerStatus3 },
      { option: editAnswerOption4, status: editAnswerStatus4 }
    ];
    
    let edit = newFunction();
    edit.answers = answers
  
     setDisableBtn(true)
     
    axios.post(editQuestionEndPoint, { editedQuestion: edit, subjectId: styleId, collectionId, questionId }).then((result) => {
   
      setResponse(result.data.message)
      setTimeout(() => {
        getInfo()
      },1_000)
      setDisableBtn(false)
      setEditModal(false)
    }).catch((err) => {
     
      // setResponse(err.data.response.message)
      setDisableBtn(false)
    })

  
    

    function newFunction() {
      let edit = { ...editedQuestion };
      edit.question.text = editQuestionText;
      return edit;
    }
  }

  return (
    <div className="w-10p">
      <div className="w-7p mx-auto mt-12 sidebarNone:w-10p">
        <button onClick={() => navigate("/quizcollections")}>
          <FaArrowLeft className="text-green-like-100" />
        </button>
      </div>
      <div className="w-7p text-sm  mx-auto flex justify-start items-center sidebarNone:w-10p">
        <button
          onClick={() => openQuestion()}
          className={`py-2 text-sm px-2 text-center ${
            checkStyle === 1
              ? `border-b-2 border-green-like-100  text-green-like-100`
              : ``
          }`}
        >
          Question
        </button>
        <button
          onClick={() => GenerateNewPassword()}
          className={`py-2 px-2  text-sm ${
            checkStyle === 3
              ? `border-b-2 border-green-like-100  text-green-like-100`
              : ``
          }`}
        >
  New Password
        </button>
        <button
          onClick={() => openPassword()}
          className={`py-2 px-2 text-center ${
            checkStyle === 2
              ? `border-b-2 border-green-like-100   text-green-like-100`
              : ``
          }`}
        >
          Passwords
        </button>
      </div>
      {questionPasswordBank === "password" && (
        <div className="w-7p mx-auto mt-11 sidebarNone:w-9p">
          {userPassword.length > 0 &&
            userPassword.map((pass, id) => (
              <div className="text-green-like-100 my-6">
                <p className="font-bold font-serif">
                  {" "}
                  <span>{id + 1} -</span> {pass}
                </p>
              </div>
            ))}
        </div>
      )}
      {questionPasswordBank === "question" && (
        <div>
          <div className="w-7p mx-auto flex justify-between bg-dashback-200 mt-12 rounded-sideicon  sidebarNone:w-10p sidebarNone:mt-3">
            {questionTitle.length > 0 ? (
              questionTitle.map((content, id) => (
                <div className="w-10p">
                  <button
                    style={{}}
                    onClick={() => checkQuestionSet(id, content.quizName)}
                    className={`w-10p py-3 px-2 text-center ${
                      styleId === id
                        ? "bg-green-like-100 text-white"
                        : "bg-dashback-200 "
                    }  rounded-sideicon`}
                  >
                    <p className="w-10 overflow-hidden whitespace-nowrap text-ellipsis">
                      {content.quizName}
                    </p>
                  </button>
                </div>
              ))
            ) : (
              <div>
                <p className="text-center py-2">Wait.....</p>
              </div>
            )}
          </div>
          <div className="w-7p mx-auto sidebarNone:w-9p ">
            {question.length > 0 ? (
              question.map((content, id) => (
                <div>
                  <div className="flex justify-between items-center py-2">
                    <p
                      className="h-4 w-4 border bg-green-like-100 text-white flex justify-center items-center"
                      style={{ borderRadius: "40px" }}
                    >
                      {id + 1}
                    </p>
                    <div className="flex">
                      <button
                        onClick={() => openDeleteQuestionModal(id)}
                        className="bg-green-like-100 rounded-sideicon text-white py-1 px-3"
                      >
                        Delete
                      </button>
                      <button
                        className="py-1 px-3"
                        onClick={() => openEditModalBtn(id)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p className="text-center">{content.question.text}</p>
                    </div>
                    {content.question.image !== "" && (
                      <div>
                        <img src={content.question.image} alt="" />
                      </div>
                    )}
                  </div>
                  <div className="w-10p">
                    {content.answers.map((ans, id) => (
                      <div
                        className={` ${
                          ans.status
                            ? "bg-green-like-100 text-white"
                            : "bg-dashback-200"
                        }  w-7p mx-auto my-1 flex justify-between py-3 items-center px-2 createmodal:w-10p`}
                      >
                        <p>{ans.option}</p>
                        <div
                          className={`h-5 w-5 flex justify-center items-center border  ${
                            ans.status
                              ? "border-white"
                              : "border-green-like-100"
                          }`}
                          style={{ borderRadius: "40px" }}
                        >
                          {ans.status ? <FaCheck /> : <FaSlash />}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="w-10p h-1 bg-dashback-200 mt-3"></div>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
      {generateModal && (
        <div className="w-10p h-10p fixed top-0 bg-modalback flex justify-center items-center">
          <div className="bg-white w-createModalSize  py-2 rounded-sideicon createmodal:w-9p">
            <div className="w-9p flex justify-end  mx-auto">
              <button onClick={() => setGenerateModal(false)}>
                <FaTimes className="text-green-like-100" />
              </button>
            </div>
            {message !== "" && (
              <div className="bg-dashback-100 py-2 my-1 ">
                <p className="text-center capitalize text-sm">{message}</p>
              </div>
            )}
            <div className="w-9p mx-auto">
              <p className="text-center w-9p mx-auto text-inputLine text-sm">
                Enter the number of pasword that you want to generate
              </p>
            </div>
            <div className="w-9p flex justify-center mx-auto py-3">
              <input
                onChange={(e) => setGenerateInput(e.target.value)}
                className="w-8p  rounded-sideicon  h-6 border text-center border-inputLine outline-0"
                type="number"
              />
            </div>
            <div className="w-9p flex justify-center items-center my-2 mx-auto">
              <button
                disabled={modalSpin}
                className="w-8p py-2 px-3  rounded-sideicon bg-green-like-100 text-white flex justify-center items-center"
                onClick={() => generatePasswordBtn()}
              >
                <span className="px-1"> Generate </span>
                {modalSpin && <FaSpinner className="spin" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ///////DELETE MODAL/////// */}
      {deleteQuestionModal && (
        <div className="w-10p h-10p fixed top-0  bg-modalback flex justify-center items-center">
          <div className="bg-white  w-input   rounded-sideicon createmodal:w-9p">
            <div className="w-10p py-1 px-1 flex justify-end">
              <button onClick={() => setDeleteQuestionModal(false)}>
                <FaTimes className="text-green-like-100" />
              </button>
            </div>
            {message !== "" && (
              <div className="w-9p mx-auto bg-dashback-100 py-1">
                <p>{message}</p>
              </div>
            )}
            <div className="w-9p mx-auto">
              <p className="text-center  py-2 text-inputLine text-xs">
                Are you sure you want to delete?
              </p>
            </div>
            <div className="w-9p flex justify-center mx-auto py-4">
              <button
                onClick={() => deleteQuestion()}
                className="py-2 px-4 w-10p rounded-sideicon flex justify-center text-white text-sm items-center bg-green-like-100 text-center"
              >
                Delete
                {modalSpin && <FaSpinner className="spin" />}
              </button>
            </div>
          </div>
        </div>
      )}
      {openEditModal && (
        <div className="w-10p h-10p fixed top-0 bg-modalback flex justify-center items-end">
          <div className="w-editModal bg-white rounded-sideicon py-3 createmodal:w-9p">
            <div className="px-2">
              <button onClick={() => setEditModal(false)}>
                <FaTimes className="text-green-like-100" />
              </button>
            </div>
            <div className="h-5 w-8 rounded-r-sideicon bg-green-like-100"></div>
            {response !== "" && (
              <div>
                <p className="text-center font-xs text-inputLine">
                  {response}{" "}
                </p>
              </div>
            )}
            <div className="flex justify-center items-center">
              <p className="text-inputline mx-3">Questions</p>
              <div className="w-5 w-5 flex justify-center items-center rounded-icon bg-green-like-100">
                <p className="text-white">1</p>
              </div>
            </div>
            <div className="w-9p mx-auto mt-3">
              <textarea
                onChange={(e) => setEditedQuestionText(e.target.value)}
                value={editQuestionText}
                className="h-6 w-10p rounded-side-icon  resize:none border border-inputLine focus:outline-green-like-100"
              ></textarea>
            </div>
            <div className="w-9p my-3  mx-auto">
              <p>Options</p>
            </div>
            <div>
              <div className="w-9p mx-auto flex items-center mb-3">
                <button
                  onClick={() => changeStatus(1)}
                  style={{ borderRadius: "50px" }}
                  className="h-5 w-5 flex justify-center items-center border border-inputLine"
                >
                  {editAnswerStatus1 ? <FaCheck /> : <FaSlash />}
                </button>
                <input
                  onChange={(e) => setEditAnswerOption1(e.target.value)}
                  value={editAnswerOption1}
                  className="h-5 border border-inputLine  w-10p focus:outline-green-like-100 mx-1"
                  type="text"
                />
              </div>
              <div className="w-9p mx-auto flex items-center mb-3">
                <button
                  onClick={() => changeStatus(2)}
                  style={{ borderRadius: "50px" }}
                  className="h-5 w-5 flex justify-center items-center border border-inputLine"
                >
                  {editAnswerStatus2 ? <FaCheck /> : <FaSlash />}
                </button>
                <input
                  onChange={(e) => setEditAnswerOption2(e.target.value)}
                  value={editAnswerOption2}
                  className="h-5 border border-inputLine  w-10p focus:outline-green-like-100 mx-1"
                  type="text"
                />
              </div>
              <div className="w-9p mx-auto flex items-center mb-3">
                <button
                  onClick={() => changeStatus(3)}
                  style={{ borderRadius: "50px" }}
                  className="h-5 w-5 flex justify-center items-center border border-inputLine"
                >
                  {editAnswerStatus3 ? <FaCheck /> : <FaSlash />}
                </button>
                <input
                  onChange={(e) => setEditAnswerOption3(e.target.value)}
                  value={editAnswerOption3}
                  className="h-5 border border-inputLine  w-10p focus:outline-green-like-100 mx-1"
                  type="text"
                />
              </div>
              <div className="w-9p mx-auto flex items-center mb-3">
                <button
                  onClick={() => changeStatus(4)}
                  style={{ borderRadius: "50px" }}
                  className="h-5 w-5 flex justify-center items-center border border-inputLine"
                >
                  {editAnswerStatus4 ? <FaCheck /> : <FaSlash />}
                </button>
                <input
                  onChange={(e) => setEditAnswerOption4(e.target.value)}
                  value={editAnswerOption4}
                  className="h-5 border border-inputLine  w-10p focus:outline-green-like-100 mx-1"
                  type="text"
                />
              </div>
            </div>
            <div className="w-9p flex justify-end mx-auto mt-3 ">
              <button
                onClick={() => editQuestionBtn()}
                disabled={disableBtn}
                className="h-5 rounded-sideicon flex justify-center items-center bg-green-like-100 text-white text-xs w-10"
              >
                {disableBtn ? (
                  <FaSpinner className="spin" />
                ) : (
                  <span>Save</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <SidBarBack />
      <DashbarNav />
      <Sidebar />
    </div>
  );
};

export default Questionbank;
