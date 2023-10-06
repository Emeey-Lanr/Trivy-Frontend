import { useContext, useState } from "react";
import { FaTimes, FaTrash, FaSpinner } from "react-icons/fa";
import { appContext } from "../App";
import { quizCollectionContext } from "./QuizCollection";
import axios from "axios";
const DeleteModal = () => {
  const { adminEndPoint, deleteModalState, setDeleteModalState } =
    useContext(appContext);
  const { loadcollectionsFunction, quizIdentificationForDeleting } = useContext(
    quizCollectionContext
  );
  const [deleteSpinner, setDeleteSpinner] = useState(false);
  const [message, setMessage] = useState("");
  const deleteCollection = `${adminEndPoint}/deleteCollection`;
  const deleteBtn = () => {
 
      setDeleteSpinner(true)
    axios.post(deleteCollection, quizIdentificationForDeleting).then((result) => {
        if (result.data.status) {
            loadcollectionsFunction();
            setMessage(result.data.message)
            setTimeout(() => {
                setMessage("")
                setDeleteModalState(false)
                setDeleteSpinner(false)
            },500)
        } else {
            setMessage(result.data.message)
            setTimeout(() => {
                setMessage("")
                setDeleteModalState(false)
                setDeleteSpinner(false)
            }, 1000)
      }
    });
  };
  return (
    <>
      {deleteModalState && (
        <div className="w-10p h-10p fixed top-0 bg-modalback flex justify-center items-center">
          <div className="w-createModalSize bg-white rounded-sideicon createmodal:w-9p">
            <div className="w-10p flex justify-end py-2 px-1">
              <FaTimes
                className="text-green-like-100"
                onClick={() => setDeleteModalState(false)}
              />
            </div>
            {message !== "" && (
              <div className="w-9p mx-auto bg-dashback-100">
                <p className="text-center">{message}</p>
              </div>
            )}
            <div>
              <div className="w-5 h-5 rounded-sideedge border border-red-like-100 flex justify-center items-center mx-auto">
                <span>
                  <FaTrash className="text-red-like-100" />
                </span>
              </div>
              <p className="text-center text-sm flex justify-center items-center  py-3 text-inputLine">
                Are you sure you want to delete
              </p>
            </div>
            <div className=" py-3 px-2">
              {/* <button
                className="bg-dashback-200 w-10p mb-3 py-2 px-3 rounded-sideicon"
                onClick={() => setDeleteModalState(false)}
              >
                Cancel
              </button>{" "} */}
              <button
                disabled={deleteSpinner}
                className="bg-green-like-100 text-center w-10p py-2 px-3 rounded-sideicon text-white flex justify-center items-center"
                onClick={() => deleteBtn()}
              >
                Delete{" "}
                {deleteSpinner && (
                  <FaSpinner className="spin" style={{ margin: "0 2px" }} />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
