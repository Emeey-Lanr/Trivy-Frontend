import React from "react";
import DashbarNav from "./DashbarNav";
import Sidebar from "./Sidebar";
import { SlPlus, SlTrash, SlPeople, SlBookOpen } from "react-icons/sl";
import "../styles/collection.css";
const QuizCollection = () => {
  return (
    <div className="w-100">
      <Sidebar />
      <DashbarNav />
      <div className="collections">
        <div className="w-10p bg-dashback-100">
          <div className="bg-green-like-100 my-4 py-2 w-9p mx-auto rounded-sideicon">
            <p className="text-center text-white font-light">Oyelowo Emanuel</p>
          </div>
          <div className="w-6p mx-auto h-dw flex justify-center items-center rounded-sideicon gradi">
            <h2 className="text-center text-5xl font-bold text-white">R</h2>
          </div>
          <div>
            <p className="text-center text-sm mb-3">
              <span>
                <b>Quiz Pin</b>
              </span>
              <br />
              <span>12gdyyh</span>
            </p>
          </div>
          <div className="border border-line rounded-sideicon flex justify-between items-center px-2 py-1 w-9p mx-auto">
            <div>
              <div className="flex justify-center bg-green-like-100 shadow-lg rounded-sideicon py-2 px-3">
                <SlPlus className="text-white" />
              </div>
            </div>
            <div>
              <div className="flex justify-center bg-green-like-100 shadow-lg rounded-sideicon py-2 px-3">
                <SlTrash className="text-white" />
              </div>
            </div>
            <div>
              <div className="flex justify-center bg-green-like-100 shadow-lg rounded-sideicon py-2 px-3">
                <SlPeople className="text-white" />
              </div>
            </div>
            <div>
              <div className="flex justify-center bg-green-like-100 shadow-lg rounded-sideicon py-2 px-3">
                <SlBookOpen className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCollection;
