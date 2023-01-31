import { useContext, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { addQuestionContext } from "./AddQuestions";
import "../styles/modal.css";
const SaveQuestionModal = () => {
  const { subjects, openSaveQuestionModal, setOpenSaveQuestionModal } =
    useContext(addQuestionContext);
  const [subjectStyleForBtn, setSubjectStyleForBtn] = useState("hhh");
  const [message, setMessage] =useState("")
  const addToTheExistingOne = (id, subject) => {
    setSubjectStyleForBtn(subject + "add");
  };
  const replaceTheExistingOne = (id, subject) => {
    setSubjectStyleForBtn(subject + "replace")

  };
  return (
    <>
      {openSaveQuestionModal && (
        <div className="w-10p h-10p fixed top-0 bg-modalback flex justify-center items-center">
          <div className="w-createModalSize bg-white rounded-sideicon">
            <div className="w-10p flex justify-end py-1 px-1">
              <button onClick={() => setOpenSaveQuestionModal(false)}>
                <FaTimes />
              </button>
            </div>
            {message !== "" && <div className="w-9p mx-auto bg-dashback-200">

            </div>}
            <div className="flex justify-center items-center px-5 py-3">
              <div>
                <input type="text" className="h-5 w-5 border text-center" />
                <p className="text-center">H</p>
              </div>
              <div>
                <input type="text" className="h-5 w-5 border text-center" />
                <p className="text-center">M</p>
              </div>
              <div>
                <input type="text" className="h-5 w-5 border text-center" />
                <p className="text-center">S</p>
              </div>
            </div>
            <div className="subjectnameToAddQuestionTo ">
              {subjects.map((info, id) => (
                <div>
                  <p className="text-center">{info.subject}</p>
                  <div className="flex w-10p bg-dashback-200">
                    <button
                      className={`w-5p py-2 text-sm border-r border-r-green-like-100 ${
                        subjectStyleForBtn === info.subject + "add" &&
                        "bg-green-like-100 rounded-sideicon text-white"
                      }`}
                      onClick={() => addToTheExistingOne(id, info.subject)}
                    >
                      Add
                    </button>
                    <button
                      className={`5p py-2 px-1 text-sm text-center  ${
                        subjectStyleForBtn === info.subject + "replace" &&
                        "bg-green-like-100 rounded-sideicon text-white"
                      }`}
                      onClick={() => replaceTheExistingOne(id, info.subject)}
                    >
                      Replace
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-8p py-5 mx-auto">
              <button className="w-10p py-2 bg-green-like-100 rounded-sideicon text-white">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SaveQuestionModal;
