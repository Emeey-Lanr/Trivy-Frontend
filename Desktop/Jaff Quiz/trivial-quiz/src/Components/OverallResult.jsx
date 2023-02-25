
import React, { useContext, useState } from "react";
import Logo from "./Logo";
import "../styles/game.css";
import best from "../Images/bestStudent.jpg"
import { FaArrowRight } from "react-icons/fa";
import { gameContext } from "./Game";
const OverallResult = () => {
  const { admin, playerScore, quizCompleted } = useContext(gameContext);
  return (
    <div className="w-10p">
      <div className="py-2 px-2">
        <Logo />
      </div>
      <div className="w-dw bg-green-like-100 py-3 mx-auto">
        <p className="text-center text-white font-mono">Overall Result</p>
      </div>
      <div className="topacts">
        {playerScore.map((players, id) => (
          <div className="topActsDiv">
            <div className="scoreBalldiv">
              <div className="scoreBall">
                <p>{players.totalScore}</p>
              </div>
            </div>

            <div className="imgdiv">
              <img src={players.playerImage} alt="" />
            </div>
            <div className="nameBox">
              <div className="index">
                <p>{id + 1}</p>
              </div>
              <div className="name ">
                <p>.{players.playerName}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {admin && (
        <div className="w-dw h-7 flex justify-center items-center bg-green-like-100 fixed bottom-0 right-4">
          <button
            className="w-10 h-7"
            onClick={() =>quizCompleted ()}
          >
            <FaArrowRight className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default OverallResult;
