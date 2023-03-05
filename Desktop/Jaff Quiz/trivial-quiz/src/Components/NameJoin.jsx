import Logo from "./Logo";
import { SlCloudUpload } from "react-icons/sl";
import { FaAngleRight } from "react-icons/fa";
import { appContext } from "../App";
import { useContext, useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import AlertModal from "./AlertModal";
import { useNavigate } from "react-router-dom";
import "../styles/game.css";
import beset from "../Images/bestStudent.jpg"
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
          console.log(result.data);
          setQuizId(result.data.userDetail.quizID);
          setAdminId(result.data.userDetail.adminId);
          setAdminStatus(false);
          setSubjectToBeDone(result.data.userDetail.subjectToBeDone);
        } else {
          navigate("/play/userlogin")
        }
      });
  }, []);

  const uploadImgEndPoint = `${gameEndPoint}/uploadPlayerImg`;
  const uploadImg = (e) => {
    console.log(e.target.files[0]);
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
            setAlertModalStatus(true);
            setAlertMessage(result.data.message) 
            setTimeout(() => {
              setLoading("")
               setAlertModalStatus(false);
               setAlertMessage(""); 
            },1000)
          }
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
    schoolName:schoolName
  };
  const ifErrorFunction = (a, b, c, d) => {
     setAlertModalStatus(a);
     setAlertMessage(b);
     setTimeout(() => {
       setAlertMessage(c);
       setAlertModalStatus(d);
     }, 700);
  }
  const fromBtn = () => {
    setFormDone(2)
  }
  const proceedBtn = () => {
    if (imgUrl === "") {
      ifErrorFunction(true, "Can't proceed no image uplaoded")
    } else if (schoolName === "" || name === "") {
      ifErrorFunction(true, "fill in input to proceed")
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
           ifErrorFunction(true, result.data.message, "", false);
        }
      });
    
  };

  return (
    <div className="w-10p h-10p fixed top-0 flex  justify-center items-center">
      <div className="w-dimageSize">
        <div className="w-10p flex justify-center my-2">
          <Logo />
        </div>

        {formDone === 1 && (
          <div>
            <div className="imgdiv">
              <img src={imgUrl} alt="" />
            </div>
            <div className="nameBox">
              <div className="name ">
                <p>{name}</p>
              </div>
            </div>
            <div className="w-10p flex justify-center my-3">
              <button  disabled={spin !== "" }
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
                  className={`text-5xl text-green-like-100 ${loading}`}
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
              <p className="text-center">{ imgUrl === ""  ? "Upload your Image": "Image Uploaded"}</p>
            </div>
            <div className="w-10p">
              <div className="py-2 ">
                <p className=" text-chartbg">Enter School Name</p>
              </div>
              <input
                onChange={(e) => setSchoolName(e.target.value)}
                type="text"
                className="w-10p h-6 border border-green-like-100 text-green-like-100  text-1xl focus:outline-green-like-100"
              />
            </div>
            <div className="w-10p">
              <div className=" py-2">
                <p className=" text-chatbg">Enter Your Name</p>
              </div>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="w-10p h-6 border border-green-like-100 text-green-like-100  text-1xl focus:outline-green-like-100"
              />
            </div>
          </div>
        )}
        <div className="w-8p my-3 mx-auto flex justify-between">
          <button
            onClick={() => fromBtn()}
            className={`py-3 px-5 rounded-sideicon  ${
              formDone === 2
                ? `bg-dashback-200 text-chartbg`
                : `bg-green-like-100 text-white`
            }`}
          >
            Register
          </button>
          <button
            onClick={() => proceedBtn()}
            className={`py-3 px-5 rounded-sideicon  ${
              formDone === 1
                ? `bg-dashback-200 text-chartbg`
                : `bg-green-like-100 text-white`
            }`}
          >
            Proceed
          </button>
        </div>
      </div>
      <AlertModal />
    </div>
  );
};

export default NameJoin;
