import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
const AdminLogin = () => {
  const [password, setPassword] = useState("");
  return (
    <div className="w-10p h-10p fixed top-0 flex justify-center items-center">
      <div className="w-dimageSize">
        <div className="w-10p flex justify-center py-2">
          <Logo />
        </div>

        <div className="my-3">
          <p>UserName</p>
          <input
            type="text"
            className="h-10 w-10p rounded-sideicon border border-inputLine focus:outline-green-like-100"
          />
        </div>
        <div className="my-3">
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 w-10p rounded-sideicon border border-inputLine focus:outline-green-like-100"
          />
        </div>
        <div className="w-10p">
          <button className="bg-green-like-100 w-10p py-3 text-white rounded-sideicon">
            Signup
          </button>
        </div>
        <div className="w-10p flex justify-between py-2 items-center">
          <p>Don't have an account?</p>
          <Link to="/admin/register" className="text-green-like-100">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
