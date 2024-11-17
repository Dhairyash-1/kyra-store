import ClipLoader from "react-spinners/ClipLoader";

const FullPageLoader = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <ClipLoader color="#000000" size={44} />
    </div>
  );
};

export default FullPageLoader;
