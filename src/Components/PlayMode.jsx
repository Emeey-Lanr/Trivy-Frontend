import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const PlayMode = () => {
    const navigate  = useNavigate()
  return (
    <div className="w-10p h-10p fixed top-0 flex justify-center items-center bg-l_bold">
      <div className="w-input createmodalwidth:w-9p">
        <div className="w-9p mx-auto bg-green-like-100 rounded-sideicon">
          <button className="w-10p h-6 text-white" onClick={() => navigate("/play/adminlogin")}>
            Admin
          </button>
        </div>
        <div className="w-9p mx-auto  bg-green-like-100 rounded-sideicon my-2">
          <button className="w-10p h-6  text-white" onClick={() => navigate("/play/userlogin")}>
            Player
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayMode