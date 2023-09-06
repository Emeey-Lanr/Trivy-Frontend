import React, { useContext, useState } from "react";
import Logo from "./Logo";
import "../styles/game.css";
import best from "../Images/bestStudent.jpg"
import { FaArrowRight } from "react-icons/fa";
import { gameContext } from "./Game";
const TopActs = () => {
  const {
    admin,
    playerScore,
    playerScoreGameIndex,
      currentSubject,
    nextSubjectOrOverallResult,
  } = useContext(gameContext);
  return (
    
    <div className="w-10p">
      <div className="py-2 px-2">
        <Logo />
      </div>
      <div className="w-dw bg-green-like-100 py-3">
        <p className="text-center text-white font-mono">{currentSubject}</p>
      </div>
      <div className="topacts">
        {playerScore.map((players, id) => (
          <div className="topActsDiv">
            <div className="scoreBalldiv">
              <div className="scoreBall">
                <p>{players.subjectToBeDone[playerScoreGameIndex].score}</p>
              </div>
            </div>

            <div className="imgdiv">
              <img src={players.playerImage} alt="" />
            </div>
            <div className="nameBox">
              <div className="index">
                <p  className="text-white text-lg">{id + 1}</p>
              </div>
              <div className="name ">
                <p className="text-white">{players.playerName}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {admin && (
        <div className="w-dw h-7 flex justify-center items-center bg-green-like-100 fixed bottom-0 right-4">
          <button
            className="w-10 h-7"
            onClick={() => nextSubjectOrOverallResult()}
          >
            <FaArrowRight className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TopActs;
