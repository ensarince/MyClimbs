import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { auth, db } from '../firebase'
import Nav from './nav'

type Props = {}

function addlead({}: Props) {
  const user = useSelector(selectUser)
  const router = useRouter()

  const [routeName, setRouteName] = useState("")
  const [routeGrade, setRouteGrade] = useState("")
  const [routeCountry, setRouteCountry] = useState("")
  const [routeCrag, setRouteCrag] = useState("")
  const [routeSector, setRouteSector] = useState("")
  const [routeClimbType, setRouteClimbType] = useState("")
  const [routeDate, setRouteDate] = useState("")
  const [routeImage, setRouteImage] = useState("")
  const [routeVideo, setRouteVideo] = useState("")
 

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
      const changeRouteImage = (event) => {
        setRouteImage(event.target.value)
      }
      const changeRouteVideo = (event) => {
        setRouteVideo(event.target.value)
      }

  const addLead = async (e) => {
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
        route_image: routeImage,
        route_video: routeVideo,
      });
      router.push('/')
    } catch (error) {
      alert(error)
    }

  }

  return (
    <>
    <Nav />
    <div className='h-screen mr-auto ml-auto p-20'>
        <form className='flex flex-col space-y-2 w-fit  mx-auto sm:w-3/4 sm:pr-5 overflow-hidden xl:w-full md:w-full bg-rockColor items-center p-20' action="">
            <h1 className='text-3xl text-white p-5 border-none bg-black/10 rounded-xl mb-10'>Add a Route</h1>
            <input className='form__input' type="text" value={routeName} onChange={changeRouteName} placeholder='Route Name' />
            <select className='form__input' value={routeGrade} onChange={changeRouteGrade} placeholder='Grade'>
                <option className='form__input' value="none">Please Select</option>
                <option className='form__input' value="5b">5b</option>
                <option className='form__input' value="5b+">5b+</option>
                <option className='form__input' value="5c">5c</option>
                <option className='form__input' value="5c+">5c+</option>
                <option className='form__input' value="5b">6a</option>
                <option className='form__input' value="5b+">6a+</option>
                <option className='form__input' value="5c">6b</option>
                <option className='form__input' value="5c+">6b+</option>                
                <option className='form__input' value="5b+">6c</option>
                <option className='form__input' value="5c">6c+</option>
                <option className='form__input' value="5c+">7a</option>                
                <option className='form__input' value="5b+">7a+</option>
                <option className='form__input' value="5c">7b</option>
                <option className='form__input' value="5c+">7b+</option>                
                <option className='form__input' value="5b+">7c</option>
                <option className='form__input' value="5c">7c+</option>
                <option className='form__input' value="5c+">8a</option>               
                <option className='form__input' value="5b+">8a+</option>
                <option className='form__input' value="5c">8b</option>
                <option className='form__input' value="5c+">8b+</option>
                <option className='form__input' value="5c">8c</option>
                <option className='form__input' value="5c+">8c+</option>                
                <option className='form__input' value="5b+">9a</option>
                <option className='form__input' value="5c">9a+</option>
                <option className='form__input' value="5c+">9b</option>               
                <option className='form__input' value="5b+">9b+</option>
                <option className='form__input' value="5c">9c</option>
            </select>
            <input className='form__input' value={routeCountry} onChange={changeRouteCountry} type="text" placeholder='Country' />
            <input className='form__input' value={routeCrag} onChange={changeRouteCrag} type="text" placeholder='Crag' />
            <input className='form__input' value={routeSector} onChange={changeRouteSector} type="text" placeholder='Sector' />
            <select className='form__input' value={routeClimbType} onChange={changeRouteClimbType} name="climb_type" placeholder='Climbed As:'>
                <option className='form__input' value="redpoint">Redpoint</option>
                <option className='form__input' value="flash">Flash</option>
                <option className='form__input' value="onsight">Onsight</option>
            </select>
            <input className='form__input' onChange={changeRouteDate} value={routeDate} type="date" />
            <input className='form__input' onChange={changeRouteImage} value={routeImage} type="file" name="leadImage" /* onChange={} */ />
            <input className='form__input' onChange={changeRouteVideo} value={routeVideo} type="file" name="leadVideo" /* onChange={} */ />
            <button onClick={addLead} className='relative px-9 py-6 font-sans text-white bg-black/10 border-none hover:bg-coolOrange transition duration-150 active:bg-black rounded-md font-medium cursor-pointer' type='submit'>Submit</button>
        </form>
    </div>
    </>
  )
}

export default addlead