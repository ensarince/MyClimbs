import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Nav from '../nav'
import { db } from '../../firebase'
import { selectUser, userSlice } from '../../features/userSlice'
import { useSelector } from 'react-redux'


type Props = {
  //routeName: string
}

function leads({}: Props) {
    const router = useRouter()
    const { id } = router.query
    const user = useSelector(selectUser)
    const [leads, setLeads] = useState([])

/* 
            //getting climb data
            useEffect(() => {
              db.collection('users')
                .doc(user?.uid)
                .collection('leads')
                .get()
                .then((querySnapshot) => {
                  setLeads(querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                  })))
                }); 
            }, [user?.uid])   
     */
            //console.log(routeName)


  return (
    <>
    {/* <Nav /> */}
    <div className='leads__background'>
      <div className='absolute z-1 left-0 right-0 top-1/2 mx-20 opacity-50'>
        <div className='flex flex-col h-200 justify-center items-center text-gray-300 opacity-1'>
          <h1>Items</h1>
          <p className='text-3xl '>asd</p>
          <p>asdasd</p>
        </div>
      </div>
         <div className='leads__gradient' /> 
    </div>
    </>
  )
}

export default leads