import { useContext, useState } from "react";
import { FaSpinner, FaTimes } from "react-icons/fa";
import { addQuestionContext } from "./AddQuestions";
import { appContext } from "../App";
import "../styles/modal.css";
import axios from "axios";
const SaveQuestionModal = () => {
  const { adminEndPoint } = useContext(appContext);
  const {
    subjects,
    currentQuizId,
    questionBank,
    openSaveQuestionModal,
    setOpenSaveQuestionModal,
  } = useContext(addQuestionContext);
  const [subjectStyleForBtn, setSubjectStyleForBtn] = useState("hhh");
  const [message, setMessage] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [replace, setReplace] = useState(-1);
  // responsible for the spiner state
  const [spinState, setSpinState] = useState(false)

  // inputData
  const [seconds, setSeconds] = useState(0);
  const [assignedMark, setAssignedMark] = useState(1);
  const addToTheExistingOne = (id, subject) => {
    setSubjectStyleForBtn(subject + "add" + id);
    setSubjectName(subject);
    setSubjectId(id);
    setReplace(0);
  };
  const replaceTheExistingOne = (id, subject) => {
    setSubjectStyleForBtn(subject + "replace" + id);
    setSubjectName(subject);
    setSubjectId(id);
    setReplace(1);
  };

  const addQuestionEndPoint = `${adminEndPoint}/addSpecificQuestion`;
  const addQuestionSchema = {
    time:Number(seconds),
    assignedMark: Number(assignedMark),
    quizId: currentQuizId,
    subjectName: subjectName,
    replaceAdd: replace,
    quizQuestion: questionBank,
    subjectId: subjectId,
  };
  const saveQuestionBtn = () => {
    if (questionBank.length > 0) {
      if (seconds > 0) {
        setSpinState(true)
      axios.post(addQuestionEndPoint, addQuestionSchema).then((result) => {
        if (result.data.status) {
      
          setMessage(result.data.message)
          setTimeout(() => {
            setMessage("")
            setOpenSaveQuestionModal(false)
            setSpinState(false)
            setSeconds(0)
            setSubjectStyleForBtn("")
          },1000)
        } else {
         setMessage(result.data.message)
        }
        
      });
      } else {
        setMessage("Add time")
      }
      
    } else {
     setMessage("You need to add aleast one question")
    }
 
  };
  return (
    <>
      {openSaveQuestionModal && (
        <div className="w-10p h-10p fixed top-0 bg-modalback flex justify-center items-center">
          <div className="w-createModalSize bg-white rounded-sideicon createmodalWidth:w-9p">
            <div className="w-10p flex justify-end py-1 px-1">
              <button onClick={() => setOpenSaveQuestionModal(false)}>
                <FaTimes />
              </button>
            </div>
            {message !== "" && (
              <div className="w-9p mx-auto bg-dashback-200">{message}</div>
            )}
            <div className="flex justify-center items-center px-5 py-3">
              <div>
                <input
                  type="number"
                  className="h-5 w-6 border text-center"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                />
                <p className="text-center">S</p>
              </div>
            </div>
            <div className="flex justify-center items-center px-5 py-3">
              <div>
                <p className="text-center">Assign a mark</p>
                <div className="flex justify-center w-10p">
                  <input
                    type="number"
                    className="h-5 w-8 border text-center"
                    value={assignedMark}
                    onChange={(e) => setAssignedMark(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="subjectnameToAddQuestionTo ">
              {subjects.map((info, id) => (
                <div>
                  <p className="text-center">{info.quizName}</p>
                  <div className="flex w-10p bg-dashback-200">
                    <button disabled={spinState}
                      className={`w-5p py-2 text-sm border-r border-r-green-like-100 ${
                        subjectStyleForBtn === info.subject + "add" + id &&
                        "bg-green-like-100 rounded-sideicon text-white"
                      }`}
                      onClick={() => addToTheExistingOne(id, info.subject)}
                    >
                      Add
                    </button>
                    <button disabled={spinState}
                      className={`5p py-2 px-1 text-sm text-center  ${
                        subjectStyleForBtn === info.subject + "replace" + id &&
                        "bg-green-like-100 rounded-sideicon text-white"
                      }`}
                      onClick={() => replaceTheExistingOne(id, info.subject)}
                    >
                      Replace
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-8p py-5 mx-auto">
              <button disabled={spinState}
                className="w-10p py-2 bg-green-like-100 rounded-sideicon text-white flex justify-center items-center"
                onClick={() => saveQuestionBtn()}
              >
                Save {spinState && <FaSpinner className="spin" style={{ margin: "0 2px" }} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SaveQuestionModal;
