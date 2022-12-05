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
    <div className='absolute right-20'>
            {
                currentPage !== 1 &&
                <a
                    onClick={() => {
                    paginateBack();
                    }}
                    href='#'
                    className='relative inline-flex items-center px-5 py-2 rounded-md border font-medium text-blue-600 text-xl hover:underline'>
                    <span>Previous </span>
                </a>
            }

            {(totalPosts / 10 > currentPage) &&
            <a
                onClick={() => {
                paginateFront();
                }}
                href='#'
                className='relative inline-flex items-center px-5 py-2 rounded-md border font-medium text-blue-600 text-xl hover:underline'
            >
                <span>Next</span>
            </a>
            }

    </div>
  );
}