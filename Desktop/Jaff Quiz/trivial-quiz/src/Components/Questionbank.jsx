import DashbarNav from "./DashbarNav";
import Sidebar from "./Sidebar";
import { useState, useEffect, useContext } from "react"
import { appContext } from "../App";
import axios from "axios";
const Questionbank = () => {
  const {adminEndPoint}= useContext(appContext)
   const getSpecificQuizEndPoint = `${adminEndPoint}/getSpecificQuiz`;

   useEffect(() => {
     
     axios
       .get(getSpecificQuizEndPoint, {
         headers: {
           Authorization: `bearer, ${localStorage.quizxxx}`,
           "Content-Type": "application/json",
         },
       })
       .then((result) => {
         if (result.data.status) {
          console.log(result.data)
         }
       });
   }, []);
  
  return (
    <div>
      <DashbarNav />
      <Sidebar />
      <div className="w-7p mx-auto flex justify-between bg-dashback-200 mt-12 rounded-sideicon">
        <div className="w-10p">
          <button className="w-10p py-3 px-2 text-center bg-green-like-100 rounded-sideicon">
            English
          </button>
        </div>
        <div className="w-10p">
          <button className="w-10p py-3 px-2 text-center ">English</button>
        </div>
        <div className="w-10p">
          <button className="w-10p py-3 px-2 text-center">English</button>
        </div>
        <div className="w-10p">
          <button className="w-10p py-3 px-2 text-center">English</button>
        </div>
      </div>
    </div>
  );
};

export default Questionbank;
