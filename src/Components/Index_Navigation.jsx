import { FaTimes } from "react-icons/fa";
import { appContext } from "../App"
import { useContext } from "react"
import { Link } from "react-router-dom";
const Index_Navigation = ({logo}) => {
    const { mobileNav, setMobileNav } = useContext(appContext);
    return (
      <>
        {mobileNav && (
          <div className="w-10p h-10p fixed top-0 bg-dashback-100">
            <div className="w-9p h-8 mx-auto  flex justify-end items-end">
              <span>
                <button onClick={() => setMobileNav(false)}>
                  <FaTimes />
                </button>
              </span>
            </div>
            <div></div>
            <div className="h-8p flex justify-center items-center">
              <div>
                <span
                  style={{ borderRadius: "50px" }}
                  className="bg-l_bold h-6 w-6 flex mx-auto justify-center items-center"
                >
                  <img className="h-4 w-4" src={logo} alt="" />
                </span>
                <h2 className="text-2xl text-l_bold text-center font-semibold py-4">
                  TRIVY
                </h2>
                <Link
                  className="text-l_bold border-b border-inputLine block text-center  leading-10 text-sm  hover:bg-l_bold hover:text-white hover:rounded-sideicon px-2"
                  to="/admin/register"
                >
                  Get Started
                </Link>
                <Link
                  className="text-l_bold border-b border-inputLine  block text-center  leading-10 text-sm  hover:bg-l_bold hover:text-white hover:rounded-sideicon  px-2"
                  to="/admin/register"
                >
                  Preview
                </Link>
                <Link
                  className="text-l_bold border-b border-inputLine  block text-center  leading-10 text-sm  hover:bg-l_bold hover:text-white hover:rounded-sideicon   px-2"
                  to="/admin/login"
                >
                  Login
                </Link>
                <Link
                  className="text-l_bold border-b border-inputLine  block text-center leading-10  text-sm  hover:bg-l_bold hover:text-white hover:rounded-sideicon  px-2"
                  to="/play/mode"
                >
                  Play
                </Link>
              </div>
            </div>
          </div>
        )}
      </>
    );
}

export default Index_Navigation