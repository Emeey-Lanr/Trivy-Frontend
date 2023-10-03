import { useContext, useState } from "react";
import { FaLock, FaLongArrowAltRight} from "react-icons/fa"
import { searchContext } from "./Result";
const CollectionSearchResult = () => {
  const {collectionFound,acessRightAway, enterAcessPin}= useContext(searchContext)
  const [locked, setLocked] = useState("")
  return (
    <div className="w-9p mx-auto">
      {collectionFound.length > 0 ? (
        collectionFound.map((content) => (
          <div className="w-9p mb-2 flex justify-between items-center border-b border-green-like-100">
            <p className=" py-1 px-3 my-1 text-green-like-100 font-serif text-l">
              {content.quizName}
            </p>

            {!content.locked ? (
              <button
                onClick={() => acessRightAway(content._id, content.quizName)}
              >
                <FaLongArrowAltRight className="text-green-like-100" />
              </button>
            ) : (
              <button
                onClick={() => enterAcessPin(content._id, content.quizName)}
              >
                <FaLock className="text-green-like-100" />
              </button>
            )}
          </div>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default CollectionSearchResult