import React, { useContext, useEffect } from 'react'
import "../styles/game.css"
import bese from "../Images/bestStudent.jpg"
import { gameContext } from './Game'
const AdminModeQuestionPlayer = () => {
  const {
    admin,
    currentSecond,
    startAdminGameBtn,
    adminModePickAnswerBtn,
    adminIdButtonClickedIndicator,
    adminModeQuestion,
    answerTimeStatus,
    startBtnForAdmin,
    showScreen,
    answerStyle,
    adminMode1QuestionNumber,
  } = useContext(gameContext);
 
  return (
    <>
      <div className="mode1AdminDiv">
        <div className="w-10p">
          {/* {answerTimeStatus && ( */}
            <div className="w-10 h-10 mx-auto flex justify-center fixed right-5 top-2 items-center bg-green-like-100" style={{borderRadius:"30px"}}>
              <p className="text-center text-white text-2xl">
                {currentSecond === -1 ? 0 : currentSecond}
              </p>
            </div>
          {/* )} */}
          <div className="adminModeQuestionDiv">
            {/* {adminModeQuestion.question.image !== "" && ( */}
              <div className="adminModeImageDiv py-3">
                {/* <img src={adminModeQuestion.question.image} alt="" /> */}
                <img className="adminModeImage" src={bese} alt="" />
              </div>
            {/* )} */}
            <div className="w-10p h-10p  flex justify-center  items-center">
              <div className="w-10p">
                <div className="flex justify-center items-center">
                  <div
                    style={{ borderRadius: "20px" }}
                    className="w-4 h-4 flex justify-center mx-2 items-center bg-dashback-200 text-green-like-100"
                  >
                    <p>{adminMode1QuestionNumber + 1}</p>
                  </div>

                  <p className="text-green-like-100 py-2 text-3xl font-serif  createmodal:text-">
                    {adminModeQuestion.question.text}
                  </p>
                </div>
                {/* {startBtnForAdmin && ( */}
                  <div className="w-10p flex justify-center">
                    <button
                      onClick={startAdminGameBtn}
                      className="bg-green-like-100 py-2 px-4 text-white"
                    >
                      Start
                    </button>
                  </div>
                {/* // )} */}
                {/* {answerTimeStatus && ( */}
                  <div className="adminBtn">
                    {adminModeQuestion.answers.map((content, id) => (
                      <button
                        disabled={admin}
                        className={`adminModeBtnDiv ${
                          answerStyle === id + "yes" && `answerStyle`
                        }  ${
                          id === adminIdButtonClickedIndicator &&
                          `bg-green-like-200`
                        }`}
                        onClick={() =>
                          adminModePickAnswerBtn(content.status, id)
                        }
                      >
                        <div
                          className={`adminModeBtnIndicator ${
                            answerStyle === id + "yes" &&
                            `answerStyle outline outline-white`
                          } ${
                            id === adminIdButtonClickedIndicator &&
                            `outline outline-green-like-100`
                          }`}
                        ></div>
                        <div className="adminModeBtnOption">
                          <p>{content.option}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showScreen && (
        <div
          className="w-10p h-10p fixed top-0"
          style={{ backgroundColor: "#00000000" }}
        ></div>
      )}
    </>
  );
}

export default AdminModeQuestionPlayer