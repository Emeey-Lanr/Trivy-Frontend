import { Oval } from "react-loader-spinner"

const StartGameLoading = () => {
  return (
      <div className="h-10p w-10p fixed top-0 flex justify-center items-center bg-green-like-100">

        <Oval
          height={100}
          width={100}
          color="#fafafa"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="bg-white"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
  
    </div>
  );
}

export default StartGameLoading