import { useEffect, useState } from 'react'
import { AiFillFire } from "react-icons/ai";
import Image from "next/image";

const PopupTemplate = ({text}) => {
  const [showModal, setShowModal] = useState(true)

  return (
    <div className="absolute flex md:flex-col justify-center items-center">
        {showModal ? 
        (
        <div className="mt-10 flex justify-center items-center flex-col w-fit rounded-lg shadow-2xl h-auto xl:px-4 lg:px-4 md:px-4 sm:px-2 xs:px-2 xl:py-8 lg:py-8 md:py-6 sm:py-6 xs:py-4 bg-white/90">
          <img src="./images/error_logo.jpg" width={50} height={50} objectFit="contain" />
          <h2 className="xl:text-xl lg:text-xl md:text-xl sm:text:base xs:text-base mt-2 text-red-500 font-semibold text-center mx-4">
            {text ? text : 'Default Text'}</h2>

            <button
              className=" w-auto px-6 my-5 border border-red-100 h-10 hover:bg-red-700 hover:text-white   rounded-md text-red-600  hover:shadow-lg font-semibold"
              onClick={() => setShowModal(false)}>
              Close
            </button>

        </div>
          ):null} 
 
-    </div>
  );
};

export default PopupTemplate;