import React from "react";
import MapComponent from "./Mapcomponent";
const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center flex-grow justify-center p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full animate-fade-in flex-grow items-center">
          {/* Left Side - Text */}
          <div className="flex flex-col justify-center space-y-4 animate-slide-in-left">
            <h1 className="text-3xl font-bold">Find & Recover with Ease</h1>
            <p className="text-lg text-gray-700">
              Lost something? Found an item? Our platform helps you connect with
              people who might have your lost belongings.
            </p>
          </div>

          {/* Right Side - Map */}
          <div className="bg-white rounded-lg shadow-lg p-4 w-full flex justify-center relative overflow-hidden">
            <MapComponent className="w-full h-full z-0 rounded-lg" />
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
