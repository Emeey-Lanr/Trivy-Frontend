import React, { useContext, useEffect, useState } from 'react'
import { FaCheck, FaTimes, FaSlash, FaSpinner } from "react-icons/fa";
import { appContext } from '../App'
import { addQuestionContext } from "./AddQuestions";

const EditQuestion = () => {
    const {
       
      editQuestionState,
      setEditQuestionState,

    } = useContext(appContext);
  const {
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
  } = useContext(addQuestionContext);

    const switchStatus = (index) => {
       
    }
    return (
      <>
        {editQuestionState && 
        (
        <div className="w-10p h-10p fixed top-0 bg-modalback flex justify-center items-end">
          <div className="w-5p bg-white rounded-sideicon py-3">
            <div className="px-2">
              <button onClick={() => setEditQuestionState(false)}>
                <FaTimes className="text-green-like-100" />
              </button>
            </div>
            <div className="h-5 w-8 rounded-r-sideicon bg-green-like-100"></div>
           
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
                className="h-6 w-10p rounded-side-icon  border border-inputLine focus:outline-green-like-100"
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
        </div>)
         }
      </>
    );
}

export default EditQuestion