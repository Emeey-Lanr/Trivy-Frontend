import student from "../Images/bestStudent.jpg";
import { FaCheck, FaSlash } from "react-icons/fa";
import "../styles/game.css";
import { useState } from "react";
const PlayerQuestion = () => {
  const [ifPicked, setifPicked] = useState(-1);
  const [question, setQuestion] = useState([
    { option: "bayo", status: true },
    { option: "kunle", status: false },
    { option: "tade", status: false },
    { option: "mike", status: false },
  ]);

  const answerPickedBtn = (id) => {
    setifPicked(id);
  };
  return (
    <div className="w-10p h-10p fixed top-0 flex justify-center items-center overflow-y">
      <div className="w-10p">
        <div className="h-8 w-8 flex justify-center items-center mx-auto bg-green-like-100">
          <p className="text-4xl text-white font-bold">8</p>
        </div>
        <div className="w-5p mx-auto">
          {/* <img
            className="w-10p object-center"
            src={student}
            alt=""
            style={{ height: "200px" }}
          /> */}
        </div>
        <div className="py-2">
          <p className="text-center text-green-like-100 text-2xl font-serif">
            Who is the king of england
          </p>
        </div>
        <div className="answerbtn">
          {question.map((content, id) => (
            <div className="w-10p my-2">
              <button
                className="w-10p py-2"
                onClick={() => answerPickedBtn(id)}
              >
                <div className="w-10p flex justify-end px-2">
                  {ifPicked === id ? (
                    <div
                      className="w-7 h-7 flex justify-center items-center bg-green-like-100 border border-white outline outline-green-like-100"
                      style={{ borderRadius: "40px" }}
                    >
                      <FaCheck className="text-bold text-white " />
                    </div>
                  ) : (
                    <div
                      className="w-7 h-7 flex justify-center items-center border border-green-like-100"
                      style={{ borderRadius: "40px" }}
                    >
                      <FaSlash className="text-bold text-green-like-100" />
                    </div>
                  )}
                </div>
                <div className="w-10p flex justify-start">
                  <p className="ml-3 text-2xl text-green-like-100 font-italic">
                    {content.option}
                  </p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerQuestion;
