import { Route, Routes } from "react-router-dom";
import AdminLogin from "./Components/AdminLogin";
import AdminDashboard from "./Components/AdminDashboard";
import JuniorCreateView from "./Components/JuniorCreateView";
import SeniorCreateView from "./Components/SeniorCreateView";
import PrimaryCreateView from "./Components/PrimaryCreateView";
import QuizCollection from "./Components/QuizCollection";
import AddQuestions from "./Components/AddQuestions";
import Questionbank from "./Components/Questionbank";
import { createContext, useState, useRef, useEffect } from "react";
import Socket from "socket.io-client";
import AdminRegister from "./Components/AdminRegister";
import VerifyEmail from "./Components/VerifyEmail";
import VerifyMessage from "./Components/VerifyMessage";
import IndividualGameLogin from "./Components/IndividualGameLogin";
import NameJoin from "./Components/NameJoin";
import Game from "./Components/Game";
import AdminGameLogin from "./Components/AdminGameLogin";
import Participants from "./Components/Participants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Trail from "./Components/Trail";
import Setting from "./Components/Setting";
import Search from "./Components/Search";
import Result from "./Components/Result.jsx";
import Index from "./Components/Index";
import ResetPassword from "./Components/ResetPassword";
import EmailForgotPassRestLink from "./Components/EmailForgotPassRestLink";
export const appContext = createContext(null);
function App() {
  let navigate = useNavigate();
  let backendEndPoint = "http://localhost:2340";
  let socket = useRef();
  useEffect(() => {
    socket.current = Socket(backendEndPoint);
  }, []);
  // hfhh
  const [adminDetails, setAdminDetails] = useState({});
  const [adminId, setAdminId] = useState("");
  const [adminOrganizationUserName, setAdminOrganizationUserName] = useState("")
  const [adminEmail, setAdminEmail] = useState("")
  const [adminImage, setAdminImage] = useState("")
  const [adminEndPoint, setAdminEndPoint] = useState(
    "http://localhost:2340/admin"
  );
  const [gameEndPoint, setGameEndPoint] = useState(
    "http://localhost:2340/game"
  );
  const [searchEndPoint, setSearchEndPoint] = useState(
    "http://localhost:2340/search"
  );
  // created for the alert modal, so that it can be used by any component when needed
  const [alertModalStatus, setAlertModalStatus] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");
  // responsiblefor using sibar and hidding sidebar
  const [showSideBar, setShowSidebar] = useState("hidden");
  // for sidebarbox shadox as an indication for the current place that the admin is
  const [sidebarBOxShadow, setSideBarBoxShadow] = useState(0);

  // a boolean responsible for  the create modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  // for showing the current set whether primary orsecondary(junior or senior)
  const [currentSet, setCurrentSet] = useState("");

  const [userName, setUsername] = useState("");
  const adminEndpointt = `${adminEndPoint}/admindashboard`;
// deletemodal boolean
  const [deleteModalState, setDeleteModalState] =useState(false)

  // lastQuizHeld
  const [lastPlayed, setLastPlayed] = useState([])
  const [lastPlayedDetails, setLastPlayedDetails] = useState({})
  const [ranking, setRanking] =useState([])

  // Edit question state and modal
  const [questionIndex, setQuestionIndex] = useState(0)
  const [questionText, setQuestionText] = useState("")
  const [options,setOptions] = useState([])
  const [editQuestion, setEditQuestion] = useState({
    question: { text: "", image: "" },
    answers: [
      { option: "", status: false },
    ],
    score: 0
  })
  const [editQuestionState, setEditQuestionState] = useState(false)
  // Mobile Navigation
  const [mobileNav, setMobileNav] = useState(false)
  const [topThree, SetTopThree] = useState([])
  const [topThreeName, setTopThreeName] = useState([])
  const dashboardFuction = () => {
    axios
      .get(adminEndpointt, {
        headers: {
          Authorization: `bearer ${localStorage.adminId}`,
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
      
        if (result.data.status) {
          setAdminDetails(result.data.adminDetails);
          setAdminId(result.data.adminDetails._id);
          setRanking(result.data.ranking)
          setAdminOrganizationUserName(result.data.adminDetails.adminUserName);
          setAdminEmail(result.data.adminDetails.adminEmail)
          setAdminImage(result.data.adminDetails.adminImg)
          setLastPlayed(result.data.lastQuizheld)
          SetTopThree(result.data.topThree)
          setTopThreeName(result.data.topThreeName);
          setLastPlayedDetails(result.data.quizDetails);
        } 
      }).catch((error) => {
        console.log(error)
      })
  };
  return (
    <appContext.Provider
      value={{
        socket,
        adminDetails,
        setAdminDetails,

        adminId,
        adminOrganizationUserName,
        adminImage,
        adminEmail,
        adminEndPoint,
        gameEndPoint,
        searchEndPoint,
        dashboardFuction,
// last played
        topThree,
       topThreeName,
        lastPlayed,
        lastPlayedDetails,
        ranking, 
            // boolean state for the alert modal
        alertModalStatus,
        setAlertModalStatus,
        alertMessage,
        setAlertMessage,
        showSideBar,
        setShowSidebar,
        // sidebar box shadow
        sidebarBOxShadow,
        setSideBarBoxShadow,

        // create modal
        showCreateModal,
        setShowCreateModal,
        // responsible for the delete modal
        deleteModalState,
        setDeleteModalState,
        currentSet,
        setCurrentSet,
        userName,
        setUsername,


        // Edit Question
        questionIndex,
        setQuestionIndex,
        questionText,
        setQuestionText,
        options,
        setOptions,
        editQuestion,
        setEditQuestion,
        editQuestionState,
        setEditQuestionState,
        // Mobile Nav
        mobileNav,
        setMobileNav
      
      }}
    >
      <Routes>
        <Route path="/" element={<Index/>}/>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/forgot/password" element={<EmailForgotPassRestLink/>}/>
        <Route path="/reset/password/:id" element={<ResetPassword/>}/>
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/junior/create" element={<JuniorCreateView />} />
        <Route path="/senior/create" element={<SeniorCreateView />} />
        <Route path="/primary/create" element={<PrimaryCreateView />} />
        <Route path="/quizcollections" element={<QuizCollection />} />
        <Route path="/add/quiz/questions" element={<AddQuestions />} />
        <Route path="/admin/result" element={<Participants />} />
        <Route path="/questionbank" element={<Questionbank />} />
        <Route path="/emailverification" element={<VerifyMessage />} />
        <Route path="/verify/:id" element={<VerifyEmail />} />
        <Route path="/play/userlogin" element={<IndividualGameLogin />} />
        <Route path="/play/adminlogin" element={<AdminGameLogin />} />
        <Route path="/play/username" element={<NameJoin />} />
        <Route path="/play" element={<Game />} />
        <Route path="/trial" element={<Trail />} />
        <Route path="/admin/setting" element={<Setting />} />
        <Route path="/search" element={<Search />} />
        <Route path="/result" element={<Result/>}/>
      </Routes>
    </appContext.Provider>
  );
}

export default App;
