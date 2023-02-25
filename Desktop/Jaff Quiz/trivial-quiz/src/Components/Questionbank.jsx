import DashbarNav from "./DashbarNav";
import Sidebar from "./Sidebar";
import { useState, useEffect, useContext } from "react";
import { appContext } from "../App";
import axios from "axios";
import { FaCheck, FaSlash } from "react-icons/fa";
const Questionbank = () => {
  const { adminEndPoint } = useContext(appContext);
  const getSpecificQuizEndPoint = `${adminEndPoint}/getSpecificQuiz`;
  const [questionTitle, setQuestionTitle] = useState([]);
  const [question, setQuestion] = useState([])
  const [question1, setQuestion1] = useState([])
  const [styleId, setStyleId] = useState(0);
  const [questionPasswordBank, setQuestionPasswordBank] = useState("question")
  const [userPassword, setUserPassword] = useState([])
  const [checkStyle, setCheckStyle] =useState(1)

  useEffect(() => {
    axios
      .get(getSpecificQuizEndPoint, {
        headers: {
          Authorization: `bearer, ${localStorage.quizxxx}`,
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        if (result.data.status) {
          console.log(result.data);
          setQuestionTitle(result.data.currentQuiz.quizSubject);
          setQuestion1(result.data.currentQuiz.quizSubject);
          setQuestion(result.data.currentQuiz.quizSubject[styleId].questions);
          console.log(result.data.currentQuiz.quizMultiplePassword);
          setUserPassword(result.data.currentQuiz.quizMultiplePassword);
        }
      });
  }, []);

  const openPassword = () => {
    setQuestionPasswordBank("password")
    setCheckStyle(2)
    console.log(userPassword)
  }
  const openQuestion = () => {
    setQuestionPasswordBank("question");
    setCheckStyle(1)
  }
  
  const checkQuestionSet = (id) => {
    setStyleId(id);
    setQuestion(question1[id].questions);
    // console.log(question[id])
  };
  return (
    <div>
      <DashbarNav />
      <Sidebar />
      <div className="w-8 mx-auto flex justify-start items-center mt-12">
        <button
          onClick={() => openQuestion()}
          className={`py-2 px-2 text-center ${
            checkStyle === 1
              ? `bg-green-like-100 rounded-sideicon text-white`
              : `bg-dashback-200`
          }`}
        >
          Question
        </button>
        <button
          onClick={() => openPassword()}
          className={`py-2 px-2 text-center ${
            checkStyle === 2
              ? `bg-green-like-100 rounded-sideicon text-white`
              : `bg-dashback-200`
          }`}
        >
          Password
        </button>
      </div>
      {questionPasswordBank === "password" && (
        <div className="w-5p mx-auto mt-11">
          {userPassword.length > 0 &&  userPassword.map((pass, id) => (
            <div className="text-green-like-100 my-6">
              <p className="font-bold font-serif"> <span>{ id + 1} -</span> {pass}</p>
            </div>
          ))}
        </div>
      )}
      {questionPasswordBank === "question" && (
        <div>
          <div className="w-7p mx-auto flex justify-between bg-dashback-200 mt-12 rounded-sideicon">
            {questionTitle.length > 0 ? (
              questionTitle.map((content, id) => (
                <div className="w-10p">
                  <button
                    onClick={() => checkQuestionSet(id)}
                    className={`w-10p py-3 px-2 text-center ${
                      styleId === id
                        ? "bg-green-like-100 text-white"
                        : "bg-dashback-200"
                    }  rounded-sideicon`}
                  >
                    {content.quizName}
                  </button>
                </div>
              ))
            ) : (
              <div>
                <p>wait</p>
              </div>
            )}
          </div>
          <div className="w-7p mx-auto">
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
                      <button className="bg-green-like-100 py-1 px-3">
                        Delete
                      </button>
                      <button className="py-1 px-3">Edit</button>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p className="text-center">{content.question.text}</p>
                    </div>
                    {content.question.image !== "" && (
                      <div>
                        <img src="" alt="" />
                      </div>
                    )}
                  </div>
                  <div className="w-10p">
                    {content.answers.map((ans, id) => (
                      <div
                        className={`${
                          ans.status
                            ? "bg-green-like-100 text-white"
                            : "bg-dashback-200"
                        }  w-7p mx-auto my-1 flex justify-between py-3 items-center px-2`}
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
    </div>
  );
};

export default Questionbank;
