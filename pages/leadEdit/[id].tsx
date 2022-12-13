import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { SocialIcon } from 'react-social-icons'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Nav from '../nav'
import { db } from '../../firebase'
import { selectUser, userSlice } from '../../features/userSlice'


type Props = {}

function LeadEdit({}: Props) {
    const router = useRouter()
    const { id }: any = router.query
    const user = useSelector(selectUser)
    const [leadData, setLeadData] = useState<any>([])
    const [loading, setLoading] = useState(false)
    
    
  let uid: string | any = null;
  if (typeof window !== "undefined") {
     uid = window.localStorage.getItem("user")
  }
    //!redirect if not logged in
    useEffect(() => {
      // checks if the user is authenticated
      !uid
      ? router.push("/")
      : router.push(`/leads/${id}`);
      }, []);

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    //getting climb data
    useEffect(() => {
      setLoading(true);
      db.collection('users')
        .doc(uid)
        .collection('leads')
        .doc(id)
        .get()
        .then((querySnapshot) => {
          var data: any = querySnapshot.data();
          setLeadData(data);
        })
    }, [])   

    

  return (
    <>
    <div className='scrollbar scrollbar-thumb-darkGray2/50 scrollbar-gray-300 overflow-y-scroll h-screen'>
    <Nav />

    <div className='leads__background'>
    {loading ? (
      <div className="loader-container">
      <div className="spinner"></div>
    </div>
    ):
    (
      <div className='relative h-fit min-h-screen left-0 right-0  bg-backgroundOpacity'>
        <div className='grid grid-cols-2 h-fit min-h-screen justify-center items-center text-gray-100 p-20 bg-backgroundOpacity2'>

        <div className='bg-backgroundOpacity flex flex-col'>
          <h1 className='text-4xl text-gray-100 hover:underline mb-5 uppercase bg-backgroundOpacity'>{leadData?.route_name}</h1>
          <p className='text-3xl bg-backgroundOpacity mb-5'>{leadData?.route_grade}</p>
          <p className='bg-backgroundOpacity mb-3 text-2xl'>{leadData?.route_climb_type}</p>
          <p className='bg-backgroundOpacity mb-3 text-2xl'>{leadData?.route_country}</p>
          <p className='bg-backgroundOpacity mb-3 text-2xl'>{leadData?.route_crag}</p>
          <p className='bg-backgroundOpacity mb-3 text-2xl'>{leadData?.route_date}</p>
          
          <div className='flex justify-start items-start my-10'>
              <Link href={`/leads/edit/${id}`}>
                <button className='px-6 py-2 border border-coolOrange/20 rounded-full 
                  uppercase text-sm tracking-widest hover:bg-slate-500
                  text-white transition-all'>Edit</button>
              </Link>
          </div>

        </div>

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
            duration: 1,
          }}
            className='flex z-10 relative w-650 flex-shrink-0'
            src={leadData?.route_image} alt="" />

        </div>
      </div>
         )
        }
        <div className='leads__gradient' /> 
        </div>
    </div>
    </>
  )
}

export default LeadEdit