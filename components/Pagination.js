import React from "react";
import {FcNext} from "react-icons"

export default function Pagination({
  postsPerPage,
  totalPosts,
  paginateFront,
  paginateBack,
  currentPage,
}) {

  return (
    <div className='flex justify-center items-center mt-6'>
            {
                currentPage !== 1 &&
                <a
                    onClick={() => {
                    paginateBack();
                    }}
                    href='#'
                    className='px-6 py-2 border border-blue-600 rounded-full 
                    uppercase text-xs tracking-widest
                     text-white transition-all hover:bg-slate-500'>
                    <span>Previous </span>
                </a>
            }

            {(totalPosts / 10 > currentPage) &&
            <button
                onClick={() => {
                paginateFront();
                }}
                href='#'
                className='px-6 py-2 border border-blue-600 rounded-full 
                uppercase text-xs tracking-widest
                 text-white transition-all hover:bg-slate-500'
            >
                <span>Next</span>
            </button>
            }

    </div>
  );
}