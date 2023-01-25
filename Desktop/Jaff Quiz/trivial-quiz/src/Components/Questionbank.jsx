import { useState } from "react";
import DashbarNav from "./DashbarNav";
import Sidebar from "./Sidebar";
const Questionbank = () => {
  
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
