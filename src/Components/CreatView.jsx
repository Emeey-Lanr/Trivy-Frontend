import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { appContext } from "../App";
import axios from "axios"
const CreatView = () => {
  let navigate = useNavigate()
  const {
    adminId,
    adminEndPoint,
    showCreateModal,
    setShowCreateModal,
    currentSet,
  } = useContext(appContext);
  const saveIdEndPoint  = `${adminEndPoint}/saveClassId`
  const view = () => {
    axios.post(saveIdEndPoint, { class: currentSet, adminId: adminId }).then((result) => {
      if (result.data.status) {
        localStorage.quizClassId = result.data.identification;
        navigate("/quizcollections");
      }
    })
    
  }
  return (
    <div className="w-10p h-10p fixed bottom-0  right-0 mx-auto flex justify-center items-center">
      <div>
        <h1 className="text-5xl font-bold text-center text-green-like-100">
          {currentSet}
        </h1>
        <p className="text-center py-4 font-light">
          Create a new collection or view existing collections
        </p>
        <div className="flex justify-between w-10p mx-auto createmodal:block createmodal:w-9p ">
          <button
            className="bg-green-like-100 py-3 px-11 mx-7 rounded-sideicon text-white createmodal:mx-0 block createmodal:w-10p createmodal:mb-2 createmodal:px-0"
            onClick={() => setShowCreateModal(true)}
          >
            Create
          </button>
          <button onClick={()=>view()} className="bg-green-like-100 py-3 px-11 mx-4 rounded-sideicon text-white createmodal:mx-0 block createmodal:w-10p createmodal:px-0"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatView;
