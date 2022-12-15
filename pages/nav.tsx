import React, { useEffect,useState } from 'react'
import {motion} from "framer-motion"
import Link from 'next/link';
import router from 'next/router';

type Props = {}

function Nav({}: Props) {
  
  const [navbar, setNavbar] = useState(false);

    //!redirect if not logged in
    useEffect(() => {

      router.push("/")

      }, []);

  return (  
    <>
    <nav className="w-full bg-darkGray2 z-10 sticky top-0">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <Link href="/">
                <h2 className="xl:text-2xl lg:text-2xl md:tex-2xl sm:text-xl xs:text-xl text-white font-bold">MyClimbs</h2>
              </Link>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? 'block' : 'hidden'
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 uppercase">
                <li className="hover:text-gray-300 text-md text-gray-400">
                  <Link href="/leads">
                    <p>
                    Sport Climbing
                    </p>
                  </Link>
                </li>
                <li className="hover:text-gray-300 text-md text-gray-400">
                  <Link href="/boulders">
                  <p>
                    Bouldering
                    </p>
                  </Link>
                </li>
                <li className="hover:text-gray-300 text-md text-gray-400">
                  <Link href="/traditionals">
                  <p>
                    Traditional
                    </p>
                  </Link>
                </li>
                <li className="hover:text-gray-300 text-md text-gray-400">
                  <Link href="/walls">
                  <p>
                    Multipitch
                    </p>                
                  </Link>
                </li>
                <li className="hover:text-gray-300 text-md text-gray-400 xl:invisible lg:invisible md:invisible sm:visible xs:visible">
                  <Link href="/profile">
                  <p>
                    Profile
                    </p>                
                  </Link>
                </li>
                <Link href={"/profile"}>
                  <img className='lg:visible xl:visible md:visible sm:invisible absolute mt-2 right-5 top-0 xl:right-5 lg:right-5 md:right-5 xs:invisible items-center  xl:w-14 xl:h-14 lg:w-14 lg:h-14 md:h-12 md:w-12 sm:w-12 sm:h-12 xs:w-10 xs:h-10 object-contain p-1 bg-white rounded-sm' src="https://i.ibb.co/Tt6j1rG/logo.png"  alt="" />
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      </>

  )
}

export default Nav