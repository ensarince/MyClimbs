import React from 'react'
import {motion} from "framer-motion"
import Nav from './nav'

type Props = {}

export default function Home({}: Props) {
  return (
    <>
      <Nav />
      <div className='flex flex-row justify-center'>
        <motion.img 
          className="h-650 w-650 rounded-xl"
          src="./images/main.png" alt="" />
      </div>
    </>
  )
}