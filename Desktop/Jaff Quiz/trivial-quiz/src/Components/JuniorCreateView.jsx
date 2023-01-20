import CreatView from "./CreatView";
import DashbarNav from "./DashbarNav";
import Sidebar from "./Sidebar";

const JuniorCreateView = () => {
  return (
    <div>
      <DashbarNav />
      <Sidebar />
      <div className="w-10p bg-dashback-100">
        <CreatView />
      </div>
    </div>
  );
};

export default JuniorCreateView;
