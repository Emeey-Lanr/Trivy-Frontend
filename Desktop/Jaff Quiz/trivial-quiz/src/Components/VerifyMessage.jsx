import Logo from "./Logo";
import { AiOutlineMail } from "react-icons/ai";
const VerifyMessage = () => {
  return (
    <div className="w-10p h-10p fixed top-0 flex justify-center items-center">
      <div className="w-dimageSize">
        <div className="">
          <Logo />
        </div>
        <div>
          <div>
            <div className="w-10p flex justify-center items-center">
              <AiOutlineMail className="text-5xl text-green-like-100" />
            </div>

            <span style={{ color: "#6a6a6a", lineHeight: "3" }}>
              A mail has been sent to your account for your account
              verification, check your mail or your spam to confirm your email.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyMessage;
