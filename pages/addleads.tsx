import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { auth, db, storage } from '../firebase'
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable, uploadString } from "firebase/storage";
import { addDoc, collection, serverTimestamp, doc, updateDoc } from 'firebase/firestore'
import PopupTemplate from "../components/Popup"
import Nav from './nav'
import { CameraIcon, XIcon } from '@heroicons/react/outline'


type Props = {}

function Addlead({}: Props) {

  const user = useSelector(selectUser)
  const router = useRouter()

  const filePickerRef: any = useRef(null)
  const [selectedFile, setSelectedFile]: any = useState(null)

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
  const [error, setError] = useState(false)

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

        const reader = new FileReader();
        if(event.target.files[0]){
            reader.readAsDataURL(event.target.files[0])
        }
        reader.onload = (readerEvent: any) => {
            setSelectedFile(readerEvent.target.result)
        }
      }

  const addLeads = async (e: { preventDefault: () => void }) => {  

    if(loading) return

    setLoading(true)

    //1. create a post and add to firestore 'posts' collection
    //2. get the post id 
    //3. upload the image to storage
    //4. get the imgUrl and upload the final post

    const docRef = await addDoc(collection(db, 'users', user?.uid, 'leads'), {
      route_name: routeName,
      route_grade: routeGrade,
      route_country: routeCountry,
      route_crag: routeCrag,
      route_sector: routeSector,
      route_climb_type: routeClimbType,
      route_date: routeDate,
      route_image: imgUrl,
      route_notes: routeNote
    })

    console.log("New doc added with ID -->  ", docRef.id)

    const imageRef = ref(storage, `leads/${docRef.id}/image`);
    await uploadString(imageRef, selectedFile, "data_url")
    .then(async snapshot => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, 'users', user?.uid, 'leads', docRef.id), {
          route_image: downloadURL
        })
    });

    setLoading(false)
    setSelectedFile(null)
    router.push('/leads')
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

            <textarea className='form__input' name="routeNote" placeholder='Add your note' onChange={changeRouteNote}/>
            
            <div className='form__input'>

                        <div>
                            {selectedFile ? (
                                    <div className='relative'>
                                      <XIcon onClick={() => setSelectedFile(null)} className='h-7 z-10 cursor-pointer opacity-70 hover:opacity-100 hover:scale-125 transition-all duration-150 ease-out' />
                                      <img src={selectedFile} onClick={() => setSelectedFile} alt="" />
                                    </div>
                                ) : (

                            <div onClick={() => filePickerRef.current.click()}
                                className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer">
                                <CameraIcon 
                                    className='h-6 w-6 text-red-600'
                                    aria-hidden="true"/>
                            </div>
                                )
                            }
                            <div>
                                <div className='mt-3 text-center sm:mt-5'>
                                    <div>
                                        <input type="file"
                                            ref={filePickerRef}
                                            hidden 
                                            onChange={changeRouteImage}/>
                                    </div>
                                </div>
                                
                            </div>
                            <div className='mt-5 sm:mt-6'>
    
                            </div>
                        </div>
                </div>

           <button disabled={!selectedFile} onClick={addLeads} type='button' 
           className='inline-flex justify-center w-1/2 rounded-md border border-transparent shadow-sm
                   px-4 py-3 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none
                   focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300
                   disabled:cursor-not-allowed hover:disabled:bg-gray-300'>
           {loading ? "Uploading..." : "Upload Post"}         
          </button>
                           {error ?
                    <PopupTemplate text={"Error. It might be our fault, or not!"} />
                  : null
                }
        </form>
    </div>
    </>
  )
}


export default Addlead
