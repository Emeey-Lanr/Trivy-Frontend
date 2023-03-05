import { useState } from "react";
import { FaLock, FaLongArrowAltRight} from "react-icons/fa"
const CollectionSearchResult = () => {
  const [locked, setLocked] = useState("")
  return (
    <div className="w-9p mx-auto">
      <div className="w-9p mb-2 flex justify-between items-center border-b border-green-like-100">
        <p className=" py-1 px-3 my-1 text-green-like-100 font-serif text-l">
          Emmanuel
        </p>
        <button>
          {locked === "" ? <FaLongArrowAltRight className="text-green-like-100" /> :
            <FaLock className="text-green-like-100" />}
        </button>
      </div>
      
    </div>
  );
}

export default CollectionSearchResult