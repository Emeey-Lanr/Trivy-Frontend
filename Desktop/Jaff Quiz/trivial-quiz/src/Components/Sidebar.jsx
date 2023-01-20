import { FaWarehouse } from "react-icons/fa";
import { SlPeople } from "react-icons/sl";
import BorderBottomLine from "./BorderBottomLine";
const Sidebar = () => {
  return (
    <div className="w-dw h-9p fixed bottom-0 left-0 bg-dashback-100  rounded-r-sideedge overflow-y-auto">
      <div className="flex justify-center align-middle w-9p mx-auto bg-white mt-5 py-4 rounded-sideicon shadow-sm hover:bg-gray">
        <div className="w-10p">
          <div className="flex justify-center align-middle w-6 h-6 mx-auto py-2 bg-green-like-100 rounded-sideicon">
            <FaWarehouse className="text-white" />
          </div>
          <div className="w-10p">
            <p className="text-center font-light my-1"> Dashboard</p>
          </div>
        </div>
      </div>
      <BorderBottomLine />
      <div className="flex justify-center align-middle w-9p mx-auto  mt-5 py-4 rounded-sideicon hover:bg-gray">
        <div className="w-10p">
          <div className="flex justify-center align-middle w-6 h-6 mx-auto py-2 bg-green-like-100 rounded-sideicon ">
            <SlPeople className="text-white" />
          </div>
          <div className="w-10p">
            <p className="text-center font-light my-1"> Primary</p>
          </div>
        </div>
      </div>
      <BorderBottomLine />
      <div className="flex justify-center align-middle w-9p mx-auto  mt-5 py-4 rounded-sideicon hover:bg-gray">
        <div className="w-10p">
          <div className="flex justify-center align-middle w-6 h-6 mx-auto py-2 bg-green-like-100 rounded-sideicon">
            <SlPeople className="text-white" />
          </div>
          <div className="w-10p">
            <p className="text-center font-light my-1">Jss</p>
          </div>
        </div>
      </div>
      <BorderBottomLine />
      <div className="flex justify-center align-middle w-9p mx-auto border-1 border-solid border-white  mt-5 py-4 rounded-sideicon hover:bg-gray  hover:transition">
        <div className="w-10p ">
          <div className="flex justify-center align-middle w-6 h-6 mx-auto py-2 bg-green-like-100 rounded-sideicon">
            <SlPeople className="text-white" />
          </div>
          <div className="w-10p">
            <p className="text-center font-light my-1"> Sss</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
