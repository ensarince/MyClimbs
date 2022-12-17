import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { auth, db, storage } from '../firebase'
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Nav from './nav'

type Props = {}

function Addlead({}: Props) {

  const user = useSelector(selectUser)
  const router = useRouter()
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
  const [loading, setLoading] = useState(false)
  const [imgUrl, setImgUrl] = useState("");


        //!get local storage
      let uid: string | null = null;
      if (typeof window !== "undefined") {
        uid = window.localStorage.getItem("user")
      }
      //!redirect if not logged in
      useEffect(() => {
        // checks if the user is authenticated
        !uid
        ? router.push("/")
        : router.push("/addleads");
        }, []);  

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

  const addLeads = (e: { preventDefault: () => void }) => {  
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
          route_notes: routeNote
        });
        router.push('/leads')
      } catch (error) {
        alert(error)
    }
  }

  if(imgUrl === ""){
   const input2:HTMLElement | null = document.getElementById("FILE_UPLOAD")
   input2!.style.display = "none"
  }else{
    const input1:any = document.getElementById("FILE_UPLOADED")
    input1!.style.display = "block"
  }

  return (
    <>
    <Nav />
    <div className='h-full mr-auto ml-auto bg-coolRed'>
        <form className='flex flex-col space-y-2 w-full overflow-hidden items-center xl:p-20 lg:p-20 md:p-10 sm:p-8 xs:p-5' action="">
            <h1 id='h1' className='xl:text-3xl lg:text-3xl md:text-2xl sm:text-2xl xs:text-2xl text-white xl:p-5 lg:p-5 md:p-2 sm:p-2 xs:p-0 
                          border-none bg-black/10 rounded-xl xl:mb-10 lg:mb-10 md:mb-8 sm:mb-5 xs:mb-3'>Add a Route</h1>
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
            

                <input className='form__input' id='FILE_UPLOAD' onChange={changeRouteImage} value={routeImage} accept="image/*" type="file" name="leadImage"/>           

                <p className='form__input' id='FILE_UPLOADED'>asdasd</p>           

            <textarea className='form__input' name="routeNote" placeholder='Add your note' onChange={changeRouteNote}/>
           {loading ? (
            <p className='relative px-9 py-6 font-sans text-white bg-black/10 border-none hover:bg-red-700 transition duration-150 active:bg-black rounded-md font-medium'>Loading...{progresspercent}</p>
           ):
           <button onClick={addLeads} className='relative px-9 py-6 font-sans text-white bg-black/10 border-none hover:bg-red-500 transition duration-150 active:bg-black rounded-md font-medium cursor-pointer' type='submit'>Submit</button>
           }
        </form>
    </div>
    </>
  )
}


export default Addlead
