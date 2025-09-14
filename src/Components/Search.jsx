import { useContext, useState } from "react";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import noImg from "../Images/noImage.png";
import { FaLock } from "react-icons/fa";
import { appContext } from "../App";
import axios from "axios";
import Result from "./Result";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AlertModal from "./AlertModal";
const Search = () => {
  let navigate = useNavigate();
  const { searchEndPoint, setAlertModalStatus,  setAlertMessage } =
    useContext(appContext);
  const [searchStatus, setSearchStatus] = useState();
  const [infoData, setInfoData] = useState("");
  const [adminFound, setAdminFound] = useState([]);
  const lookForAdminEndPoint = `${searchEndPoint}/findAdmin`;
  const [buttonSwitch, setButtonSwitch] = useState(1);
  const [bringSearchInput, setBringSearchInput] = useState(false);
  const [resultPage, setResultPage] = useState(false);

  const bringSearchInputBtn = () => {
    setBringSearchInput(true);
  };

  const handleError = (message) => {
     setAlertMessage();
     setAlertModalStatus(true);
     setTimeout(() => {
       setAlertMessage("");
       setAlertModalStatus(false);
     }, 2000);
  }
  const searchForUser = () => {
    if (infoData !== "") {
      setButtonSwitch(2);

      axios.post(lookForAdminEndPoint, { name: infoData }).then((result) => {
        if (result.data.status) {
          setAdminFound(result.data.userFound);
          setResultPage(true);
          setButtonSwitch(1);
        } else {
          setAdminFound([]);
          setButtonSwitch(1);
          setResultPage(true);
        }
      }).catch((err) => {
        handleError(err.response.data.message)
      });
    } else {
     handleError("Enter a name");
    }
  };
  const navigateToCheckEndPoint = `${searchEndPoint}/saveAdminId`;
  const findAdminBtn = (adminId, id) => {
    axios.post(navigateToCheckEndPoint, { adminId: adminId }).then((result) => {
      if (result.data.status) {
        localStorage.xxxxxxxxxx = result.data.identification
        navigate("/result")
        
      } else {
         handleError("Enter a name");
      }
    }).catch((err) => {
         handleError(err.response.data.message);
    });
  };
  return (
    <>
      <div className="w-10p h-10p fixed top-0 flex justify-center items-center  mx-auto">
        <div>
          <button
            onClick={() => bringSearchInputBtn()}
            className="w-7 h-7 flex justify-center items-center bg-green-like-100"
          >
            <FaSearch className="text-white" />
          </button>
        </div>
      </div>
      {bringSearchInput && (
        <div className="w-10p h-10p bg-modalback fixed top-0 flex justify-center items-center">
          <div className="w-10p">
            <div
              style={{ border: "2px solid #03a26c" }}
              className="w-4p mx-auto flex justify-center items-center bg-green-like-100 border-green-like-100 quizQuestion:w-8p"
            >
              <input
                type="text"
                placeholder="Enter Organization Username"
                className="w-9p h-7  focus:outline-0 createmodal:w-8p"
                onChange={(e) => setInfoData(e.target.value)}
              />
              <button
                onClick={() => searchForUser()}
                className="h-7 w-1p flex pl-2 justify-center items-center bg-green-like-100 createmodal:w-2p"
              >
                {buttonSwitch === 1 ? (
                  <FaSearch className="text-white" />
                ) : (
                  <FaSpinner className="text-white spin" />
                )}
              </button>
            </div>

            {resultPage && (
              <div className="w-4p mt-3 mx-auto overflow-y-auto h-dbh bg-white createmodal:w-10p">
                {adminFound.length < 1 ? (
                  <div className="h-10 flex justify-center items-center">
                    <p className="text-center text-green-like-100">
                      {" "}
                      No Result Found
                    </p>
                  </div>
                ) : (
                  adminFound.map((content, id) => (
                    <div className="w-8p px-2 py-1 rounded-sideicon  mx-auto flex justify-between items-center bg-white shadow-lg">
                      <div className="flex items-center bg-green-like-100 px-3 py-1 rounded-sideicon">
                        <div
                          className="w-8 h-8 flex justify-center items-center"
                          style={{
                            border: "3px solid white",
                            borderRadius: "50px",
                          }}
                        >
                          <img
                            src={
                              content.adminImg !== "" ? content.adminImg : noImg
                            }
                            className="h-6 w-6"
                            style={{ borderRadius: "30px" }}
                            alt=""
                          />
                        </div>
                        <div>
                          <div className="border-l-2 ml-2 px-2 border-white">
                            <p className="text-white">
                              {content.adminUserName}
                            </p>
                          </div>
                        </div>
                      </div>
                      {content.locked ? (
                        <div>
                          <input
                            type="text"
                            className="border border-green-like-100 outline-green-like-100"
                          />
                          <button>
                            <FaLock className="text-green-like-100" />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <button onClick={() => findAdminBtn(content._id, id)}>
                            <FaArrowRight className="text-green-like-100" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <AlertModal/>
    </>
  );
};

export default Search;
