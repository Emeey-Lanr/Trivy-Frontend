import React, { useEffect, useContext, useState } from 'react'
import logo from "../Images/Logo.png"
import { useNavigate, Link } from 'react-router-dom'
import "../styles/index.css"
import heroImg from "../Images/Image 1.png"
import content2Img from "../Images/image 2.png"
import C_Time from "../Images/time.png"

import security from "../Images/image 3.png"
import Index_Navigation from './Index_Navigation'

import star1Svg from "../Images/Star 1.svg"
import star2Svg from "../Images/Star 10.svg"
import { FaHamburger, FaStar } from 'react-icons/fa'
import { appContext } from "../App"
import { SlEye, SlStar } from 'react-icons/sl'
import linkedin from "../Images/mdi_linkedin.png"
import twitter from "../Images/ri_twitter-x-line.png"
import github from "../Images/bi_github.png"
import { AiOutlineMenu } from 'react-icons/ai'

const Index = () => {
  const navigate = useNavigate()

    const { mobileNav, setMobileNav } = useContext(appContext);
  const [faq1, setFaq1] = useState(false)
  const [faq2, setFaq2] = useState(false)
  const [faq3, setFaq3] = useState(false);
    const [faq4, setFaq4] = useState(false);
  return (
    <div style={{ background: "#fafafa" }}>
      {/* Hero Section */}
      <div className="w-10p bg-l_bold">
        {/* Navbar */}

        <div className="w-9p py-4 mx-auto flex justify-between items-center ">
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
              <FaHamburger />
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
          <p className="text-center text-white ">
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
        <div className="flex justify-center mt-12 pb-5">
          <img src={heroImg} className="hero_img" alt="" />
        </div>
      </div>
      {/* Content 1 */}
      <div className="w-10p flex justify-center items-center">
        <div className="content_2 flex justify-center items-center mt-6">
          <div className="content_2_text mb-6">
            <h2 className="text-l_bold leading-10 text-center uppercase">
              Collection
            </h2>
            <p className="text_2 text-center leading-6 text-l_bold text-sm">
              Your can create your collection based on
              <br className="content_2_break" /> intellectual and comprehesive
              familiarity
            </p>
            <p className="text_3 text-center leading-10 text-l_neutral text-xs">
              You can create for either
            </p>
            <div className="w-10p mt-3 flex justify-center items-center">
              <button className="text-white bg-l_bold">Primary</button>
            </div>
            <p className="text-center font-semibold text-l_bold text-lg my-2">
              OR
            </p>
            <div className="w-10p flex justify-center items-center">
              <button className="text-white bg-l_bold">Secondary</button>
            </div>
          </div>
          <div className="content_2_Img_div flex justify-center items-center">
            <img src={content2Img} alt="" />
          </div>
        </div>
      </div>
      {/* =========== */}
      <div className="time_p_div">
        <div className="time_div_img bg-l_bold">
          <img src={C_Time} alt="" />
        </div>

        <div className="time_text mt-13">
          <h2 className="text-center  text-l_bold ">
            Everything Happens <br />
            <span className="text-white">In Real Time </span>
          </h2>
          <div className="time_text_p">
            <div className="mx-auto">
              <p className="time_p_1">
                The effect of your click is felt and seen by every soul
                connected
              </p>
              <p className="time_p_2 leading-6">
                <span>Questions</span>, <span>Time</span>, <span>Result</span>{" "}
                <span>Ranking</span> are displayed to everbody Instantly
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ============ */}
      <div className="mode mx-auto bg-l_bold">
        <div className="mode_trivy_div pb-12 flex justify-center items-center bg-l_bold">
          <div className="w-9p">
            <div className="mode_trivy">
              <h2 className="text-white ">
                Trivy <br />
                Mode
              </h2>
            </div>
            <div className="mode_trivy_back"></div>
          </div>
        </div>
        <div className="mode_text">
          <div>
            <h2 className="text-center text-l_bold" text-l_bold>
              ADMIN
            </h2>

            <p className="text-center text-l_bold">
              Admin can decide on the decision of the quiz or exam by being able
              to decide the time that goes for each question
            </p>
          </div>
          <div>
            <h2 className="text-center text-l_bold">SELF</h2>
            <p className="text-center text-l_bold">
              Allows users to submit when they are done before the time elapses.
              Trivy gives that priviledge
            </p>
          </div>
          <div>
            <h2 className="text-center text-l_bold">AUTO</h2>
            <p className="text-center text-l_bold">
              Admin and users don't have control on the submit, It submits 
              automically on the countdown of the time
            </p>
          </div>
        </div>
      </div>
      {/* ================== */}
      <div className="mt-13">
        <div className="security_img_div w-10p flex justify-center items-center">
          <img src={security} alt="" />
        </div>
        <div className="security_text">
          <h1 className="text-center">RESULT ACCESSIBILITY</h1>
          <p className="text-center security_text_1st_P  capitalize text-l_bold">
            Trivy gives you the privledge to have an access key over quiz or
            exam result <br className="security_break" /> You can decide to add
            an access key or not.
          </p>
          <div className="mt-5">
            <div className="point mb-1 flex justify-center items-center">
              <div className="h-3 w-3 border rounded-l_btn bg-l_bold"></div>
              <p className="px-1 security_text_2nd_P text-l_bold">
               Student can view result via the result platform via the
                access key
              </p>
            </div>

            <div className="point flex justify-center items-center">
              <div className="h-3 w-3 border rounded-l_btn bg-l_bold"></div>
              <p className="px-1 security_text_3rd_P">
                If off, the result is open to everyone to view
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ================= */}
      <div className="testi mt-12 mb-6">
        <div className="testimony">
          <div className="stars">
            <div className="star_div_1">
              <span className="flex justify-center items-center">
                <img src={star1Svg} alt="" />
              </span>
              <span className="flex justify-center items-center">
                <img src={star1Svg} alt="" />
              </span>
              <span className="flex justify-center items-center">
                <img src={star1Svg} alt="" />
              </span>
            </div>

            <div className="star_div_2">
              <span className="flex justify-center items-center">
                <img src={star1Svg} alt="" />
              </span>
              <span className="flex justify-center items-center">
                <img src={star1Svg} alt="" />
              </span>
            </div>
            <div className="my-5 w-8p mx-auto bg-l_bold border-2 border-black">
              <h2 className="text-white text-center py-1">Excellent</h2>
            </div>
            <div className="user_img flex justify-center items-center">
              <img
                className="h-5 w-5"
                style={{ borderRadius: "40px" }}
                src={heroImg}
                alt=""
              />
              <h3 className="uppercase px-2 text-l_bold">Oyelowo Emmanuel</h3>
            </div>
          </div>
        </div>
        <div className="testimony">
          <div className="stars">
            <div className="star_div_1">
              <span className="flex justify-center items-center">
                <img src={star1Svg} alt="" />
              </span>
              <span className="flex justify-center items-center">
                <img src={star1Svg} alt="" />
              </span>
              <span className="flex justify-center items-center">
                <img src={star1Svg} alt="" />
              </span>
            </div>

            <div className="star_div_2">
              <span className="flex justify-center items-center">
                <img src={star1Svg} alt="" />
              </span>
              <span className="flex justify-center items-center">
                <img src={star2Svg} alt="" />
              </span>
            </div>
            <div className="my-5 w-8p mx-auto bg-l_bold border-2 border-black">
              <h2 className="text-center text-white py-1">Very Good</h2>
            </div>
            <div className="user_img flex justify-center items-center">
              <img
                className="h-5 w-5"
                style={{ borderRadius: "40px" }}
                src={heroImg}
                alt=""
              />
              <h3 className="uppercase px-2 text-l_bold">Oluwadara</h3>
            </div>
          </div>
        </div>
        <div className="testimony">
          <div className="stars">
            <div className="star_div_1">
              <span className="flex justify-center items-center">
                <img src={star1Svg} alt="" />
              </span>
              <span className="flex justify-center items-center">
                <img src={star1Svg} alt="" />
              </span>
              <span className="flex justify-center items-center">
                <img src={star1Svg} alt="" />
              </span>
            </div>

            <div className="star_div_2">
              <span className="flex justify-center items-center">
                <img src={star1Svg} alt="" />
              </span>
              <span className="flex justify-center items-center">
                <img src={star2Svg} alt="" />
              </span>
            </div>
            <div className="my-5 w-8p mx-auto bg-l_bold border-2 border-black">
              <h2 className="text-white text-center py-1">Very Good</h2>
            </div>
            <div className="user_img flex justify-center items-center">
              <img
                className="h-5 w-5"
                style={{ borderRadius: "40px" }}
                src={heroImg}
                alt=""
              />
              <h3 className="uppercase px-2 text-l_bold">Emeey Lanr</h3>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <h1 className="faq_h2 text-center font-serif">FAQ</h1>
        </div>
        <div>
          <div>
            <div className="fa border-b border-b-white flex  w-8p mx-auto h-10 justify-between items-center bg-l_bold">
              <p className="question_text text-white pl-4">What's Trivy</p>
              <button onClick={() => setFaq1((prev) => !prev)} className="pr-4">
                <SlEye className="text-white" />
              </button>
            </div>
            {faq1 && (
              <div className="faq_back w-7p mx-auto">
                <p className="w-8p mx-auto text-l_bold leading-8">
                  Trivy is a web application that allows you to create quiz or
                  exam in real time with a click of the start button
                </p>
              </div>
            )}
          </div>
          <div>
            <div className="fa border-b border-b-white flex  w-8p mx-auto h-10 justify-between items-center bg-l_bold">
              <p className="question_text text-white pl-4">
                How many times can an admin play a game?
              </p>
              <button onClick={() => setFaq2((prev) => !prev)} className="pr-4">
                <SlEye className="text-white" />
              </button>
            </div>
            {faq2 && (
              <div className="question_text faq_back w-7p mx-auto">
                <p className="w-8p mx-auto text-l_bold leading-8">
                  An admin can play a game created only four times, after the
                  fourth times, the quiz can't be played again
                </p>
              </div>
            )}
          </div>
          <div>
            <div className="fa border-b border-b-white flex  w-8p mx-auto h-10 justify-between items-center bg-l_bold">
              <p className="question_text text-white pl-4">
                Can student play/do a quiz/exam without an admin?
              </p>
              <button onClick={() => setFaq3((prev) => !prev)} className="pr-4">
                <SlEye className="text-white" />
              </button>
            </div>
            {faq3 && (
              <div className="faq_back w-7p mx-auto">
                <p className="w-8p mx-auto text-l_bold leading-8">
                  Without the admin logged in, the game cannot start nor can
                  they have access to log in
                </p>
              </div>
            )}
          </div>
          <div>
            <div className="fa border-b border-b-white flex  w-8p mx-auto h-10 justify-between items-center bg-l_bold">
              <p className="question_text text-white pl-4">
                How does students view their results?
              </p>
              <button onClick={() => setFaq4((prev) => !prev)} className="pr-4">
                <SlEye className="text-white" />
              </button>
            </div>
            {faq4 && (
              <div className="faq_back w-7p mx-auto">
                <p className="w-8p mx-auto text-l_bold leading-8">
                  Student search for the admin user, and if the result is not
                  locked they can have access to view it, if it's locked, they
                  will have request for result access password
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* ===== */}
      <div className="w-10p mt-13 h-9 mb-5 bg-l_bold">
        <div className="w-8p h-9 mx-auto flex justify-center items-center">
          <a
            className="px-3 flex justify-center items-center"
            href="https://github.com/Emeey-Lanr"
          >
            <img className="w-4 h-4" src={github} alt="" />
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