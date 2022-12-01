import React from 'react'
import {motion} from "framer-motion"
import Nav from './nav'

type Props = {}

export default function Home({}: Props) {

  return (
    <>
      <Nav />
      <div className='relative flex items-center justify-center h-screen mb-12 overflow-hidden'>
      <video autoPlay loop muted 
      className="absolute z-10 w-auto min-w-full min-h-full max-w-none">
         <source src="./images/climbs_2.mp4" type="video/mp4" />
         Your browser does not support the video tag.
      </video>
      </div>
    </>
  )
}