import "../styles/modal.css";
import { FaTimes } from "react-icons/fa";
import { appContext } from "../App";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import SaveQuestionModal from "./SaveQuestionModal";
import { useRef } from "react";
const CreateModal = () => {
  let emptyInput1 = useRef()
  let emptyInput2 = useRef()
  let navigate = useNavigate()
  const {
    adminId,
    adminEndPoint,
    showCreateModal,
    setShowCreateModal,
    currentSet,
  } = useContext(appContext);
  const [quizName, setQuizName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [quizQuestionBox, setQuizQuestionBox] = useState([]);
  const [messageIfSubjectExist, setMessageIfSubjectExist] = useState("");
  const [message, setMessage] = useState("");
  const [checked, setChecked] = useState(-1);
  const [multipleStatus, setMultipleStatus] = useState(false)
  const [numberToBeGenerated, setNumberToBeGenerated] = useState(1)
  const [spinState,setSpinState] = useState(false)


  const quitModal = () => {
    setShowCreateModal(false);
    setMessage("")
  }
  const quizNameSchema = {
    time: 0,
    subjectMark:1,
    quizName: quizName,
    questions: [],
    score: 0,
  };
  const addQuizName = () => {
    // checks if a subject has been added before in the list of the subjects added
    let ifCheck = quizQuestionBox.filter(
      (ui, ud) => ui.quizName.toUpperCase() === quizName.toUpperCase()
    );
    if (quizQuestionBox.length < 4) {
      if (ifCheck.length === 0) {
        setQuizQuestionBox([...quizQuestionBox, quizNameSchema]);
        setMessageIfSubjectExist("");
        emptyInput2.current.value = ""
    
      } else {
        setMessageIfSubjectExist("Subject already exist");
      }
    } else {
      setMessageIfSubjectExist("you can't add more than 4 subject");
    }
  };
  const removeQuestionAdded = (sid) => {
    setQuizQuestionBox(quizQuestionBox.filter((_, id) => id !== sid));
  };
  const quizCreationSchema = {
    adminId: adminId,
    class: currentSet,
    quizName: subjectName,
    quizPin: "",
    quizId: "",
    quizSubject: quizQuestionBox,
    subjectToBePlayedByPlyers: quizQuestionBox,
    multiple: multipleStatus,
    quizMultiplePassword: [],
    quizResultAcessPassword: "",
    locked:false,
  };

  const quizCreationEndPoint = `${adminEndPoint}/createquiz`;
  const single = () => {
    setChecked(1)
    setMultipleStatus(false)

  };
  const multiple = () => {
    setChecked(2)
    setMultipleStatus(true)
  };
  const createQuiz = () => {
    if (adminId === "") {
      setMessage("Reload Page,cannot create");
    } else if (subjectName === "") {
      setMessage("Add quiz name");
    } else if (quizQuestionBox.length === 0) {
      setMessage("Add subject");
    } else {
      setSpinState(true)
      axios.post(quizCreationEndPoint, { multiple: multipleStatus, numberToBeGenerated: Number(numberToBeGenerated), quizSchema: quizCreationSchema }).then((result) => {
        if (result.data.status) {
          setMessage(result.data.message)
          localStorage.quizClassId = result.data.classId;
          setTimeout(() => {
            setMessage("")
            navigate("/quizcollections");
          },1000)
        } else {
          setMessage(result.data.message)
          setSpinState(false)
}
      });
    }
  };
  return (
    <>
      {showCreateModal && (
        <div className="w-10p h-10p fixed top-0 left-0 flex justify-center items-center bg-modalback   createmodal:items-end">
          <div className="w-createModalSize bg-white py-5 rounded-createModal createmodalWidth:w-10p">
            <div>
              <div className="flex justify-end w-9p mx-auto">
                <button onClick={() => quitModal()}>
                  <FaTimes />
                </button>
              </div>
              <h1 className="text-center text-5xl text-bold">{currentSet}</h1>
              {message !== "" && <p className="w-8p mx-auto text-center font-mono text-sm   text-green-like-100">{message}</p>}
            </div>
            <div className="quiznameInput">
              <label>Quiz Name</label>
              <div>
                <input ref={emptyInput1}
                  type="text"
                  onChange={(e) => setSubjectName(e.target.value)}
                />
              </div>
            </div>
            <div className="addQuiz">
              <label>Add Subject Name</label>
              <div>
                <input ref={emptyInput2}
                  type="text"
                  className="border"
                  onChange={(e) => setQuizName(e.target.value)}
                />
                <button
                  className="bg-green-like-100 text-white py-2"
                  onClick={() => addQuizName()}
                >
                  Add
                </button>
              </div>
              <p className="text-center text-sm" style={{ color: "red" }}>
                {messageIfSubjectExist}
              </p>
            </div>
            <div className="addedQuestion">
              {quizQuestionBox !== "" &&
                quizQuestionBox.map((question, id) => (
                  <div className="flex bg-green-like-100 rounded-createdSubject py-1">
                    <p className="text-center flex text-white pl-1">
                      {question.quizName.split("").length > 7 ?
                        <span className="flex items-center">
                        <span>
                          {question.quizName.split("")[0]}
                        </span> 
                        <span>
                          {question.quizName.split("")[1]}
                       </span> 
                        <span>
                          {question.quizName.split("")[2]}
                       </span> 
                        <span>
                          {question.quizName.split("")[3]}
                       </span> 
                        <span>
                          {question.quizName.split("")[4]}
                       </span> 
                        <span>
                          {question.quizName.split("")[5]}
                       </span> 
                        <span>
                          {question.quizName.split("")[6]}
                       </span> 
                        <span>
                          .
                       </span> 
                        <span>
                          .
                       </span> 
                      </span>
                        : question.quizName
                      }
                    </p>
                    <button
                      onClick={() => removeQuestionAdded(id)}
                      className="flex justify-end w-10p"
                    >
                      <FaTimes className="text-white font-light" />
                    </button>
                  </div>
                ))}
            </div>
            <div className="">
              <div className="text-center">
                <p>Generate Password</p>
              </div>
              <div className="w-10p flex justify-evenly">
                <div>
                  <div>
                    <p>Single</p>
                  </div>
                  <input
                    type="radio"
                    onChange={() => single()}
                    checked={checked === 1}
                  />
                </div>
                <div>
                  <div>
                    <p>Mutliple</p>
                  </div>
                  <input
                    type="radio"
                    onChange={() => multiple()}
                    checked={checked === 2}
                  />
                  { multipleStatus && <input type="number" className="h-4 w-6 border mx-2" onChange={(e)=>setNumberToBeGenerated(e.target.value)}/>}
                </div>
              </div>
            </div>
          
            
            <div className="w-9p mx-auto">
              <button
                className="py-2 w-10p flex justify-center items-center bg-green-like-100 rounded-sideicon text-white"
                onClick={() => createQuiz()} disabled={spinState}
              >
                Create {spinState && <FaSpinner className="spin mx-1" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateModal;
