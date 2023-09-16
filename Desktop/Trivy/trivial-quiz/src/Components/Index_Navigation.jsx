import { FaTimes } from "react-icons/fa";
import { appContext } from "../App"
import { useContext } from "react"
const Index_Navigation = () => {
    const { mobileNav, setMobileNav } = useContext(appContext);
    return (
      <>
        {mobileNav && (
          <div className="w-10p h-10p fixed top-0 bg-dashback-100">
            <div>
                        <button onClick={()=>setMobileNav(false)}>
                <FaTimes/>
                </button>
            </div>
          </div>
        )}
      </>
    );
}

export default Index_Navigation