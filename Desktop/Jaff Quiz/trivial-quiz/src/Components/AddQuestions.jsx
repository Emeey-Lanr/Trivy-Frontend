import DashbarNav from "./DashbarNav";
import Sidebar from "./Sidebar";
import "../styles/addquestion.css";
import { createContext, useContext, useRef, useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import { AiOutlineLine } from "react-icons/ai";
import { SlCloudUpload } from "react-icons/sl";
import AlertModal from "./AlertModal";
import { appContext } from "../App";
export const addQuestionContext = createContext(null);

const AddQuestions = () => {
  // app context
  const { setAlertModalStatus, setAlertMessage } = useContext(appContext);
  // empty input
  const questionInput = useRef();
  const answer1Input = useRef();
  const answer2Input = useRef();
  const answer3Input = useRef();
  const answer4Input = useRef();

  const [imageswitch, setImageSwitch] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  // to check if answer is picked
  const [checkNumber, setCheckNumber] = useState(0);
  const [buttonStyle, setButtonStyle] = useState({
    ifNotPicked: {
      height: "38px",
      width: "38px",
      margin: "0 10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "38px",
      outline: "2px solid #b6b6b6",
      backgroundColor: "#f5f7f8",
    },
    ifPicked: {
      height: "38px",
      width: "38px",
      margin: "0 10px",
      display: "flex",
      justifyContent: "center",
      border: "2px solid #f5f7f8",
      alignItems: "center",
      borderRadius: "38px",
      outline: "2px solid #03a26d",
      backgroundColor: "#03a26d",
    },
  });

  const uploadImage = (e) => {
    console.log(e);
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
    };
  };

  //chnaging from text to image
  const [btnStyle, setBtnStyle] = useState({
    text: "bg-green-like-100 text-white",
    image: "bg-dashback-200",
  });
  const textBtn = () => {
    setImageSwitch(true);
    setBtnStyle({
      text: "bg-green-like-100 text-white",
      image: "bg-dashback-200",
    });
  };

  const imageBtn = () => {
    setImageSwitch(false);
    setBtnStyle({
      text: "bg-dashback-200",
      image: "bg-green-like-100 text-white",
    });
  };
  //picking answers
  //  setting questions and answer
  const [questionBank, setQuestionBank] = useState([]);
  const [check, setCheck] = useState([
    { user: "ayo", age: 20 },
    { user: "ayo", age: 20 },
    { user: "ayo", age: 20 },
  ]);
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [option1Status, setOption1Status] = useState(false);
  const [option2Status, setOption2Status] = useState(false);
  const [option3Status, setOption3Status] = useState(false);
  const [option4Status, setOption4Status] = useState(false);
  const questionToBeAdded = {
    question: { text: question, image: "" },
    answers: [
      { option: option1, status: option1Status },
      { option: option2, status: option2Status },
      { option: option3, status: option3Status },
      { option: option4, status: option4Status },
    ],
    score: 0,
  };

  const [state, setState] = useState(true);

  const answer1 = () => {
    setCheckNumber(1);
    setOption1Status(true);
    setOption2Status(false);
    setOption3Status(false);
    setOption4Status(false);
  };
  const answer2 = () => {
    setCheckNumber(2);
    setOption1Status(false);
    setOption2Status(true);
    setOption3Status(false);
    setOption4Status(false);
  };
  const answer3 = () => {
    setCheckNumber(3);
    setOption1Status(false);
    setOption2Status(false);
    setOption3Status(true);
    setOption4Status(false);
  };
  const answer4 = () => {
    setCheckNumber(4);
    setOption1Status(false);
    setOption2Status(false);
    setOption3Status(false);
    setOption4Status(true);
  };

  //adding question to bank
  const emptyInputFuction = (empty,checkNumber) => {
    questionInput.current.value = empty;
    answer1Input.current.value = empty;
    answer2Input.current.value = empty;
    answer3Input.current.value = empty;
    answer4Input.current.value = empty;
    setCheckNumber(checkNumber)
  };
  const alertFunction = (status, message, time) => {
    setAlertModalStatus(status);
    setAlertMessage(message);
    setTimeout(() => {
      setAlertModalStatus(false);
      setAlertMessage("");
    }, time);
  };
  const [status, setStatus] = useState(false);
  const addQuestionToBank = () => {
    if (question === "") {
      alertFunction(true, "No question added", 1000);
    } else if (
      option1 === "" ||
      option2 === "" ||
      option3 === "" ||
      option4 === ""
    ) {
      alertFunction(true, "Option missing, add", 1000);
    } else if (checkNumber === 0) {
      alertFunction(true, "No answer picked", 1000);
    } else {
      alertFunction(true, "added", 500);
      setQuestionBank([...questionBank, questionToBeAdded]);
      emptyInputFuction("", 0);
    }

    console.log(questionToBeAdded);

    // if (status) {
    //
    // } else {
    //   alert("you can't add");
    // }
  };

  const editQuestion = (id) => {
    questionInput.current.value = questionBank[id].question.text
    // answer1Input.current.value = 
    // answer2Input.current.value = 
    // answer3Input.current.value = 
    // answer4Input.current.value = 
  };
  return (
    <addQuestionContext.Provider value={{}}>
      <div>
        <DashbarNav />
        <Sidebar />

        <div className="mt-11 w-8p ml-auto flex justify-center items-center sidebarNone:w-10p">
          <div className="w-7p py-3 bg-dashback-200 sidebarNone:w-5p">
            <button className="w-10p">Exist</button>
          </div>
          <div className="w-3p sidebarNone:w-5p">
            <button className="w-10p bg-green-like-100 py-3 text-white ">
              Save
            </button>
          </div>
        </div>
        <div className="w-8p mt-6 ml-auto sidebarNone:w-10p">
          {imageswitch && (
            <div className="text w-8p mx-auto  sidebarNone:w-10p sidebarNone:flex sidebarNone:justify-center">
              <textarea
                ref={questionInput}
                name=""
                className="sidebarNone:mb-3"
                onChange={(e) => setQuestion(e.target.value)}
              ></textarea>
            </div>
          )}
          {!imageswitch && (
            <div>
              {imageUrl === "" && (
                <div className="w-10p h-dw flex justify-center items-center">
                  <label id="image">
                    <SlCloudUpload className="text-5xl text-green-like-100" />
                    <input
                      type="file"
                      id="image"
                      hidden
                      onChange={(e) => uploadImage(e)}
                    />
                  </label>
                </div>
              )}
              {imageUrl !== "" && (
                <div>
                  <img src="" alt="" />
                </div>
              )}
            </div>
          )}
          <div className="mx-auto flex sidebarNone:w-10p sidebarNone:flex sidebarNone:justify-center">
            <button
              className={`${btnStyle.text} py-2 px-4  rounded-l-sideicon`}
              onClick={() => textBtn()}
            >
              Text
            </button>
            <button
              className={`${btnStyle.image} py-2 px-4 rounded-r-sideicon`}
              onClick={() => imageBtn()}
            >
              Image
            </button>
          </div>
          <div className="answer mt-1">
            <div>
              <p className="ml-3 py-4 sidebarNone:text-center sidebarNone:text-sm">
                Pick An Answer
              </p>
            </div>

            <div className="flex items-center option sidebarNone:flex sidebarNone:justify-center">
              <button
                onClick={() => answer1()}
                style={
                  checkNumber === 1
                    ? buttonStyle.ifPicked
                    : buttonStyle.ifNotPicked
                }
              >
                {checkNumber === 1 ? (
                  <FaCheck className="right" />
                ) : (
                  <FaTimes className="wrong" />
                )}
              </button>
              <input
                type="text"
                onChange={(e) => setOption1(e.target.value)}
                ref={answer1Input}
              />
            </div>

            <div className="flex items-center option sidebarNone:flex sidebarNone:justify-center">
              <button
                onClick={() => answer2()}
                style={
                  checkNumber === 2
                    ? buttonStyle.ifPicked
                    : buttonStyle.ifNotPicked
                }
              >
                {checkNumber === 2 ? (
                  <FaCheck className="right" />
                ) : (
                  <FaTimes className="wrong" />
                )}
              </button>
              <input
                type="text"
                onChange={(e) => setOption2(e.target.value)}
                ref={answer2Input}
              />
            </div>

            <div className="flex items-center option sidebarNone:flex sidebarNone:justify-center">
              <button
                onClick={() => answer3()}
                style={
                  checkNumber === 3
                    ? buttonStyle.ifPicked
                    : buttonStyle.ifNotPicked
                }
              >
                {checkNumber === 3 ? (
                  <FaCheck className="right" />
                ) : (
                  <FaTimes className="wrong" />
                )}
              </button>
              <input
                type="text"
                onChange={(e) => setOption3(e.target.value)}
                ref={answer3Input}
              />
            </div>

            <div className="flex items-center option sidebarNone:flex sidebarNone:justify-center">
              <button
                onClick={() => answer4()}
                style={
                  checkNumber === 4
                    ? buttonStyle.ifPicked
                    : buttonStyle.ifNotPicked
                }
              >
                {checkNumber === 4 ? (
                  <FaCheck className="right" />
                ) : (
                  <FaTimes className="wrong" />
                )}
              </button>
              <input
                type="text"
                onChange={(e) => setOption4(e.target.value)}
                ref={answer4Input}
              />
            </div>
            <div className="w-6p mx-auto flex justify-end sidebarNone:w-8p">
              <button
                className="bg-green-like-100 py-2 px-4 text-white rounded-sideicon"
                onClick={() => addQuestionToBank()}
              >
                Add
              </button>
            </div>
            {/* Question added */}
            <div className="w-9px mx-auto sidebarNone:w-10p">
              <div className="w-8p mt-6 rounded-sideicon sidebarNone:10p sidebarNone:mx-auto">
                <h1 className="text-center text-xl text-white py-3">
                  Questions
                </h1>
                {questionBank.length > 0 &&
                  questionBank.map((quiz, id) => (
                    <div className="bg-dashback-100 w-8p mb-3 mx-auto rounded-sideicon pt-2 px-1 sidebarNone:w-10p sidebarNone:mx-auto">
                      <div className="flex justify-between items-center">
                        <div className="questionNumber">{id + 1}</div>
                        <div className="border rounded-sideicon">
                          <button className="bg-green-like-100 py-2 px-3 rounded-l-sideicon text-white">
                            remove
                          </button>
                          <button
                            className="bg-green-like-200 py-2 px-3 rounded-r-sideicon"
                            onClick={() => editQuestion(id)}
                          >
                            Edit
                          </button>
                        </div>
                      </div>

                      <div className="w-10p flex justify-center items-center h-dw">
                        {quiz.question.image !== "" && (
                          <img src={quiz.question.image} alt="" />
                        )}
                        <p className="italic text-2xl">{quiz.question.text}</p>
                      </div>
                      <div className="w-9p mx-auto">
                        <div className="flex  items-center">
                          <div className="w-10p mb-6">
                            {quiz.answers.map((ans, id) =>
                              !ans.status ? (
                                <div className="optionDiv py-5">
                                  <p>{ans.option}</p>
                                  <div>
                                    <div className="notAnswer flex justify-center items-center">
                                      <div></div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="optionDiv my-3">
                                  <p>{ans.option}</p>
                                  <div>
                                    <div className="notAnswer flex justify-center items-center">
                                      <FaCheck className="text-green-like-100 w-9p" />
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <AlertModal />
      </div>
    </addQuestionContext.Provider>
  );
};

export default AddQuestions;
