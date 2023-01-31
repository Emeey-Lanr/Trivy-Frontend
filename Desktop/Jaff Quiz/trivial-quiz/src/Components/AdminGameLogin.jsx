import Logo from "./Logo";

const AdminGameLogin = () => {
  return (
    <div className="w-10p h-10p fixed top-0 flex justify-center items-center">
      <div>
        <div className="w-10p flex justify-center">
          <Logo />
        </div>
        <div className="py-3">
          <p className=" text-center text-5xl font-serif text-green-like-100">
            Admin
          </p>
        </div>
        <div>
          <p>Username</p>
          <div>
            <input
              type="text"
              className=" text-green-like-100 font-bold h-6 border border-inputLine w-input rounded-sideicon focus:outline-green-like-100"
            />
          </div>
        </div>
        <div className="my-2">
          <p>Game id</p>
          <div>
            <input
              type="password"
              className=" text-green-like-100 h-6 border border-inputLine w-input rounded-sideicon focus:outline-green-like-100"
            />
          </div>
        </div>
        <div>
          <button className="text-center text-white w-input py-3 rounded-sideicon  bg-green-like-100">Login</button>
        </div>
      </div>
    </div>
  );
};

export default AdminGameLogin;
