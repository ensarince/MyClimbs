import { useEffect, useState } from 'react'

const ConfirmDialog = ({text, handleClick  }) => {
  const [showModal, setShowModal] = useState(true)

  return (
    //!fix it
    <div className="absolute flex md:flex-col justify-center items-center">
        {showModal ? 
        (
            <>
        <div className="flex flex-col justify-center items-center rounded-lg shadow-2xl h-auto xl:px-14 lg:px-4 md:px-4 sm:px-2 xs:px-2 xl:py-8 lg:py-8 md:py-6 sm:py-6 xs:py-4 bg-white/90">
          <h2 className="xl:text-xl lg:text-xl md:text-xl sm:text:base xs:text-base mt-2 text-red-500 font-semibold text-center mx-4">
            {text ? text : 'Default Text'}</h2>
            <div>
            <button
              className=" w-auto px-6 my-5 border border-red-100 h-10 hover:bg-red-700 hover:text-white   rounded-md text-red-600  hover:shadow-lg font-semibold"
              onClick={() => handleClick()}>
              Delete
            </button>

            <button
              className=" w-auto px-6 my-5 border border-green-100 h-10 hover:bg-green-700 hover:text-white   rounded-md text-green-600  hover:shadow-lg font-semibold"
              onClick={() => setShowModal(false)}>
              Close
            </button>
            </div>
          </div>
          </>
          ):null} 
    </div>
  );
};

export default ConfirmDialog;