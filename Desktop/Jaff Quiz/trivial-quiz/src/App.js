import { Route, Routes } from "react-router-dom";
import AdminLogin from "./Components/AdminLogin";
import AdminDashboard from "./Components/AdminDashboard";
import JuniorCreateView from "./Components/JuniorCreateView";
import SeniorCreateView from "./Components/SeniorCreateView";
import PrimaryCreateView from "./Components/PrimaryCreateView";
import QuizCollection from "./Components/QuizCollection";
import AddQuestions from "./Components/AddQuestions";
function App() {
  return (
    <Routes>
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/junior/create" element={<JuniorCreateView />} />
      <Route path="/senior/create" element={<SeniorCreateView />} />
      <Route path="/primary/create" element={<PrimaryCreateView />} />
      <Route path="/quizcollections" element={<QuizCollection />} />
      <Route path="/add/quiz/questions" element={<AddQuestions />} />
    </Routes>
  );
}

export default App;
