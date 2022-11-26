import React from 'react'
import { SocialIcon } from 'react-social-icons';
import {motion} from "framer-motion"
import Link from 'next/link';

type Props = {}

function Nav({}: Props) {
  return (
    <div className='sticky top-0 flex h-25 p-12 items-center justify-center overflow-hidden '>
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
          className='absolute mt-10 left-5 top-0 items-center w-16 h-16 object-contain p-1 bg-white rounded-sm' src="./images/logo_2.png" alt="" />
          </Link>
            <motion.div 
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
                <p className='uppercase hidden md:inline-flex  hover:text-gray-300 cursor-pointer text-sm text-gray-400 hover:'>Sport Climbing</p>
              </Link>
              <Link href={'/boulders'}>
               <p className='uppercase hidden ml-20 md:inline-flex cursor-pointer  hover:text-gray-300 text-sm text-gray-400'>Bouldering</p>
              </Link>
              <Link href={'/traditionals'}>
                <p className='uppercase hidden ml-20 md:inline-flex cursor-pointer  hover:text-gray-300 text-sm text-gray-400'>Trad Climbing</p>
              </Link>
              <Link href={'/walls'}>
                <p className='uppercase hidden ml-20 md:inline-flex cursor-pointer  hover:text-gray-300 text-sm text-gray-400'>Multipitch</p>
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
              className='absolute mt-10 right-5 top-0 items-center w-16 h-16 object-contain p-1 bg-white rounded-sm' src="./images/logo.png"  alt="" />
            </Link>

        </div>
    </div>
  )
}

export default Nav