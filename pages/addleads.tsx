import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { auth, db, storage } from '../firebase'
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Nav from './nav'

type Props = {}

function addlead({}: Props) {
  const user = useSelector(selectUser)
  const router = useRouter()
  let file: never[] | Blob | ArrayBuffer = [];

  const [routeName, setRouteName] = useState("")
  const [routeGrade, setRouteGrade] = useState("")
  const [routeCountry, setRouteCountry] = useState("")
  const [routeCrag, setRouteCrag] = useState("")
  const [routeSector, setRouteSector] = useState("")
  const [routeClimbType, setRouteClimbType] = useState("")
  const [routeDate, setRouteDate] = useState("")
  const [routeImage, setRouteImage] = useState("")
/*   const [routeVideo, setRouteVideo] = useState("")
 */
  const [progresspercent, setProgresspercent] = useState(0);
  const [loading, setLoading] = useState(false)
  const [imgUrl, setImgUrl] = useState("");

      const changeRouteName = (event) => {
        setRouteName(event.target.value)
      }
      const changeRouteGrade = (event) => {
        setRouteGrade(event.target.value)
      }
      const changeRouteCountry = (event) => {
        setRouteCountry(event.target.value)
      }
      const changeRouteCrag = (event) => {
        setRouteCrag(event.target.value)
      }
      const changeRouteSector = (event) => {
        setRouteSector(event.target.value)
      }
      const changeRouteClimbType = (event) => {
        setRouteClimbType(event.target.value)
      }
      const changeRouteDate = (event) => {
        setRouteDate(event.target.value)
      }
      
/*       const changeRouteVideo = (event) => {
        setRouteVideo(event.target.value)
      }
 */


      console.log(progresspercent)

      const changeRouteImage = (e) => {
        setLoading(true)
        file = e.target.files[0]

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

  const addLeads = (e) => {  
    //!
    e.preventDefault();

      try {
        db
        .collection("users")
        .doc(user?.uid)
        .collection("leads")
        .add({
          route_name: routeName,
          route_grade: routeGrade,
          route_country: routeCountry,
          route_crag: routeCrag,
          route_sector: routeSector,
          route_climb_type: routeClimbType,
          route_date: routeDate,
          route_image: imgUrl,
  /*         route_video: routeVideo,
   */      });
        router.push('/leads')
      } catch (error) {
        alert(error)
    }
  }

  return (
    <>
    <Nav />
    <div className='h-screen mr-auto ml-auto bg-rockColor'>
        <form className='flex flex-col space-y-2 w-fit  mx-auto sm:w-3/4 sm:pr-5 overflow-hidden xl:w-full md:w-full  items-center p-20' action="">
            <h1 className='text-3xl text-white p-5 border-none bg-black/10 rounded-xl mb-10'>Add a Route</h1>
            <input className='form__input' type="text" value={routeName} onChange={changeRouteName} placeholder='Route Name' />
            <select className='form__input' value={routeGrade} onChange={changeRouteGrade} placeholder='Grade'>
                <option className='form__input' value="none">Please Select</option>
                <option className='form__input' value="5b">5b</option>
                <option className='form__input' value="5b+">5b+</option>
                <option className='form__input' value="5c">5c</option>
                <option className='form__input' value="5c+">5c+</option>
                <option className='form__input' value="6a">6a</option>
                <option className='form__input' value="6a+">6a+</option>
                <option className='form__input' value="6b">6b</option>
                <option className='form__input' value="6b+">6b+</option>                
                <option className='form__input' value="6c">6c</option>
                <option className='form__input' value="6c+">6c+</option>
                <option className='form__input' value="7a">7a</option>                
                <option className='form__input' value="7a+">7a+</option>
                <option className='form__input' value="7b">7b</option>
                <option className='form__input' value="7b+">7b+</option>                
                <option className='form__input' value="7c">7c</option>
                <option className='form__input' value="7c+">7c+</option>
                <option className='form__input' value="8a">8a</option>               
                <option className='form__input' value="8a+">8a+</option>
                <option className='form__input' value="8b">8b</option>
                <option className='form__input' value="8b+">8b+</option>
                <option className='form__input' value="8c">8c</option>
                <option className='form__input' value="8c+">8c+</option>                
                <option className='form__input' value="9a">9a</option>
                <option className='form__input' value="9a+">9a+</option>
                <option className='form__input' value="9b">9b</option>               
                <option className='form__input' value="9b+">9b+</option>
                <option className='form__input' value="9c">9c</option>
            </select>
            <input className='form__input' value={routeCountry} onChange={changeRouteCountry} type="text" placeholder='Country' />
            <input className='form__input' value={routeCrag} onChange={changeRouteCrag} type="text" placeholder='Crag' />
            <input className='form__input' value={routeSector} onChange={changeRouteSector} type="text" placeholder='Sector' />
            <select className='form__input' value={routeClimbType} onChange={changeRouteClimbType} name="climb_type" placeholder='Climbed As:'>
                <option className='form__input' value="">Please select</option>
                <option className='form__input' value="redpoint">Redpoint</option>
                <option className='form__input' value="flash">Flash</option>
                <option className='form__input' value="onsight">Onsight</option>
            </select>
            <input className='form__input' onChange={changeRouteDate} value={routeDate} type="date" />
            <input className='form__input' onChange={changeRouteImage} value={routeImage} accept="image/*" type="file" name="leadImage"/>
           {loading ? (
            <p className='relative px-9 py-6 font-sans text-white bg-black/10 border-none hover:bg-coolOrange transition duration-150 active:bg-black rounded-md font-medium'>Loading...{progresspercent}</p>
           ):
           <button onClick={addLeads} className='relative px-9 py-6 font-sans text-white bg-black/10 border-none hover:bg-coolOrange transition duration-150 active:bg-black rounded-md font-medium cursor-pointer' type='submit'>Submit</button>
           }
        </form>
    </div>
    </>
  )
}

export default addlead