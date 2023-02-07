import Logo from "./Logo";
import { SlCloudUpload } from "react-icons/sl";
import { FaAngleRight } from "react-icons/fa";
import { appContext } from "../App";
import { useContext, useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import AlertModal from "./AlertModal";
import { useNavigate } from "react-router-dom";
const NameJoin = () => {
  const { gameEndPoint, setAlertModalStatus, setAlertMessage } =
    useContext(appContext);
    let navigate = useNavigate()
  const [name, setName] = useState("");
  const [quizId, setQuizId] = useState("");
  const [adminId, setAdminId] = useState("");
  const [imgUrl, setImageUrl] = useState("");
  const [adminStatus, setAdminStatus] = useState("");
  const [subjectToBeDone, setSubjectToBeDone] = useState("");

  const getFormerDetailEndPoint = `${gameEndPoint}/verifyPassToken`;
  useEffect(() => {
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
        }
      });
  }, []);

  const uploadImgEndPoint = `${gameEndPoint}/uploadPlayerImg`;
  const uploadImg = (e) => {
    console.log(e.target.files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      axios
        .post(uploadImgEndPoint, { imageUrl: reader.result })
        .then((result) => {
          setImageUrl(result.data.imgUrl);
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
  };
  const ifErrorFunction = (a, b, c, d) => {
     setAlertModalStatus(a);
     setAlertMessage(b);
     setTimeout(() => {
       setAlertMessage(c);
       setAlertModalStatus(d);
     }, 700);
  }
  const navigateToJoinEndPoint = `${gameEndPoint}/savePlayerDetails`;
  const joinGame = () => {
    if (name === "") {
     ifErrorFunction(true, "Enter a username", "", false)
    } else if (imgUrl === "") {
        ifErrorFunction(true, "Upload an img", "", false);
    } else {
      axios.post(navigateToJoinEndPoint, playerSchema).then((result) => {
        if (result.data.status) {
          localStorage.adminIdentification = result.data.playerToken;
          navigate("/play")
        } else {
           ifErrorFunction(true, result.data.message, "", false);
        }
      });
    }
  };

  return (
    <div className="w-10p h-10p fixed top-0 flex justify-center items-center">
      <div className="w-dimageSize">
        <div className="w-10p flex justify-center my-2">
          <Logo />
        </div>
        {imgUrl !== "" && (
          <div className="h-12 w-12   mx-auto">
            <img src={imgUrl} alt="" className="h-12 w-12" />
          </div>
        )}
        <div className="w-10p">
          <div className="w-10p flex justify-center py-2">
            <label id="image">
              <SlCloudUpload className="text-5xl text-green-like-100" />
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
            <p className="text-center">Upload your picture</p>
          </div>
          <div className="w-10p">
            <div className="bg-green-like-100 py-2 rounded-sideicon">
              <p className="text-center text-white">Enter your user name</p>
            </div>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-10p h-6 border border-green-like-100 text-center text-green-like-100 font-bold text-2xl focus:outline-green-like-100"
            />
          </div>
          <div className="w-10p flex justify-center my-3">
            <button
              className="h-7 w-7 bg-green-like-100 flex justify-center items-center"
              style={{ borderRadius: "48px" }}
              onClick={() => joinGame()}
            >
              <FaAngleRight className="text-5xl text-white" />
            </button>
          </div>
        </div>
      </div>
      <AlertModal/>
    </div>
  );
};

export default NameJoin;
