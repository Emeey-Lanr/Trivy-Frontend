import "../styles/modal.css";
import { FaTimes } from "react-icons/fa";
import { appContext } from "../App";
import { useContext, useState } from "react";
import axios from "axios";
const CreateModal = () => {
  const { showCreateModal, setShowCreateModal, currentSet } =
    useContext(appContext);
  const [quizName, setQuizName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [quizQuestionBox, setQuizQuestionBox] = useState([]);
  const [messageIfSubjectExist, setMessageIfSubjectExist] = useState("");

  const quizNameSchema = {
    quizName: quizName,
    question: [],
    score: 0,
  };
  const addQuizName = () => {
    let ifCheck = quizQuestionBox.filter(
      (ui, ud) => ui.quizName.toUpperCase() === quizName.toUpperCase()
    );
    if (ifCheck.length === 0) {
      setQuizQuestionBox([...quizQuestionBox, quizNameSchema]);
      setMessageIfSubjectExist("");
    } else {
      setMessageIfSubjectExist("Subject already exist");
    }
  };
  const removeQuestionAdded = (sid) => {
    setQuizQuestionBox(quizQuestionBox.filter((_, id) => id !== sid));
  };
  const quizCreationSchema = {
    adminId: "",
    class: currentSet,
    quizName: subjectName,
    quizPin: "",
    quizSubject: quizQuestionBox,
  };

  const createQuiz = () => {
    console.log(quizCreationSchema);
  };
  return (
    <>
      {showCreateModal && (
        <div className="w-10p h-10p fixed top-0 left-0 flex justify-center items-center bg-modalback   createmodal:items-end">
          <div className="w-createModalSize bg-white py-5 rounded-createModal createmodalWidth:w-10p">
            <div>
              <div className="flex justify-end w-9p mx-auto">
                <button onClick={() => setShowCreateModal(false)}>
                  <FaTimes />
                </button>
              </div>
              <h1 className="text-center text-5xl text-bold">{currentSet}</h1>
            </div>
            <div className="quiznameInput">
              <label>Quiz Name</label>
              <div>
                <input
                  type="text"
                  onChange={(e) => setSubjectName(e.target.value)}
                />
              </div>
            </div>
            <div className="addQuiz">
              <label>Add Subject Name</label>
              <div>
                <input
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
                    <p className="text-center text-white pl-1">
                      {question.quizName}
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
            <div className="w-9p mx-auto">
              <button
                className="py-2 w-10p bg-green-like-100 rounded-sideicon text-white"
                onClick={() => createQuiz()}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateModal;
