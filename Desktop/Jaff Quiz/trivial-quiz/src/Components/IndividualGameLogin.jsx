import Logo from "./Logo";
import { FaAngleRight } from "react-icons/fa";
const IndividualGameLogin = () => {
  return (
    <div className="w-10p h-10p fixed top-0 flex justify-center items-center">
      <div className="w-dimageSize">
        <div className="w-10p flex justify-center my-3">
          <Logo />
        </div>
        <div className="w-8p bg-green-like-100 rounded-sideicon mx-auto  py-2">
          <p className="text-center text-white">Enter Game Pin</p>
        </div>
        <div className="w-10p flex justify-center">
          <input
            type="text"
            className="w-8p h-8 border border-green-like-100 rounded-sideicon text-center text-2xl font-bold text-green-like-100 focus:outline-green-like-100"
          />
        </div>
        <div className="w-10p flex justify-center my-3">
          <button
            className="h-7 w-7 bg-green-like-100 flex justify-center items-center"
            style={{ borderRadius: "48px" }}
          >
            <FaAngleRight className="text-5xl text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndividualGameLogin;
