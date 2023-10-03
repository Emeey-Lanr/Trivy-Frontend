import { useContext } from "react";
import { appContext } from "../App";
const AlertModal = () => {
  const { alertModalStatus, alertMessage } = useContext(appContext);
  return (
    <>
      {alertModalStatus && (
        <div className="w-10p h-10p fixed top-0 left-0 bg-modalback flex justify-center items-center">
          <div className="w-dbh h-11 py-1 px-1 bg-white flex justify-center items-center rounded-sideicon createmodal:w-8p">
            <p className="text-center capitalize text-sm">{alertMessage}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertModal;
