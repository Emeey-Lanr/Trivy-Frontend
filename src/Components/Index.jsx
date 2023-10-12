import React, { useEffect, useContext, useState } from 'react'
import logo from "../Images/Logo.png"
import { useNavigate, Link } from 'react-router-dom'
import "../styles/index.css"

import Index_Navigation from './Index_Navigation'


import { appContext } from "../App"

import linkedin from "../Images/mdi_linkedin.png"
import twitter from "../Images/ri_twitter-x-line.png"
import github from "../Images/bi_github.png"

import {GiHamburgerMenu} from "react-icons/gi"

const Index = () => {

  const navigate = useNavigate()

    const { mobileNav, setMobileNav } = useContext(appContext);
  const [faq1, setFaq1] = useState(false)
  const [faq2, setFaq2] = useState(false)
  const [faq3, setFaq3] = useState(false);
    const [faq4, setFaq4] = useState(false);
  return (
    <div className="index_div bg-l_bold">
      {/* Hero Section */}
      <div className=" w-10p py-2 bg-l_bold">
        {/* Navbar */}

        <div className="w-9p mx-auto flex justify-between items-center ">
          <div>
            <img className="w-5" src={logo} alt="" />
          </div>
          <div className="flex items-center smm:hidden">
            <Link
              className="text-white font-inter mx-7 text-sm"
              to="/admin/register"
            >
              Get Started
            </Link>
            <Link className="text-white mx-7 text-sm" to="/search">
              Result
            </Link>
          </div>
          <div className="smm:hidden">
            <button
              onClick={() => navigate("/admin/login")}
              className="border  h-6 w-13 text-white"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/play/mode")}
              className="w-13 h-6 bg-white rounded-sm"
            >
              Play
            </button>
          </div>
          <div className="hidden smm:block">
            <button
              onClick={() => setMobileNav(true)}
              className="w-8 h-8 flex justify-center items-center bg-white rounded-l_btn"
            >
              <GiHamburgerMenu className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="header_text_div mx-auto mt-5">
          <h1 className="header_text text-center text-white  font-light">
            WANT TO CREATE YOUR <span className="exam_back">EXAM </span>{" "}
            <br className="break" />
            <span className="or">OR</span>
            <span className="quiz_back font-bold">
              <span>QUIZ</span>
            </span>{" "}
            <br className="break2" />
            IN REAL TIME ?
          </h1>
        </div>

        <div className="hero_sub_text mt-4 w-5p  mx-auto">
          <p className="text-center text-white  createmodal:px-2">
            With <span>Triviy</span> your dreams become reality. The features
            available and embbeded <br className="sub_text_br1" /> in it, allow
            you to get everything done with ease. An answer to your puzzled{" "}
            <br className="sub_text_br2" /> question is <span>Trivy</span>{" "}
          </p>
        </div>
        <div className="w-10p mt-4 flex justify-center items-center">
          <button
            onClick={() => navigate("/admin/register")}
            className="btn_start text-bold rounded-l_btn h-7 bg-l_neutral text-white"
          >
            Start Now
          </button>
        </div>
      </div>

      {/* ===== */}
      <div className="w-10p h-9 mb-5 bg-l_bold">
        <div className="w-8p h-12 mx-auto flex justify-center items-center">
          <a
            className="px-3 flex justify-center items-center"
            href="https://github.com/Emeey-Lanr"
          >
            <img className="w-4 h-4 rounded-sideicon" src={github} alt="" />
          </a>
          <a
            className="px-3 flex justify-center items-center"
            href="https://twitter.com/Emeey_Lanr"
          >
            <img className="w-4 h-4" src={twitter} alt="" />
          </a>
          <a
            className="px-3 flex justify-center items-center"
            href="https://www.linkedin.com/in/emmanuel-oyelowo-b2363a23a/"
          >
            <img className="w-4 h-4" src={linkedin} alt="" />
          </a>
        </div>
      </div>
      <Index_Navigation logo={logo} />
    </div>
  );
}

export default Index