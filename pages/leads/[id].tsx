import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Nav from '../nav'
import { db } from '../../firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { SocialIcon } from 'react-social-icons'
import { motion } from 'framer-motion'
import Link from 'next/link'


type Props = {}

function leads({}: Props) {
    const router = useRouter()
    const { id } = router.query
    const user = useSelector(selectUser)
    const [leadData, setLeadData] = useState([])
    const [loading, setLoading] = useState(false)
    
    
  let uid: string | null = null;
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
          var data = querySnapshot.data();
          setLeadData(data);
        })
    }, [])   

      const handleDelete = (e) =>{
        e.preventDefault();
        try {
          var shouldDelete = confirm("Are you you sure?")
          if (shouldDelete) {
            db
            .collection("users")
            .doc(uid)
            .collection("leads")
            .doc(id)
            .delete()
            .then(()=>{alert("successfully deleted! ")})
            router.push('/leads')
          }else {

          }
        } catch (error) {
          alert(error)
      }
    }

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
          <p className='bg-backgroundOpacity mb-3 text-2xl mt-2'>"{leadData?.route_notes}"</p>
          
          <div className='flex justify-start items-start my-10'>
              <button className='px-6 py-2 border border-coolOrange/20 rounded-full 
                  uppercase text-sm tracking-widest
                  text-white transition-all mr-5 hover:bg-slate-500' onClick={handleDelete}>Delete</button>
              <Link href={`/leadEdit/${id}`}>
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

export default leads