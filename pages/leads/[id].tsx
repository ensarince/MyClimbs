import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Nav from '../nav'
import { db } from '../../firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'

type Props = {
  //routeName: string
}

function leads({}: Props) {
    const router = useRouter()
    const { id } = router.query
    const user = useSelector(selectUser)
    const [leadData, setLeadData] = useState([])

            //getting climb data
            useEffect(() => {
              db.collection('users')
                .doc(user?.uid)
                .collection('leads')
                .doc(id)
                .get()
                .then((querySnapshot) => {
                  var data = querySnapshot.data();
                  setLeadData(data);
                })
            }, [])   
    
            console.log(leadData)


  return (
    <>
    <Nav />
    <div className='leads__background'>
      <div className='absolute z-1 left-0 right-0 top-1/2 mx-20 opacity-50'>
        <div className='flex flex-col h-max justify-center items-center text-gray-300 opacity-1 p-20'>
          <h1 className='text-3xl text-gray-300 hover:underline'>route_name</h1>
          <p className='text-3xl'>route_grade</p>
          <p>rotpunkt</p>
          <p>turkey</p>
          <p>01.01.2222</p>
          <img src="https://firebasestorage.googleapis.com/v0/b/my-climbs.appspot.com/o/images%2FeeULazRUwkhY58GuErDCisytCdh2%2FIMG_20221115_184240_323.jpg?alt=media&token=684fcb80-14da-4d42-9e16-a60f043f15c0" alt="" />

        </div>
      </div>
         <div className='leads__gradient' /> 
    </div>
    </>
  )
}

export default leads