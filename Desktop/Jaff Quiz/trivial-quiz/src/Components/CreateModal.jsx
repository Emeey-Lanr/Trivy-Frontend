import "../styles/modal.css";
import { FaTimes } from "react-icons/fa";
const CreateModal = () => {
  return (
    <div className="w-10p h-10p fixed top-0 left-0 flex justify-center items-center bg-modalback   createmodal:items-end">
      <div className="w-createModalSize bg-white py-5 rounded-createModal createmodalWidth:w-10p">
        <div>
          <div className="flex justify-end w-9p mx-auto">
            <button>
              <FaTimes />
            </button>
          </div>
          <h1 className="text-center text-5xl text-bold">Junior</h1>
        </div>
        <div className="quiznameInput">
          <label>Quiz Name</label>
          <div>
            <input type="text" />
          </div>
        </div>
        <div className="addQuiz">
          <label>Add Subject Name</label>
          <div>
            <input type="text" className="border" />
            <button className="bg-green-like-100 text-white py-2">Add</button>
          </div>
        </div>
        <div className="addedQuestion">
          <div className="flex bg-green-like-100 rounded-createdSubject py-1">
            <p className="text-center text-white pl-1">English</p>
            <button className="flex justify-end w-10p">
              <FaTimes className="text-white font-light" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
