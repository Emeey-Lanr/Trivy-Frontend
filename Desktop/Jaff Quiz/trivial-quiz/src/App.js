import { Route, Routes } from "react-router-dom";
import AdminLogin from "./Components/AdminLogin";
import AdminDashboard from "./Components/AdminDashboard";
import JuniorCreateView from "./Components/JuniorCreateView";
import SeniorCreateView from "./Components/SeniorCreateView";
import PrimaryCreateView from "./Components/PrimaryCreateView";
import QuizCollection from "./Components/QuizCollection";
import AddQuestions from "./Components/AddQuestions";
import Questionbank from "./Components/Questionbank";
import { createContext, useState } from "react";

export const appContext = createContext(null);
function App() {
  // created for the alert modal, so that it can be used by any component when needed
  const [alertModalStatus, setAlertModalStatus] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  return (
    <appContext.Provider
      value={{
        alertModalStatus,
        setAlertModalStatus,
        alertMessage,
        setAlertMessage,
      }}
    >
      <Routes>
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/junior/create" element={<JuniorCreateView />} />
        <Route path="/senior/create" element={<SeniorCreateView />} />
        <Route path="/primary/create" element={<PrimaryCreateView />} />
        <Route path="/quizcollections" element={<QuizCollection />} />
        <Route path="/add/quiz/questions" element={<AddQuestions />} />
        <Route path="/questionbank" element={<Questionbank />} />
      </Routes>
    </appContext.Provider>
  );
}

export default App;
