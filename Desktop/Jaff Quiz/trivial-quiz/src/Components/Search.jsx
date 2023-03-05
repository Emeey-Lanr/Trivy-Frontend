import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import bestStudent from "../Images/bestStudent.jpg"
import { FaLock } from "react-icons/fa";
const Search = () => {
    const [searchStatus, setSearchStatus] = useState()
    return (
      <>
        <div className="w-10p h-10p fixed top-0 flex justify-center items-center  mx-auto">
          <div>
            <button className="w-7 h-7 flex justify-center items-center bg-green-like-100">
              <FaSearch className="text-white" />
            </button>
          </div>
        </div>
        <div className="w-10p h-10p bg-modalback fixed top-0 flex justify-center items-center">
          <div className="w-10p">
            <div
              style={{ border: "2px solid #03a26c" }}
              className="w-4p mx-auto flex justify-center items-center  border-green-like-100"
            >
              <input
                type="text"
                placeholder="Enter Organization Username"
                className="w-9p h-7 bg-green-like-200 focus:outline-0"
              />
              <button className="h-7 w-1p flex pl-2 justify-center items-center bg-green-like-100">
                <FaSearch className="text-white" />
              </button>
            </div>
            <div className="w-4p mx-auto grid grid-cols-3 mt-2">
              <button className="bg-green-like-100 py-3 text-white border-r border-white">
                Primary
              </button>
              <button className="bg-green-like-100 py-3 text-white border-r border-white">
                Junior
              </button>
              <button className="bg-green-like-100 py-3 text-white">
                Secondary
              </button>
            </div>
            <div className="w-4p mt-3 mx-auto overflow-y-auto h-dbh bg-white">
              <div className="w-8p px-2 py-1 rounded-sideicon  mx-auto flex justify-between items-center bg-white shadow-lg">
                <div className="flex items-center bg-green-like-100 px-3 py-1 rounded-sideicon">
                  <div
                    className="w-8 h-8 flex justify-center items-center"
                    style={{
                      border: "3px solid white",
                      borderRadius: "50px",
                    }}
                  >
                    <img
                      src={bestStudent}
                      className="h-6 w-6"
                      style={{ borderRadius: "30px" }}
                      alt=""
                    />
                  </div>
                  <div>
                    <div className="border-l-2 ml-2 px-2 border-white">
                      <p className="text-white">Oyelowo Emmanuel</p>
                    </div>
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    className="border border-green-like-100 outline-green-like-100"
                  />
                  <button>
                    <FaLock className="text-green-like-100" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Search