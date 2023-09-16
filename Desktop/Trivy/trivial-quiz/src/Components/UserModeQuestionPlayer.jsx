import { useContext, useState } from "react";
import "../styles/game.css"
import {FaArrowLeft, FaArrowRight} from "react-icons/fa"
import { gameContext } from "./Game";
const UserModeQuestionPlayer = () => {
  const {
    admin,
    currentSecond,
    currentQuestionIndex,
    currentSubjectName,
    selfCurrentQuestion,
    quizNumberAttempted,
    knowPickedAnswer,
    selfNextBtn,
    selfPrevBtn,
    selfQuestionIndicatorBtn,
    selfPickAnswerBtn,
     selfSubmitBtn
  } = useContext(gameContext);
 
  return (
    <div className="w-10p flex justify-center items-center">
      <div className="w-8p mx-auto userWidth:w-9p">
        <div className="flex justify-between">
          <div className="w-dw py-2 px-2">
            <div>
              <div className="w-10p py-2 bg-green-like-100 flex justify-center items-center">
                <p className="text-white italics">{currentSubjectName}</p>
              </div>
            </div>
          </div>
          <div style={{borderRadius:"50px"}} className="w-11 h-11 fixed top-2 right-5 bg-green-like-100 flex justify-center items-center">
            <p className="font-bold  text-4xl font-serif text-white">
              {currentSecond}
            </p>
          </div>
        </div>

        {selfCurrentQuestion.question.image !== "" && (
          <div className="w-8px mx-auto">
            <img
              src={selfCurrentQuestion.question.image}
              className="w-10p object-cover"
              alt=""
            />
          </div>
         )} 
        <div className="w-10p pt-8 pb-2 border-b border-green-like-100 flex ">
          <div
            className="h-3 w-3 p-2 bg-dashback-200 flex justify-center items-center"
            style={{ borderRadius: "30px" }}
          >
            <p>{currentQuestionIndex + 1}</p>
          </div>
          <p className="px-2 text-md text-green-like-100 font-mono">
            {selfCurrentQuestion.question.text}
          </p>
        </div>
        <div>
          {selfCurrentQuestion.answers.map((content, id) => (
            <div className="my-6 flex justify-start items-center">
              <button
                onClick={() => selfPickAnswerBtn(content.status, id)}
                disabled={admin}
                className={`w-5 h-5 text-sm border text-green-like-100 border-green-like-100  
                ${
                  knowPickedAnswer[currentQuestionIndex] === id + 1 &&
                  `outline outline-green-like-100`
                }
                `}
              >
                {id === 0 && "A"}
                {id === 1 && "B"}
                {id === 2 && "C"}
                {id === 3 && "D"}
              </button>
              <p className="ml-2 text-green-like-100 font-mono">
                {content.option}
              </p>
            </div>
           ))} 
          <div className="w-10p  flex justify-end">
            <button className="py-2 px-4 bg-green-like-100 text-white" onClick={selfSubmitBtn}>Submit</button>
          </div>

          <div className="w-10p flex justify-between py-3">
            <button onClick={() => selfPrevBtn()}>
              <FaArrowLeft className="text-green-like-100" />
            </button>
            <button
              onClick={() => selfNextBtn()}
              className="text-green-like-100"
            >
              <FaArrowRight />
            </button>
          </div>
          <div className="selfQuizId">
            {quizNumberAttempted.map((content, id) => (
              <button
                onClick={() => selfQuestionIndicatorBtn(id)}
                className={`${
                  content === 0
                    ? `bg-green-like-100 text-white border border-r-dashback-200`
                    : `bg-dashback-200 text-chartbg border-r border-chartbg`
                } py-2  font-mono `}
              >
                {id + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserModeQuestionPlayer
