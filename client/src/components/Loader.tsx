import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-white">
      <ClipLoader color="#000000" size={44} />
    </div>
  );
};

export default Loader;
