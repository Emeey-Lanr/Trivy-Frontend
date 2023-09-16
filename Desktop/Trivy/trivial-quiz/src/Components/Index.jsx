import React, { useEffect, useContext } from 'react'
import logo from "../Images/Logo.png"
import { useNavigate, Link } from 'react-router-dom'
import "../styles/index.css"
import heroImg from "../Images/Image 1.png"
import Index_Navigation from './Index_Navigation'
import { FaHamburger } from 'react-icons/fa'
import { appContext } from "../App"
const Index = () => {
    const { mobileNav, setMobileNav } = useContext(appContext);
  return (
    <div>
      {/* Hero Section */}
      <div className="w-10p bg-l_bold">
        {/* Navbar */}

        <div className="w-9p py-4 mx-auto flex justify-between items-center ">
          <div>
            <img className="w-5" src={logo} alt="" />
          </div>
          <div className="flex items-center sm:hidden">
            <Link className="text-white font-inter mx-7 text-sm" to="/">
              Get Started
            </Link>
            <Link className="text-white mx-7 text-sm" to="/">
              Preview
            </Link>
          </div>
          <div className='sm:hidden'>
            <button className="w-13 h-6 bg-white rounded-sm">Login</button>
          </div>
          <div  className='hidden sm:block'>
            <button onClick={()=>setMobileNav(true)}  className="w-8 h-8 flex justify-center items-center bg-white rounded-l_btn"> 
              <FaHamburger/>
            </button>
          </div>
        </div>
        <div className="header_text_div mx-auto mt-5">
          <h1 className="header_text text-center text-white  font-light">
            WANT TO CREATE YOUR <span className="exam_back">EXAM </span>  <br className='break'/>
            <span className="or">OR</span>
            <span className="quiz_back font-bold">
              <span>QUIZ</span>
            </span> <br className="break2"/>
            IN REAL TIME ?
          </h1>
        </div>

        <div className="hero_sub_text mt-4 w-5p  mx-auto">
          <p className="text-center text-white ">
            With <span>Triviy</span> your dreams become reality. The features
            available and embbeded <br className='sub_text_br1'/> in it, allow you to get everything done with
            ease. An answer to your puzzled <br className='sub_text_br2'/> question 
            is <span>Trivy</span>{" "}
          </p>
        </div>
        <div className="w-10p mt-4 flex justify-center items-center">
          <button className="w-dbh text-bold rounded-l_btn h-7 bg-l_neutral text-white">
            Start Now
          </button>
         
        </div>
        <div className='flex justify-center mt-12 pb-5'>
          <img src={heroImg} className='w-8p' alt="" />
        </div>
      </div>
      {/* Content 1 */}
      <div className='w-10p flex justify-center items-center'>
        <div>

   
        </div>

      </div>
    <Index_Navigation/>
    </div>
  );
}

export default Index