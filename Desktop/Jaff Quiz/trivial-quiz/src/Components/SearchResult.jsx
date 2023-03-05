import React, { useContext } from 'react'
import { searchContext } from './Result';
import { FaEye, FaThumbsUp } from "react-icons/fa";
const SearchResult = () => {
    const { userRecords } = useContext(searchContext);
  return (
    <div className="bg-white w-8p mx-auto  py-2 rounded-sideicon shadow-xl">
      <div className="w-8p mx-auto bg-green-like-100 rounded-sideicon">
        <p className="text-center text-white py-1 ">Series One</p>
      </div>
      <p className="w-9p border-b border-inputLine mt-1 mx-auto"></p>
      <div
        className="w-10p overflow-x-auto overflow-y"
        style={{ height: "280px" }}
      >
        {/* All payer total score */}
        <div className="bg-white w-9p my-4 mx-auto h-dashtable  shadow-sm mt-10 rounded-sideicon sidebarNone:w-9p">
          <div className="w-scoreResultSize">
            <div className="w-10p">
              <div className="flex">
                <div className="nameImageDiv">
                  <div className="nameDescriptionDiv">
                    <p>Name</p>
                  </div>
                  <div className="nameImageDivFlex">
                    <div className="name">
                      {userRecords.map((player) => (
                        <div>
                          <p>{player.playerName}</p>
                        </div>
                      ))}
                    </div>
                    <div className="imagee">
                      {userRecords.map((player) => (
                        <div>
                          <img src={player.playerImage} alt="" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div></div>
                <div className="flex">
                  <div>
                    <div className="quizNameFlex">
                      {userRecords[0].subjectToBeDone.map((subject) => (
                        <div className="w-11">
                          <p>{subject.quizName}</p>
                        </div>
                      ))}
                    </div>
                    <div className="">
                      {userRecords.map((subject) => (
                        <div className="scoreflex">
                          {subject.subjectToBeDone.map((score) => (
                            <div className="">
                              <p>{score.score}</p>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="totalDiv">
                    <div className="total">
                      <p>Total</p>
                    </div>
                    <div className="score">
                      {userRecords.map((total) => (
                        <div>
                          <p>{total.totalScore}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-8p py-1 flex items-center mx-auto border border-inputLine rounded-sideicon"
        style={{ height: "34px" }}
      >
        <div
          style={{ height: "27px" }}
          className="flex items-center px-4 rounded-sideicon mx-2 border border-inputLine"
        >
          <FaEye className="text-green-like-100" />{" "}
          <span className="px-1">1m</span>
        </div>
        <div
          style={{ height: "27px" }}
          className="flex items-center px-4 rounded-sideicon mx-2 border border-inputLine"
        >
          <button>
            <FaThumbsUp />
          </button>
          <span className="px-1">15k</span>
        </div>
      </div>
    </div>
  );
}

export default SearchResult