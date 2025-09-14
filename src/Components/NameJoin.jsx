import Logo from "./Logo";
import { SlCloudUpload } from "react-icons/sl";
import { FaAngleRight, FaArrowLeft } from "react-icons/fa";
import { appContext } from "../App";
import { useContext, useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import AlertModal from "./AlertModal";
import { useNavigate } from "react-router-dom";
import "../styles/game.css";
import logo from "../Images/Logo.png";
const NameJoin = () => {
  const { gameEndPoint, setAlertModalStatus, setAlertMessage } =
    useContext(appContext);
    let navigate = useNavigate()
  const [name, setName] = useState("");
  const [schoolName, setSchoolName] = useState("")
  const [quizId, setQuizId] = useState("");
  const [adminId, setAdminId] = useState("");
  const [imgUrl, setImageUrl] = useState("");
  const [adminStatus, setAdminStatus] = useState("");
  const [subjectToBeDone, setSubjectToBeDone] = useState("");
  const [loading, setLoading] = useState("")
  const [formDone, setFormDone] = useState("")
  const [spin, setSpin] = useState("")

  const getFormerDetailEndPoint = `${gameEndPoint}/verifyPassToken`;
  useEffect(() => {
    setFormDone(2)
    axios
      .get(getFormerDetailEndPoint, {
        headers: {
          Authorization: `bearer ${localStorage.pass}`,
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        if (result.data.status) {
          setQuizId(result.data.userDetail.quizID);
          setAdminId(result.data.userDetail.adminId);
          setAdminStatus(false);
          setSubjectToBeDone(result.data.userDetail.subjectToBeDone);
        } else {
          navigate("/play/userlogin")
        }
      }).catch(() => {
        navigate("/play/userlogin");
      });
  }, []);

  const uploadImgEndPoint = `${gameEndPoint}/uploadPlayerImg`;

   const ifErrorFunction = (message, time) => {
     setAlertModalStatus(true);
     setAlertMessage(message);
     setTimeout(() => {
       setLoading("");
       setAlertMessage("");
       setAlertModalStatus(false);
     }, time);
  };
  
  const uploadImg = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      setLoading("loading")
      
      axios
        .post(uploadImgEndPoint, { imageUrl: reader.result })
        .then((result) => {
          if (result.data.status) {
            setImageUrl(result.data.imgUrl);
            setLoading("")
          } else {
          
            ifErrorFunction(result.data.message, 1000) 
            
          }
        }).catch((err) => {
          ifErrorFunction(err.response.data.message, 1000)
        });
    };
  };
  const playerSchema = {
    adminStatus: adminStatus,
    quizId: quizId,
    adminId: adminId,
    playerName: name,
    playerImage: imgUrl,
    subjectToBeDone: subjectToBeDone,
    totalScore: 0,
    schoolName: schoolName
  };
 
  const fromBtn = () => {
    setFormDone(2)
  }
  const proceedBtn = () => {
    if (imgUrl === "") {
      ifErrorFunction( "Can't proceed no image uploaded", 700)
    } else if (schoolName === "" || name === "") {
      ifErrorFunction("fill in input to proceed", 700)
    } else if (imgUrl !== "" && schoolName !== "" && name !== "") {
      setFormDone(1)
    }
  }
  const navigateToJoinEndPoint = `${gameEndPoint}/savePlayerDetails`;
  const joinGame = () => {
    setSpin("spin")
      axios.post(navigateToJoinEndPoint, playerSchema).then((result) => {
        if (result.data.status) {
          localStorage.adminIdentification = result.data.playerToken;
          navigate("/play")
          setSpin("")
        } else {
          setSpin("")
           ifErrorFunction(result.data.message, 700);
        }
      }).catch((err)=>{
        ifErrorFunction(err.response.data.message, 700)
      });
    
  };

  return (
    <div className="w-10p h-10p fixed top-0 flex  justify-center items-center">
      <div className="sign_Up">
        <div className="logo_name">
          <h2 className="text-l_bold">
            <span>T</span> <br />
            <span>R</span> <br />
            <span>I</span> <br />
            <span>V</span> <br />
            <span>Y</span> <br />
          </h2>
        </div>
        <div className="bg-l_bold sign_up_div">
          <div className="w-dimageSize createmodal:w-9p">
            {formDone === 1 && <div>
              <button onClick={() => setFormDone(2)}>
                <FaArrowLeft className="text-white" />
              </button>
            </div>}
            <div className="w-10p flex justify-center my-2">
              <img src={logo} className="h-5 w-5" alt="" />
            </div>

            {formDone === 1 && (
              <div>
                <div className="imgdiv">
                  <img src={imgUrl} alt="" />
                </div>
                <div className="nameBox">
                  <div className="name">
                    <p className="ml-4 py-2">{name}</p>
                  </div>
                </div>
                <div className="w-10p flex justify-center my-3">
                  <button
                    disabled={spin !== ""}
                    className={`h-7 w-7 bg-green-like-100 flex justify-center items-center ${spin}`}
                    style={{ borderRadius: "48px" }}
                    onClick={() => joinGame()}
                  >
                    <FaAngleRight className="text-5xl text-white" />
                  </button>
                </div>
              </div>
            )}

            {formDone === 2 && (
              <div className="w-10p">
                <div className="w-10p flex justify-center py-2">
                  <label id="image">
                    <SlCloudUpload
                      className={`text-5xl text-white ${loading}`}
                    />
                    <input
                      type="file"
                      id="image"
                      hidden
                      onChange={(e) => uploadImg(e)}
                    />
                  </label>
                </div>
                <div className="rounded-sideicon">
                  <p></p>
                  <p className="text-center text-white">
                    {imgUrl === "" ? "Upload your Image" : "Image Uploaded"}
                  </p>
                </div>
                <div className="my-3">
                  <input
                    type="text"
                    placeholder="School Name"
                    onChange={(e) => setSchoolName(e.target.value)}
                    className=" placeholder-shown:text-xs placeholder:pl-3 h-10 w-10p rounded-sideicon border border-inputLine focus:outline-green-like-100"
                  />
                </div>
                <div className="my-3">
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    className="placeholder-shown:text-xs placeholder:pl-3 h-10 w-10p  rounded-sideicon border border-inputLine focus:outline-green-like-100"
                  />
                </div>
              </div>
            )}
            <div className="my-3 block">
              {/* <button
                onClick={() => fromBtn()}
                className={`py-3 px-5 w-10p mb-4 rounded-sideicon  ${
                  formDone === 2
                    ? `bg-dashback-200 text-chartbg`
                    : `bg-green-like-100 text-white`
                }`}
              >
                Register
              </button> */}
              {formDone === 2 && (
                <button
                  onClick={() => proceedBtn()}
                  className={`py-3 px-5 w-10p rounded-sideicon  ${
                    formDone === 1
                      ? `bg-dashback-200 text-chartbg`
                      : `bg-green-like-100 text-white`
                  }`}
                >
                  Proceed
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <AlertModal />
    </div>
  );
};

export default NameJoin;
