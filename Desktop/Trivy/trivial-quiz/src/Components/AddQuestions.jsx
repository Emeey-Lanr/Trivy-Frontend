import DashbarNav from "./DashbarNav";
import Sidebar from "./Sidebar";
import "../styles/addquestion.css";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { FaTimes, FaCheck, FaSlash, FaArrowLeft, FaArrowUp } from "react-icons/fa";
import { AiOutlineLine } from "react-icons/ai";
import { SlCloudUpload } from "react-icons/sl";
import AlertModal from "./AlertModal";
import { appContext } from "../App";
import SaveQuestionModal from "./SaveQuestionModal";
import axios from "axios";
import SidBarBack from "./SideBarBack";
import EditQuestion from "./EditQuestion";
import { useNavigate } from "react-router-dom";
export const addQuestionContext = createContext(null);


const AddQuestions = () => {
  // app context
  const {
    adminEndPoint,
    dashboardFuction,
    setAlertModalStatus,
    setAlertMessage,
    setSideBarBoxShadow,
    setShowSidebar,
    setQuestionIndex,
    setQuestionText,
    setEditQuestion,
    setEditQuestionState,
  } = useContext(appContext);
  const navigate = useNavigate()
  // empty input
  const questionInput = useRef();
  const answer1Input = useRef();
  const answer2Input = useRef();
  const answer3Input = useRef();
  const answer4Input = useRef();
const lastQuestionLocation = useRef()
const moveUp  = useRef()
  const [subjects, setSubjects] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState({
    quizSubject: [],
  });
  const [currentQuizId, setCurrentQuizId] = useState("");
  const [imageswitch, setImageSwitch] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  // to check if answer is picked
  const [checkNumber, setCheckNumber] = useState(0);
  const [buttonStyle, setButtonStyle] = useState({
    ifNotPicked: {
      height: "38px",
      width: "38px",
      margin: "0 10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "38px",
      outline: "2px solid #b6b6b6",
      backgroundColor: "#f5f7f8",
    },
    ifPicked: {
      height: "38px",
      width: "38px",
      margin: "0 10px",
      display: "flex",
      justifyContent: "center",
      border: "2px solid #f5f7f8",
      alignItems: "center",
      borderRadius: "38px",
      outline: "2px solid #03a26d",
      backgroundColor: "#03a26d",
    },
  });

 

  //chnaging from text to image
  const [btnStyle, setBtnStyle] = useState({
    text: "bg-green-like-100 text-white",
    image: "bg-dashback-200",
  });
  const textBtn = () => {
    setImageSwitch(true);
    setBtnStyle({
      text: "bg-green-like-100 text-white",
      image: "bg-dashback-200",
    });
  };

  const imageBtn = () => {
    setImageSwitch(false);
    setBtnStyle({
      text: "bg-dashback-200",
      image: "bg-green-like-100 text-white",
    });
  };
  //picking answers
  //  setting questions and answer
  const [questionBank, setQuestionBank] = useState([]);

  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [option1Status, setOption1Status] = useState(false);
  const [option2Status, setOption2Status] = useState(false);
  const [option3Status, setOption3Status] = useState(false);
  const [option4Status, setOption4Status] = useState(false);
  const getSpecificQuizEndPoint = `${adminEndPoint}/getSpecificQuiz`;

 
  useEffect(() => {
    
    setShowSidebar("hidden")
    dashboardFuction()
    if (localStorage.questions) {
       const yes = JSON.parse(localStorage.questions);
   
      setQuestionBank(yes);
    }
    axios
      .get(getSpecificQuizEndPoint, {
        headers: {
          Authorization: `bearer, ${localStorage.quizxxx}`,
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        if (result.data.status) {
    
          if (result.data.currentQuiz.class === "Primary") {
             setSideBarBoxShadow(2);
          } else if (result.data.currentQuiz.class === "Junior") {
            setSideBarBoxShadow(3)
          } else if (result.data.currentQuiz.class === "Senior") {
            setSideBarBoxShadow(4)
          }
            setCurrentQuiz(result.data.currentQuiz);
          setCurrentQuizId(result.data.currentQuiz._id);
          setSubjects(result.data.currentQuiz.quizSubject);
        }
      });
  }, []);

  useEffect(() => {
 
       localStorage.questions = JSON.stringify(questionBank);
    
  }, [questionBank]);

  const questionToBeAdded = {
    question: { text: question, image: imageUrl },
    answers: [
      { option: option1, status: option1Status },
      { option: option2, status: option2Status },
      { option: option3, status: option3Status },
      { option: option4, status: option4Status },
    ],
    score: 0,
  };

  const [state, setState] = useState(true);

  const answer1 = () => {
    setCheckNumber(1);
    setOption1Status(true);
    setOption2Status(false);
    setOption3Status(false);
    setOption4Status(false);
  };
  const answer2 = () => {
    setCheckNumber(2);
    setOption1Status(false);
    setOption2Status(true);
    setOption3Status(false);
    setOption4Status(false);
  };
  const answer3 = () => {
    setCheckNumber(3);
    setOption1Status(false);
    setOption2Status(false);
    setOption3Status(true);
    setOption4Status(false);
  };
  const answer4 = () => {
    setCheckNumber(4);
    setOption1Status(false);
    setOption2Status(false);
    setOption3Status(false);
    setOption4Status(true);
  };

  //adding question to bank
  const emptyInputFuction = (empty, checkNumber) => {
    questionInput.current.value = empty;
    answer1Input.current.value = empty;
    answer2Input.current.value = empty;
    answer3Input.current.value = empty;
    answer4Input.current.value = empty;
    setCheckNumber(checkNumber);
  };
  const alertFunction = (status, message, time) => {
    setAlertModalStatus(status);
    setAlertMessage(message);
    setTimeout(() => {
      setAlertModalStatus(false);
      setAlertMessage("");
    }, time);
  };

  const uploadImageForQuizEndPoint = `${adminEndPoint}/uploadImgForQuiz` 
  const [spin, setSpin] = useState("")
  const [imgUploadMessage, setimgUploadMessage] = useState("")
 const uploadImage = (e) => {

   let reader = new FileReader();
   reader.readAsDataURL(e.target.files[0]);
   reader.onload = () => {
    
     setSpin("spin")
     setimgUploadMessage("wait while img upload don't switch page")
     axios.post(uploadImageForQuizEndPoint, { imageUrl: reader.result }).then((result) => {
       if (result.data.status) {
         setImageUrl(result.data.imgUrl)
         setSpin("")

       }else{
         setimgUploadMessage(result.data.message)
         setTimeout(() => {
           setSpin("")
           setimgUploadMessage("")
         },1000)
       }
     })
   };
 };
  const [status, setStatus] = useState(false);
  const addQuestionToBank = () => {
    if (question === "") {
      alertFunction(true, "No question added", 1000);
    } else if (
      option1 === "" ||
      option2 === "" ||
      option3 === "" ||
      option4 === ""
    ) {
      alertFunction(true, "Option missing, add", 1000);
    } else if (checkNumber === 0) {
      alertFunction(true, "No answer picked", 1000);
    } else {
      alertFunction(true, "added", 500);
      setImageUrl("");
      setQuestionBank([...questionBank, questionToBeAdded]);

      emptyInputFuction("", 0);
    }

     lastQuestionLocation.current.scrollIntoView();
  };

  const scrollUpBtn = () => {
    moveUp.current.scrollIntoView();
  }

  const [editQuestionIndex, setEditQuestionIndex] = useState(-1)
  const[disableBtn, setDisableBtn] = useState(false);
   const [editedQuestion, setEditedQuestion] = useState({});
   const [editQuestionText, setEditedQuestionText] = useState("");
  const [editAnswerOption1, setEditAnswerOption1] = useState("");
  const [editAnswerOption2, setEditAnswerOption2] = useState("");
  const [editAnswerOption3, setEditAnswerOption3] = useState("");
  const [editAnswerOption4, setEditAnswerOption4] = useState("");

  const [editAnswerStatus1, setEditAnswerStatus1] = useState(false);
  const [editAnswerStatus2, setEditAnswerStatus2] = useState(false);
  const [editAnswerStatus3, setEditAnswerStatus3] = useState(false);
  const [editAnswerStatus4, setEditAnswerStatus4] = useState(false);

  const showAnswers_Option = (questionId, frstIndex, sndId, thrdId, lstId) => {
    setEditAnswerOption1(questionBank[questionId].answers[frstIndex].option);
    setEditAnswerOption2(questionBank[questionId].answers[sndId].option);
    setEditAnswerOption3(questionBank[questionId].answers[thrdId].option);
    setEditAnswerOption4(questionBank[questionId].answers[lstId].option);

    setEditAnswerStatus1(questionBank[questionId].answers[frstIndex].status);
    setEditAnswerStatus2(questionBank[questionId].answers[sndId].status);
    setEditAnswerStatus3(questionBank[questionId].answers[thrdId].status);
    setEditAnswerStatus4(questionBank[questionId].answers[lstId].status);
  };
  const editQuestion = (id) => {
    console.log(id, questionBank);
    setEditQuestionIndex(id)
     setQuestionIndex(id);
     setEditedQuestionText(questionBank[id].question.text);
     setEditedQuestion(questionBank[id]);
     showAnswers_Option(id, 0, 1, 2, 3);
    setEditQuestionState(true);
  };

  const changeStatus = (id) => {
    setEditAnswerStatus1(id === 1 ? true : false);
    setEditAnswerStatus2(id === 2 ? true : false);
    setEditAnswerStatus3(id === 3 ? true : false);
    setEditAnswerStatus4(id === 4 ? true : false);
  };
 

 
  const editQuestionBtn = () => {
     const answers = [
       { option: editAnswerOption1, status: editAnswerStatus1 },
       { option: editAnswerOption2, status: editAnswerStatus2 },
       { option: editAnswerOption3, status: editAnswerStatus3 },
       { option: editAnswerOption4, status: editAnswerStatus4 },
    ];
    let question = [...questionBank]
  
    let edit = { ...editedQuestion }
    edit.question.text = editQuestionText
    edit.answers = answers
    question[editQuestionIndex] = edit;
    setQuestionBank(question)
    setEditQuestionState(false)
    alertFunction(true, "Edited", 500);
  
   
  
}
  // save question
  const [openSaveQuestionModal, setOpenSaveQuestionModal] = useState(false);
  const removeAddedQuestion = (Qid) => {
    setQuestionBank(questionBank.filter((_, id) => id !== Qid));
  };

  return (
    <addQuestionContext.Provider
      value={{
        subjects,
        currentQuizId,
        questionBank,
        openSaveQuestionModal,
        setOpenSaveQuestionModal,
        editQuestionText,
        setEditedQuestionText,
        editAnswerOption1,
        setEditAnswerOption1,
        editAnswerOption2,
        setEditAnswerOption2,
        editAnswerOption3,
        setEditAnswerOption3,
        editAnswerOption4,
        setEditAnswerOption4,
        editAnswerStatus1,
        editAnswerStatus2,
        editAnswerStatus3,
        editAnswerStatus4,
        changeStatus,
        editQuestionBtn,
        disableBtn,
      }}
    >
      <div>
        <div className="mt-11 w-8p ml-auto flex justify-between  items-center  sticky  sidebarNone:w-10p">
          <div className=" py-3  sidebarNone:w-5p h-7">
            <button
              className="w-10p"
              onClick={() => navigate("/quizcollections")}
            >
              <FaArrowLeft />
            </button>
          </div>
        </div>
        <div ref={moveUp} className="w-7p mx-auto"></div>
        <div className="w-8p mt-6 ml-auto sidebarNone:w-10p">
          {imageswitch && (
            <div className="text w-8p mx-auto  sidebarNone:w-10p sidebarNone:flex sidebarNone:justify-center">
              <textarea
                ref={questionInput}
                name=""
                className="h-4 sidebarNone:mb-3"
                onChange={(e) => setQuestion(e.target.value)}
              ></textarea>
            </div>
          )}
          {!imageswitch && (
            <div>
              {imageUrl === "" && (
                <div className="w-10p h-dw flex justify-center items-center">
                  <label id="image">
                    <SlCloudUpload
                      className={`text-5xl text-green-like-100 ${spin}`}
                    />
                    <input
                      type="file"
                      id="image"
                      hidden
                      onChange={(e) => uploadImage(e)}
                    />
                  </label>
                  <p>{imgUploadMessage}</p>
                </div>
              )}
              {imageUrl !== "" && (
                <div className="w-8p mx-auto">
                  <img
                    src={imageUrl}
                    className="w-10p object-cover"
                    alt=""
                    style={{ height: "300px" }}
                  />
                </div>
              )}
            </div>
          )}
          <div className="mx-auto flex sidebarNone:w-10p sidebarNone:flex sidebarNone:justify-center">
            <button
              className={`${btnStyle.text} py-2 px-4  rounded-l-sideicon`}
              onClick={() => textBtn()}
            >
              Text
            </button>
            <button
              className={`${btnStyle.image} py-2 px-4 rounded-r-sideicon`}
              onClick={() => imageBtn()}
            >
              Image
            </button>
          </div>
          <div className="answer mt-1">
            <div>
              <p className="ml-3 py-4 sidebarNone:text-center sidebarNone:text-sm">
                Pick An Answer
              </p>
            </div>

            <div className="flex items-center option sidebarNone:flex sidebarNone:justify-center">
              <button
                onClick={() => answer1()}
                style={
                  checkNumber === 1
                    ? buttonStyle.ifPicked
                    : buttonStyle.ifNotPicked
                }
              >
                {checkNumber === 1 ? (
                  <FaCheck className="right" />
                ) : (
                  <FaTimes className="wrong" />
                )}
              </button>
              <input
                type="text"
                onChange={(e) => setOption1(e.target.value)}
                ref={answer1Input}
              />
            </div>

            <div className="flex items-center option sidebarNone:flex sidebarNone:justify-center">
              <button
                onClick={() => answer2()}
                style={
                  checkNumber === 2
                    ? buttonStyle.ifPicked
                    : buttonStyle.ifNotPicked
                }
              >
                {checkNumber === 2 ? (
                  <FaCheck className="right" />
                ) : (
                  <FaTimes className="wrong" />
                )}
              </button>
              <input
                type="text"
                onChange={(e) => setOption2(e.target.value)}
                ref={answer2Input}
              />
            </div>

            <div className="flex items-center option sidebarNone:flex sidebarNone:justify-center">
              <button
                onClick={() => answer3()}
                style={
                  checkNumber === 3
                    ? buttonStyle.ifPicked
                    : buttonStyle.ifNotPicked
                }
              >
                {checkNumber === 3 ? (
                  <FaCheck className="right" />
                ) : (
                  <FaTimes className="wrong" />
                )}
              </button>
              <input
                type="text"
                onChange={(e) => setOption3(e.target.value)}
                ref={answer3Input}
              />
            </div>

            <div className="flex items-center option sidebarNone:flex sidebarNone:justify-center">
              <button
                onClick={() => answer4()}
                style={
                  checkNumber === 4
                    ? buttonStyle.ifPicked
                    : buttonStyle.ifNotPicked
                }
              >
                {checkNumber === 4 ? (
                  <FaCheck className="right" />
                ) : (
                  <FaTimes className="wrong" />
                )}
              </button>
              <input
                type="text"
                onChange={(e) => setOption4(e.target.value)}
                ref={answer4Input}
              />
            </div>
            <div className="w-6p mx-auto flex justify-end sidebarNone:w-9p">
              <button
                className="bg-green-like-100 py-2 px-4 text-white rounded-sideicon"
                onClick={() => addQuestionToBank()}
              >
                Add
              </button>
            </div>
            {/* Question added */}
            <div className="w-9px mx-auto sidebarNone:w-10p">
              <div className="w-8p mt-6 rounded-sideicon sidebarNone:10p sidebarNone:mx-auto sidebarNone:w-10p">
                <h1 className="text-center text-xl text-white py-3">
                  Questions
                </h1>

                <div className="w-7p mx-auto sidebarNone:w-10p">
                  {questionBank.length > 0 ? (
                    questionBank.map((content, id) => (
                      <div className="w-10p">
                        <div className="flex justify-between items-center py-2">
                          <p
                            className="h-4 w-4 border bg-green-like-100 text-white flex justify-center items-center"
                            style={{ borderRadius: "40px" }}
                          >
                            {id + 1}
                          </p>
                          <div className="flex">
                            <button
                              className="bg-green-like-100 py-1 px-3 text-white"
                              onClick={() => removeAddedQuestion(id)}
                            >
                              Remove
                            </button>
                            <button
                              className="py-1 px-3"
                              onClick={() => editQuestion(id)}
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                        <div className="w-8p sidebarNone:w-10p">
                          {content.question.image !== "" && (
                            <div>
                              <img src={content.question.image} alt="" />
                            </div>
                          )}
                          <div>
                            <p className="text-center">
                              {content.question.text}
                            </p>
                          </div>
                        </div>
                        <div className="w-10p">
                          {content.answers.map((ans, id) => (
                            <div
                              className={`${
                                ans.status
                                  ? "bg-green-like-100 text-white"
                                  : "bg-dashback-200"
                              }  w-7p mx-auto my-1 flex justify-between py-3 items-center px-2 sidebarNone:w-10p`}
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
            </div>
            {questionBank.length > 0 && (
              <button
                onClick={() => scrollUpBtn()}
                className="fixed bottom-4 right-4 w-5 h-5 bg-green-like-100 flex  justify-center items-center"
              >
                <FaArrowUp className="text-white" />
              </button>
            )}

            {questionBank.length > 0 && (
              <div className="w-3p ml-auto sidebarNone:w-9p">
                <button
                  className="bg-green-like-100 px-6 py-2 rounded-sideicon text-white"
                  onClick={() => setOpenSaveQuestionModal(true)}
                >
                  Save
                </button>
              </div>
            )}
            <div ref={lastQuestionLocation} />
          </div>
        </div>
        <AlertModal />
        <EditQuestion />
        <SaveQuestionModal />
        <SidBarBack />
        <DashbarNav />
        <Sidebar />
      </div>
    </addQuestionContext.Provider>
  );
};

export default AddQuestions;
