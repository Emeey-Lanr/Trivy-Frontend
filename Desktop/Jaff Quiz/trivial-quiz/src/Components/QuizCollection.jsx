import React, { createContext, useContext, useEffect, useState } from "react";
import DashbarNav from "./DashbarNav";
import Sidebar from "./Sidebar";
import { SlPlus, SlTrash, SlPeople, SlBookOpen } from "react-icons/sl";
import "../styles/collection.css";
import axios from "axios";
import { appContext } from "../App";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
export const quizCollectionContext = createContext();
const QuizCollection = () => {
  let navigate = useNavigate();
  const {
    adminEndPoint,
    setSideBarBoxShadow,
    setDeleteModalState,
    setCurrentSet,
  } = useContext(appContext);
  const loadQuizEndPoint = `${adminEndPoint}/loadcollections`;
  const [collections, setCollections] = useState([]);
  const loadcollectionsFunction = () => {
      axios
        .get(loadQuizEndPoint, {
          headers: {
            Authorization: `bearer ${localStorage.quizClassId}`,
            "Content-Type": "application/json",
          },
        })
        .then((result) => {
          if (result.data.status) {
            setCollections(result.data.collections);
            setCurrentSet(result.data.class);
            if (result.data.class === "Primary") {
              setSideBarBoxShadow(2);
            } else if (result.data.class === "Junior") {
              setSideBarBoxShadow(3);
            } else if (result.data.class === "Senior") {
              setSideBarBoxShadow(4);
            }
          } else {
            alert(result.data.message);
          }
        });
  }

  useEffect(() => {
  loadcollectionsFunction()
  }, []);

  const targetQuizCollectionEndPoint = `${adminEndPoint}/generateQuizSpecificToken`;
  const getQuizFunction = (a, b, c) => {
     axios
      .post(targetQuizCollectionEndPoint, { quizDbId: b})
      .then((result) => {
        if (result.data.status) {
          localStorage.quizxxx = result.data.quizId;
          navigate(c);
        }
      });
  }
  const addQuestion = (id, quizDatabaseid) => {
   getQuizFunction(id, quizDatabaseid, "/add/quiz/questions")
  };
  const [quizIdentificationForDeleting, setquizIdentificationForDeleting] = useState({
    index: "",
    quizId:""
  })
  const deleteSpecificCollection = (index, quizID) => {
    setDeleteModalState(true);
    setquizIdentificationForDeleting({index:index, quizId:quizID})
  };
  // find the user that played
  const findUser = (index, quizId) => {

    getQuizFunction(index, quizId, "/quizParticipants");
    
  }


  const openQuestion = (id, quizDatabaseid) => {
    getQuizFunction(id, quizDatabaseid, "/questionbank");
  };
  return (
    <quizCollectionContext.Provider
      value={{
        loadcollectionsFunction,
        quizIdentificationForDeleting,
      }}
    >
      <div className="w-100">
        <DeleteModal />
        <Sidebar />
        <DashbarNav />

        {collections.length > 0 ? (
          <div className="collections">
            {collections.map((Content, id) => (
              <div className="w-10p bg-dashback-100">
                <div className="bg-green-like-100 my-4 py-2 w-9p mx-auto rounded-sideicon">
                  <p className="text-center text-white font-light">
                    {Content.quizName}
                  </p>
                </div>
                <div className="w-6p mx-auto h-dw flex justify-center items-center rounded-sideicon gradi">
                  <h2 className="text-center text-5xl font-bold text-white">
                    {Content.quizName.split("")[0]}
                  </h2>
                </div>
                <div>
                  <p className="text-center text-sm mb-3">
                    <span>
                      <b>Quiz Id</b>
                    </span>
                    <br />
                    <span>{Content.quizId}</span>
                  </p>
                </div>
                <div className="border border-line rounded-sideicon flex justify-between items-center px-2 py-1 w-9p mx-auto">
                  <div>
                    <div className="flex justify-center bg-green-like-100 shadow-lg rounded-sideicon py-2 px-3">
                      <button onClick={() => addQuestion(id, Content._id)}>
                        <SlPlus className="text-white" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-center bg-green-like-100 shadow-lg rounded-sideicon py-2 px-3">
                      <button
                        onClick={() =>
                          deleteSpecificCollection(id, Content._id)
                        }
                      >
                        <SlTrash className="text-white" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-center bg-green-like-100 shadow-lg rounded-sideicon py-2 px-3">
                      <button>
                        <SlPeople
                          className="text-white"
                          onClick={() => findUser(id, Content._id)}
                        />
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-center bg-green-like-100 shadow-lg rounded-sideicon py-2 px-3">
                      <button onClick={() => openQuestion(id, Content._id)}>
                        <SlBookOpen className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p>Your quiz collection is empty</p>
          </div>
        )}
      </div>
    </quizCollectionContext.Provider>
  );
};

export default QuizCollection;
