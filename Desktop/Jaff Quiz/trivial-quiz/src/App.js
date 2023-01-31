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
export const appContext = createContext(null);
function App() {
  let backendEndPoint = "http://localhost:2340";
  let socket = useRef();
  useEffect(() => {
    socket.current = Socket(backendEndPoint);
  }, []);
  // hfhh
  const [adminEndPoint, setAdminEndPoint] = useState(
    "http://localhost:2340/admin"
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


  return (
    <appContext.Provider
      value={{
        socket,
        adminEndPoint,
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
        currentSet,
        setCurrentSet,
        userName,
        setUsername,
      }}
    >
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/junior/create" element={<JuniorCreateView />} />
        <Route path="/senior/create" element={<SeniorCreateView />} />
        <Route path="/primary/create" element={<PrimaryCreateView />} />
        <Route path="/quizcollections" element={<QuizCollection />} />
        <Route path="/add/quiz/questions" element={<AddQuestions />} />
        <Route path="/questionbank" element={<Questionbank />} />
        <Route path="/emailverification" element={<VerifyMessage />} />
        <Route path="/:id" element={<VerifyEmail />} />
        <Route path="/play/game" element={<IndividualGameLogin />} />
        <Route path="/play/username" element={<NameJoin />} />
        <Route path="/play" element={<Game />} />
      </Routes>
    </appContext.Provider>
  );
}

export default App;
