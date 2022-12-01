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
          className='absolute mt-10 left-5 top-0 items-center w-16 h-16 object-contain p-1 bg-white rounded-sm' src="https://openailabsprodscus.blob.core.windows.net/private/user-MHYcA2CYrJJ5o5aYjn5DhV4v/generations/generation-tIetw7OPUboYgC06bXsfWPKD/image.webp?st=2022-12-01T08%3A57%3A24Z&se=2022-12-01T10%3A55%3A24Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-01T07%3A11%3A54Z&ske=2022-12-08T07%3A11%3A54Z&sks=b&skv=2021-08-06&sig=vwMkIM4oc8Op1//zoyHHvUK0/snCRrGToLnoRiua/As%3D" alt="" />
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
              className='absolute mt-10 right-5 top-0 items-center w-16 h-16 object-contain p-1 bg-white rounded-sm' src="https://openailabsprodscus.blob.core.windows.net/private/user-MHYcA2CYrJJ5o5aYjn5DhV4v/generations/generation-byY2OKg5gvIXYQQeB5OLsyVt/image.webp?st=2022-12-01T08%3A57%3A24Z&se=2022-12-01T10%3A55%3A24Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-01T07%3A11%3A54Z&ske=2022-12-08T07%3A11%3A54Z&sks=b&skv=2021-08-06&sig=57rs%2BACeodin4KJEi8jKuscAxbWmV70gFSCYLgBh0q4%3D"  alt="" />
            </Link>

        </div>
    </div>
  )
}

export default Nav