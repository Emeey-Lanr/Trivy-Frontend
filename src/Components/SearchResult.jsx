import React, { useContext } from 'react'
import { searchContext } from './Result';
import { FaEye, FaThumbsUp } from "react-icons/fa";
import { appContext } from '../App';
import ordinal from "ordinal";
const SearchResult = () => {
    
    const { userRecords, socketViews, countViews } = useContext(searchContext);
  return (
    <>
      {userRecords.length > 0 &&
        userRecords.map((content, id) => (
          <div className="bg-white w-8p mx-auto  py-2 rounded-sideicon shadow-xl mb-4 createmodal:w-10p">
            <div className="w-8p mx-auto bg-green-like-100 rounded-sideicon">
              <p className="text-center text-white py-1 ">Series {id + 1}</p>
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
                      <div>
                        <div className="rankDiv">
                          <div className="total">
                            <p>Rank</p>
                          </div>
                          <div className="score">
                            {content.ranking.map((content, id) => (
                              <div>
                                <p>{ordinal(content.rank)}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="nameImageDiv">
                        <div className="nameDescriptionDiv">
                          <p>Name</p>
                        </div>
                        <div className="nameImageDivFlex">
                          <div className="name">
                            {content.result.map((player) => (
                              <div>
                                <p>{player.playerName}</p>
                              </div>
                            ))}
                          </div>
                          <div className="imagee">
                            {content.result.map((player) => (
                              <div>
                                <img src={player.playerImage} alt="" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="schoolName">
                          <div className="total">
                            <p>School Name</p>
                          </div>
                          <div className="score">
                            {content.result.map((content, id) => (
                              <div>
                                <p>{content.schoolName}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <div>
                          <div className="quizNameFlex">
                            {content.result[0].subjectToBeDone.map(
                              (subject) => (
                                <div className="w-11">
                                  <p>{subject.quizName}</p>
                                </div>
                              )
                            )}
                          </div>
                          <div className="">
                            {content.result.map((subject) => (
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
                      <div onClick={() => countViews(content._id)}>
                        <div className="totalDiv">
                          <div className="total">
                            <p>Total</p>
                          </div>
                          <div className="score">
                            {content.result.map((total) => (
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
              className="w-8p py-1 flex justify-between items-center mx-auto border border-inputLine rounded-sideicon createmodal:w-9p"
              style={{ height: "34px" }}
            >
              <div className="flex">
                <div
                  style={{ height: "27px" }}
                  className="flex items-center px-4 rounded-sideicon mx-2 border border-inputLine"
                >
                  <FaEye className="" />
                  {socketViews.length > 0 && (
                    <span className="px-1">{socketViews[id].views}</span>
                  )}
                </div>
              </div>

              <div
                style={{ height: "27px" }}
                className="flex items-center px-4 rounded-sideicon mx-2 border border-inputLine"
              >
                <p>
                  <span>{content.month}</span>/<span>{content.day}</span>/
                  <span>{content.year}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default SearchResult