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
      console.log(quizIdentificationForDeleting);
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
          <div className="w-createModalSize bg-white rounded-sideicon">
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
              <p className="text-center flex justify-center items-center font-mono py-3 text-green-like-100">
                Are you sure you want to delete{" "}
                <span>
                  <FaTrash className="text-red-like-100" />
                </span>
              </p>
            </div>
            <div className="flex py-3 px-2">
              <button
                className="bg-dashback-200 py-2 px-3 rounded-sideicon"
                onClick={() => setDeleteModalState(false)}
              >
                Cancel
              </button>{" "}
              <button
                disabled={deleteSpinner}
                className="bg-green-like-100 py-2 px-3 rounded-sideicon text-white flex items-center"
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
