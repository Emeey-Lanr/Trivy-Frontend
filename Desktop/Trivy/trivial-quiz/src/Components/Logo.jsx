import "../styles/logo.css";
const Logo = () => {
  return (
    <div className="logo-div bg-green-like-100">
      <div className="w-10p">
        <div className="firstblock flex w-10p mx-auto justify-between">
          <div className="h-2 w-2 bg-green-like-100 "></div>
          <div className="h-2 w-2 bg-dashback-200 "></div>
          {/* <div className="h-2 w-2 bg-green-like-100 "></div> */}
        </div>
        <div className="w-10p h-4 flex justify-center items-center">
          <div
            className="h-4 w-4 bg-dashback-200"
            style={{ borderRadius: "16px" }}
          ></div>
        </div>
        <div className="firstblock flex w-10p mx-auto justify-between">
          <div className="h-2 w-2 bg-dashback-200 "></div>
          <div className="h-2 w-2 bg-green-like-100 "></div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
