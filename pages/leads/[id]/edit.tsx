import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { SocialIcon } from 'react-social-icons'
import { motion } from 'framer-motion'
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Link from 'next/link'
import Nav from '../../nav'
import { auth, db, storage } from '../../../firebase'
import { selectUser, userSlice } from '../../../features/userSlice'
import Leads from '../[id]'


type Props = {}

function EditLeads({}: Props) {
    const router = useRouter()
    const { id }: any = router.query
    const user = useSelector(selectUser)
    const [leadData, setLeadData] = useState<any>([])
    const [loading, setLoading] = useState(false)
    let file: any | Blob | ArrayBuffer = [];

    const [routeName, setRouteName] = useState("")
    const [routeGrade, setRouteGrade] = useState("")
    const [routeCountry, setRouteCountry] = useState("")
    const [routeCrag, setRouteCrag] = useState("")
    const [routeSector, setRouteSector] = useState("")
    const [routeClimbType, setRouteClimbType] = useState("")
    const [routeDate, setRouteDate] = useState("")
    const [routeNote, setRouteNote] = useState("")
    const [routeImage, setRouteImage] = useState("")
    const [progresspercent, setProgresspercent] = useState(0);
    const [imgUrl, setImgUrl] = useState("");
      
  let uid: string | any = null;
  if (typeof window !== "undefined") {
     uid = window.localStorage.getItem("user")
  }
    //!redirect if not logged in
    useEffect(() => {
      // checks if the user is authenticated
      !uid
      ? router.push("/")
      : router.push(`/leads/${id}/edit`);
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
        setTimeout(() => {
          setImgUrl(leadData.route_image)
        }, 1500);
      })
    }, [])   
    

    const changeRouteName = (event: { target: { value: React.SetStateAction<string> } }) => {
      setRouteName(event.target.value)
    }
    const changeRouteGrade = (event: { target: { value: React.SetStateAction<string> } }) => {
      setRouteGrade(event.target.value)
    }
    const changeRouteCountry = (event: { target: { value: React.SetStateAction<string> } }) => {
      setRouteCountry(event.target.value)
    }
    const changeRouteCrag = (event: { target: { value: React.SetStateAction<string> } }) => {
      setRouteCrag(event.target.value)
    }
    const changeRouteSector = (event: { target: { value: React.SetStateAction<string> } }) => {
      setRouteSector(event.target.value)
    }
    const changeRouteClimbType = (event: { target: { value: React.SetStateAction<string> } }) => {
      setRouteClimbType(event.target.value)
    }
    const changeRouteDate = (event: { target: { value: React.SetStateAction<string> } }) => {
      setRouteDate(event.target.value)
    }
    const changeRouteNote = (event: { target: { value: React.SetStateAction<string> } }) => {
      setRouteNote(event.target.value)
    }
    const changeRouteImage = (event: { target: { files: any | Blob | ArrayBuffer } }) => {

      setLoading(true)
      file = event.target.files[0]

      const storageRef = ref(storage, `/images/${user?.uid}/${file.name}`);
      const  uploadTask = uploadBytesResumable(storageRef, file);

      setLoading(true)
       uploadTask.on("state_changed",
        (snapshot) => {
          const progress =
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgresspercent(progress);
        },
        (error) => {
          alert(error);
        },
         () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImgUrl(downloadURL)
              setLoading(false)
          });
        }
      );    
    }
    

    const editLeads = (e: { preventDefault: () => void }) => {  
      //!
      e.preventDefault();
        try {
          db.collection('users')
          .doc(uid)
          .collection('leads')
          .doc(id)
          .set({
            route_name: routeName,
            route_grade: routeGrade,
            route_country: routeCountry,
            route_crag: routeCrag,
            route_sector: routeSector,
            route_climb_type: routeClimbType,
            route_date: routeDate,
            route_image: imgUrl,
            route_notes: routeNote
          });
          router.push(`/leads/${id}`)
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
        <div className='grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 xl:gap-10 lg:gap-10 md:gap-5 sm:gap-5 h-fit min-h-screen justify-center items-center text-gray-100 p-20 bg-backgroundOpacity2'>

        <div className='group relative flex cursor-pointer items-center justify-center opacity-80 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-0 xs:mb-5'>
          <img id='imageValue' className='overflow-hidden flex object-cover relative w-650 ilter group-hover:grayscale transition duration-300 ease-in-out' 
            /*//! to be corrected */
            src={imgUrl || "https://firebasestorage.googleapis.com/v0/b/my-climbs.appspot.com/o/images%2FeeULazRUwkhY58GuErDCisytCdh2%2FCH9ZtRQWgAA_tz_.jpg?alt=media&token=433d8653-6735-4771-8509-cbf984a8dfb"} alt="" />
          <div className='absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white h-20 rounded-full z-0 '>
            <div className='flex items-center justify-center h-full'>
              <input className='outline-none bg-slate-100 opacity-100 rounded-sm border-b px-6 py-5 border-yt-gray
              text-gray-400 transition-all font-semibold placeholder-gray-500 focus:border-darkGray2
              focus:text-black hover:border-darkGray2/40 mb-3' onChange={changeRouteImage} value={routeImage} accept="image/*" type="file" name="leadImage"/>
            </div>
          </div>
        </div>

        <div className='bg-backgroundOpacity flex flex-col'>
          <input className='outline-none bg-slate-100 opacity-70 hover:opacity-100 focus:opacity-100 rounded-sm border-b px-12 py-5 border-yt-gray
                        text-gray-400 transition-all font-semibold placeholder-gray-500 focus:border-darkGray2
                        focus:text-black hover:border-darkGray2/40 mb-3'type="text" value={routeName} onChange={changeRouteName} placeholder={leadData?.route_name} />
          <select className='outline-none bg-slate-100 opacity-70 hover:opacity-100 focus:opacity-100 rounded-sm border-b px-12 py-5 border-yt-gray
                        text-gray-400 transition-all font-semibold placeholder-gray-500 focus:border-darkGray2
                        focus:text-black hover:border-darkGray2/40 mb-3' value={routeGrade} onChange={changeRouteGrade} placeholder={leadData?.route_grade}>
                          <option value="none">Please Select</option>
                          <option value="5b">5b</option>
                          <option value="5b+">5b+</option>
                          <option value="5c">5c</option>
                          <option value="5c+">5c+</option>
                          <option value="6a">6a</option>
                          <option value="6a+">6a+</option>
                          <option value="6b">6b</option>
                          <option value="6b+">6b+</option>                
                          <option value="6c">6c</option>
                          <option value="6c+">6c+</option>
                          <option value="7a">7a</option>                
                          <option value="7a+">7a+</option>
                          <option value="7b">7b</option>
                          <option value="7b+">7b+</option>                
                          <option value="7c">7c</option>
                          <option value="7c+">7c+</option>
                          <option value="8a">8a</option>               
                          <option value="8a+">8a+</option>
                          <option value="8b">8b</option>
                          <option value="8b+">8b+</option>
                          <option value="8c">8c</option>
                          <option value="8c+">8c+</option>                
                          <option value="9a">9a</option>
                          <option value="9a+">9a+</option>
                          <option value="9b">9b</option>               
                          <option value="9b+">9b+</option>
                          <option value="9c">9c</option>
           </select>
          <select className='outline-none bg-slate-100 opacity-70 hover:opacity-100 focus:opacity-100 rounded-sm border-b px-12 py-5 border-yt-gray
                        text-gray-400 transition-all font-semibold placeholder-gray-500 focus:border-darkGray2
                        focus:text-black hover:border-darkGray2/40 mb-3' value={routeClimbType} onChange={changeRouteClimbType} placeholder={leadData?.route_climb_type}>
                        <option value="onsight">onsight</option>               
                        <option value="flash">flash</option>
                        <option value="redpoint">redpoint</option>
          </select>
          <input className='outline-none bg-slate-100 opacity-70 hover:opacity-100 focus:opacity-100 rounded-sm border-b px-12 py-5 border-yt-gray
                        text-gray-400 transition-all font-semibold placeholder-gray-500 focus:border-darkGray2
                        focus:text-black hover:border-darkGray2/40 mb-3' value={routeCountry} onChange={changeRouteCountry} placeholder={leadData?.route_country} />
          <input className='outline-none bg-slate-100 opacity-70 hover:opacity-100 focus:opacity-100 rounded-sm border-b px-12 py-5 border-yt-gray
                        text-gray-400 transition-all font-semibold placeholder-gray-500 focus:border-darkGray2
                        focus:text-black hover:border-darkGray2/40 mb-3' value={routeCrag} onChange={changeRouteCrag} placeholder={leadData?.route_crag} />
          <input className='outline-none bg-slate-100 opacity-70 hover:opacity-100 focus:opacity-100 rounded-sm border-b px-12 py-5 border-yt-gray
                        text-gray-400 transition-all font-semibold placeholder-gray-500 focus:border-darkGray2
                        focus:text-black hover:border-darkGray2/40 mb-3' value={routeSector} onChange={changeRouteSector} placeholder={leadData?.route_sector} />
           <input className='outline-none bg-slate-100 opacity-70 hover:opacity-100 focus:opacity-100 rounded-sm border-b px-12 py-5 border-yt-gray
                        text-gray-400 transition-all font-semibold placeholder-gray-500 focus:border-darkGray2
                        focus:text-black hover:border-darkGray2/40 mb-3'onChange={changeRouteDate} value={routeDate} 
                        placeholder={leadData?.route_date} type="date" />
           <textarea className='outline-none bg-slate-100 opacity-70 hover:opacity-100 focus:opacity-100 rounded-sm border-b px-12 py-5 border-yt-gray
                        text-gray-400 transition-all font-semibold placeholder-gray-500 focus:border-darkGray2
                        focus:text-black hover:border-darkGray2/40 mb-3'onChange={changeRouteNote} value={routeNote} placeholder={leadData?.route_notes} />
          
        </div>

          <div className='flex justify-center items-center'>
            {
              loading ? (
                <p 
                className='px-6 py-2 border border-coolOrange/20 rounded-full 
                  uppercase text-sm tracking-widest hover:bg-slate-500
                  text-white transition-all'>Loading...
              </p>
              ):
              (
                <button 
                  onClick={editLeads}
                  className='px-6 py-2 border border-coolOrange/20 rounded-full 
                    uppercase text-sm tracking-widest hover:bg-slate-500
                    text-white transition-all'>Publish
                </button>
              )
            }
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

export default EditLeads