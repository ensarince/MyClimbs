import React, { useEffect } from 'react'
import {motion} from "framer-motion"
import Link from 'next/link';
import router from 'next/router';

type Props = {}

function Nav({}: Props) {

    //!redirect if not logged in
    useEffect(() => {

      router.push("/")

      }, []);

  return (
    <div className='sticky top-0 flex h-20 p-12 items-center justify-center overflow-hidden bg-darkGray2 z-10'>
          <div className='flex justify-evenly items-center'>
          <Link href={"/"}>
          <motion.img 
          initial={{
            x: -500,
            opacity: 0,
            scale: 0.5
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.5,
          }}
          className='absolute mt-5 left-5 top-0 items-center xl:w-16 xl:h-16 lg:w-14 lg:h-14 md:h-12 md:w-12 sm:w-12 sm:h-12 xs:w-10 xs:h-10 object-contain p-1 bg-white rounded-sm' src="https://i.ibb.co/2SjX5d1/logo-2.png" alt="" />
          </Link>
            <motion.div 
            className='flex xl:flex-row lg:flex-row md:flex-col sm:flex-col xs-flex-col'
              initial={{
              y: -500,
              opacity: 0,
              scale: 0.5
            }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1.5,
            }}
            >
              <Link href={"/leads"}>
                <p className='uppercase hidden ml-12 md:ml-10 lg:ml-14 xl:ml-18 md:inline-flex hover:text-gray-300 duration:500ms cursor-pointer text-md text-gray-400'>Sport Climbing</p>
              </Link>
              <Link href={'/boulders'}>
               <p className='uppercase hidden ml-12 md:ml-10 lg:ml-14 xl:ml-18  md:inline-flex cursor-pointer  hover:text-gray-300 text-md text-gray-400'>Bouldering</p>
              </Link>
              <Link href={'/traditionals'}>
                <p className='uppercase hidden ml-12 md:ml-10 lg:ml-14 xl:ml-18 md:inline-flex cursor-pointer  hover:text-gray-300 text-md text-gray-400'>Trad Climbing</p>
              </Link>
              <Link href={'/walls'}>
                <p className='uppercase hidden ml-12 md:ml-10 lg:ml-14 xl:ml-18 md:inline-flex cursor-pointer  hover:text-gray-300 text-md text-gray-400'>Multipitch</p>
              </Link>
            </motion.div>
            <Link href={"/profile"}>
            <motion.img 
              initial={{
              x: +500,
              opacity: 0,
              scale: 0.5
            }}
            animate={{
              x: 0,
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1.5,
            }}
              className='absolute mt-5 right-5 top-0 items-center  xl:w-16 xl:h-16 lg:w-14 lg:h-14 md:h-12 md:w-12 sm:w-12 sm:h-12 xs:w-10 xs:h-10 object-contain p-1 bg-white rounded-sm' src="https://i.ibb.co/Tt6j1rG/logo.png"  alt="" />
            </Link>

        </div>
    </div>
  )
}

export default Nav