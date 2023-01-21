import CreateModal from "./CreateModal";
import CreatView from "./CreatView";
import DashbarNav from "./DashbarNav";
import Sidebar from "./Sidebar";

const JuniorCreateView = () => {
  return (
    <>
      <div className="w-100">
        <div className="w-10p bg-dashback-100">
          <CreatView />
        </div>
        {/* <CreateModal /> */}
        <DashbarNav />
        <Sidebar />
      </div>
    </>
  );
};

export default JuniorCreateView;
