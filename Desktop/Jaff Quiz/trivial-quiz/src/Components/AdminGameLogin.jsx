import Logo from "./Logo";
import axios from "axios";
import { appContext } from "../App";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const AdminGameLogin = () => {
  let navigate = useNavigate();
  const { gameEndPoint } = useContext(appContext);
  const [adminUserName, setAdminUserName] = useState("");
  const [gameId, setGameId] = useState("");

  const adimGameLoginEndPoint = `${gameEndPoint}/adminlogin`;
  const adminLoginSchema = {
    username: adminUserName,
    gameid: gameId,
  };
  const login = () => {
    if (adminUserName === "" || gameId === "") {
    } else {
      axios.post(adimGameLoginEndPoint, adminLoginSchema).then((result) => {
        if (result.data.status) {
          localStorage.adminIdentification = result.data.adminStatusId;
          navigate("/play");
        }
      });
    }
  };
  return (
    <div className="w-10p h-10p fixed top-0 flex justify-center items-center">
      <div>
        <div className="w-10p flex justify-center">
          <Logo />
        </div>
        <div className="py-3">
          <p className=" text-center text-5xl font-serif text-green-like-100">
            Admin
          </p>
        </div>
        <div>
          <p>Username</p>
          <div>
            <input
              type="text"
              onChange={(e) => setAdminUserName(e.target.value)}
              className=" text-green-like-100 font-bold h-6 border border-inputLine w-input rounded-sideicon focus:outline-green-like-100"
            />
          </div>
        </div>
        <div className="my-2">
          <p>Game id</p>
          <div>
            <input
              type="password"
              onChange={(e) => setGameId(e.target.value)}
              className=" text-green-like-100 h-6 border border-inputLine w-input rounded-sideicon focus:outline-green-like-100"
            />
          </div>
        </div>
        <div>
          <button
            className="text-center text-white w-input py-3 rounded-sideicon  bg-green-like-100"
            onClick={() => login()}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminGameLogin;
