import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { appContext } from "../App";
import { useNavigate } from "react-router-dom";
const VerifyEmail = () => {
  let navigate = useNavigate();
  const { adminEndPoint } = useContext(appContext);
  let { id } = useParams();
  const [verifyMessage, setVerifyMessage] = useState("");
  const adminVerifyEndPoint = `${adminEndPoint}/verifyEmail`;
  useEffect(() => {
    setVerifyMessage("Verifying...");
    axios
      .get(adminVerifyEndPoint, {
        headers: {
          "Authorization": `bearer ${id}`,
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        if (result.data.status) {
          localStorage.adminId =result.data.adminId
          navigate("/admindashboard");
        } else {
          setVerifyMessage(result.data.message);
        }
      });
  }, []);
  return (
    <div className="w-10p h-10p fixed top-0 flex justify-center items-center">
      <div>
        <div className="px-5 py-2 mx-auto rounded-sideicon bg-green-like-100">
          <p className="text-center text-white">{verifyMessage}</p>
        </div>
        <div className="flex justify-center items-center my-6">
          <Oval
            height={100}
            width={100}
            color="#03a26c"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
