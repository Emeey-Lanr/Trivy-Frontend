import React, { useContext, useState } from "react";
import Logo from "./Logo";
import "../styles/game.css";
import { FaArrowRight } from "react-icons/fa";
import { gameContext } from "./Game";
const AdminModeTopActs = () => {
    const {
      admin,
      playerScore,
      playerScoreGameIndex,
      currentSubject,
      scoreIndex,
      adminMode1NextButton,
      adminMode1QuestionNumber,
    } = useContext(gameContext);

  return (
    <div className="w-10p">
      <div className="py-2 px-2">
        <Logo />
      </div>
      <div className="w-dw bg-green-like-100 py-3">
        <p className="text-center text-white font-mono">{`${currentSubject}-Q${adminMode1QuestionNumber  + 1} `}</p>
      </div>
      <div className="topacts">
        {playerScore.map((players, id) => (
          <div className="topActsDiv">
            <div className="scoreBalldiv">
              <div className="scoreBall">
                <p>
                  {
                    players.subjectToBeDone[playerScoreGameIndex].questions[
                      scoreIndex
                    ]
                  }
                </p>
              </div>
            </div>

            <div className="imgdiv">
              <img src={players.playerImage} alt="" />
            </div>
            <div className="nameBox py-1">
              <div className="index bg-dashback-100">
                <p className="text-white">{id + 1}</p>
              </div>
              <div className="name ">
                <p className="text-white font-bold skew-x-6 text-center">{players.playerName}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {admin && (
        <div className="w-dw h-7 flex justify-center items-center bg-green-like-100 fixed bottom-0 right-4">
          <button className="w-10 h-7" onClick={adminMode1NextButton}>
            <FaArrowRight className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminModeTopActs;
