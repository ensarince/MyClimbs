import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Nav from '../nav'
import { db } from '../../firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ConfirmDialog from "../../components/ConfirmDialog"
import PopupTemplate from '../../components/Popup'


type Props = {}

function Leads({}: Props) {
    const router = useRouter()
    const { id }: any = router.query
    const user = useSelector(selectUser)
    const [leadData, setLeadData] = useState<any>([])
    const [loading, setLoading] = useState(false)
    //popup handling
    const [error, setError] = useState(false)
    const [deleteConfirmation, setDeleteConfirmation] = useState(false)
    const [shouldDelete, setShouldDelete] = useState(false)

    // 👇️ take parameter passed from Child component and apply delete function
     function handleClick(){
       setShouldDelete(true)
        try{
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
        setError(true)
    }
};
  

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
          var data = querySnapshot.data();
          setLeadData(data);
        })
    }, [])   


      function handleDelete(e: { preventDefault: () => void }){
        e.preventDefault();
        setDeleteConfirmation(true)
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
        <div className='grid xl:grid-cols-2 h-fit min-h-screen justify-center items-center text-gray-100 p-20 bg-backgroundOpacity2
        lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 xl:gap-10 lg:gap-10 md:gap-5 sm:gap-5'>
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
          className='flex z-10 relative w-650 object-cover'
            src={leadData?.route_image || "https://preview.redd.it/zap5g17zlxe91.png?width=640&crop=smart&auto=webp&s=1ca53925b0ade2b2364a02742c66260c52aea4f7"} alt="" />

          <div className='bg-backgroundOpacity flex flex-col xl:mt-0 lg:mt-0 md:mt-0 sm:mt-0 xs:mt-10'>
            <h1 className='text-4xl text-gray-100 hover:underline mb-5 uppercase bg-backgroundOpacity'>{leadData?.route_name}</h1>
            <p className='text-3xl bg-backgroundOpacity mb-5'>{leadData?.route_grade}</p>
            <p className='bg-backgroundOpacity mb-3 text-2xl'>{leadData?.route_climb_type}</p>
            <p className='bg-backgroundOpacity mb-3 text-2xl'>{leadData?.route_country}</p>
            <p className='bg-backgroundOpacity mb-3 text-2xl'>{leadData?.route_crag}</p>
            <p className='bg-backgroundOpacity mb-3 text-2xl'>{leadData?.route_date}</p>
            <p className='bg-backgroundOpacity mb-3 text-2xl mt-2 break-words'>{leadData?.route_notes}</p>
            
            {deleteConfirmation ? 
              <ConfirmDialog handleClick = {handleClick} text={"Are you sure? (Click double to delete)"} />
              : null
            }
            {error ? 
              <PopupTemplate text={"Error while deleting post. But who's fault is that?"} />
              : null
            }

            <div className='flex justify-start items-start my-10'>
                <button className='px-6 py-2 border border-coolOrange/20 rounded-full 
                    uppercase text-sm tracking-widest
                    text-white transition-all mr-5 hover:bg-slate-500' onClick={handleDelete}>Delete</button>
                <Link href={`/leads/${id}/edit`}>
                  <button className='px-6 py-2 border border-coolOrange/20 rounded-full 
                    uppercase text-sm tracking-widest hover:bg-slate-500
                    text-white transition-all'>Edit</button>
                </Link>
            </div>
          </div>
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

export default Leads