import { createContext, useState } from "react";
import bestStudent from "../Images/bestStudent.jpg"
import { FaEye, FaSearch, FaThumbsUp,  } from 'react-icons/fa';
import SearchResult from "./SearchResult";
import { SlPeople, SlSettings, SlUserFollowing } from "react-icons/sl";
import CollectionSearchResult from "./CollectionSearchResult";
export const searchContext = createContext()
const Result = () => {
     const [userRecords, setUserRecords] = useState([
       {
         playerName: "oyelowo",
         playerImage: bestStudent,
         subjectToBeDone: [
           { quizName: "english", score: 30 },
           { quizName: "Yoruba", score: 10 },
           { quizName: "Maths", score: 30 },
           { quizName: "English", score: 10 },
         ],
         totalScore: 90,
       },
       {
         playerName: "Emmanuel",
         playerImage: bestStudent,
         subjectToBeDone: [
           { quizName: "english", score: 1 },
           { quizName: "english", score: 1 },
           { quizName: "english", score: 1 },
           { quizName: "english", score: 1 },
         ],
         totalScore: 90,
       },
       {
         playerName: "Dara",
         playerImage: bestStudent,
         subjectToBeDone: [
           { quizName: "english", score: 1 },
           { quizName: "english", score: 1 },
           { quizName: "english", score: 1 },
           { quizName: "english", score: 1 },
         ],
         totalScore: 90,
       },
       {
         playerName: "Wole",
         playerImage: bestStudent,
         subjectToBeDone: [
           { quizName: "english", score: 1 },
           { quizName: "english", score: 1 },
           { quizName: "english", score: 1 },
           { quizName: "english", score: 1 },
         ],
         totalScore: 90,
       },
       {
         playerName: "Kola",
         playerImage: bestStudent,
         subjectToBeDone: [
           { quizName: "english", score: 1 },
           { quizName: "english", score: 1 },
           { quizName: "english", score: 1 },
           { quizName: "english", score: 1 },
         ],
         totalScore: 90,
       },
       {
         playerName: "Tunde",
         playerImage: bestStudent,
         subjectToBeDone: [
           { quizName: "english", score: 1 },
           { quizName: "english", score: 1 },
           { quizName: "english", score: 1 },
           { quizName: "english", score: 1 },
         ],
         totalScore: 90,
       },
       {
         playerName: "Brain",
         playerImage: bestStudent,
         subjectToBeDone: [
           { quizName: "english", score: 1 },
           { quizName: "english", score: 1 },
           { quizName: "english", score: 1 },
           { quizName: "english", score: 1 },
         ],
         totalScore: 90,
       },
     ]);
    
    return (
      <searchContext.Provider
        value={{
          userRecords,
        }}
      >
        <div className="w-10p resultGrid">
          <div
            className="flex justify-center items-center"
            style={{ height: "100vh" }}
          >
            <div
              className="w-9 flex justify-center items-center bg-green-like-100 rounded-sideicon"
              style={{ height: "420px" }}
            >
              <div className="w-10p">
                <button className="w-10p border-b border-white rounded-sideicon my-2">
                  <div className="w-8p flex justify-center items-center  mx-auto h-5 rounded-sideicon bg-white">
                    <SlPeople />
                  </div>

                  <p className="text-white text-sm py-1">Primary</p>
                </button>
                <button className="w-10p border-b my-2 border-white rounded-sideicon">
                  <div className="w-8p flex justify-center items-center  mx-auto h-5 rounded-sideicon bg-white">
                    <SlPeople />
                  </div>

                  <p className="text-white text-sm py-1">Junior</p>
                </button>
                <button className="w-10p border-b border-white my-2 rounded-sideicon">
                  <div className="w-8p flex justify-center items-center  mx-auto h-5 rounded-sideicon bg-white">
                    <SlPeople />
                  </div>

                  <p className="text-white text-sm py-1">Sec</p>
                </button>
                <button className="w-10p border-b border-white my-2 rounded-sideicon">
                  <div className="w-8p flex justify-center items-center  mx-auto h-5 rounded-sideicon bg-white">
                    <SlUserFollowing />
                  </div>

                  <p className="text-white text-sm py-1">Profile</p>
                </button>
              </div>
            </div>
          </div>
          <div className="w-10p bg-dashback-200 border-l border-r border-inputLine py-3">
            <div className="border-b w-10p flex justify-center items-center border-inputLine  py-3 mb-2">
              <div
                style={{ borderRadius: "40px" }}
                className="w-6p  flex justify-center items-center mx-auto border border-green-like-100 sidebarNone:w-8p"
              >
                <input
                  placeholder="Enter Collection Name"
                  style={{ borderRadius: "30px 0 0 30px" }}
                  type="text"
                  className="border-0 outline-0 w-8p h-6"
                />
                <button className="flex justify-center items-center w-2p">
                  <FaSearch />
                </button>
              </div>
            </div>
            {/* <SearchResult /> */}
            <CollectionSearchResult />
          </div>
          <div className="organizationDetails">
            <div className="w-8p bg-white shadow-lg mx-auto py-3">
              <div
                className="h-8 w-8 mx-auto flex justify-center items-center"
                style={{ border: "3px solid #03a26c" }}
              >
                <img
                  className="h-6 w-6"
                  style={{ borderRadius: "60px" }}
                  src={bestStudent}
                  alt=""
                />
              </div>
              <div className="flex justify-between items-center w-9p mx-auto my-3">
                <div className="bg-green-like-100 w-5p py-3">
                  <p className="text-white text-sm text-center">
                    Organisation UserName
                  </p>
                </div>
                <div className="bg-dashback-200 w-5p py-2">
                  <p className="text-center"> Oyelowo Emmanuel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </searchContext.Provider>
    );
}

export default Result