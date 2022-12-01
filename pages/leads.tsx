import { motion } from 'framer-motion'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import Nav from './nav'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import firebase from 'firebase/compat'
import { selectUser } from '../features/userSlice'

type Props = {}

function Leads({}: Props) {

  const user = useSelector(selectUser)
  const router = useRouter()
  const {pid} = router.query
  
  const [leads, setLeads] = useState([])

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
        }, [])   

  return (
    <>
      <Nav />
      <Link href={"/addleads"}>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='uppercase text-white text-2xl mb-5'>Sport Climbing</h1>
          <div className='group relative flex cursor-pointer'>
              <motion.img 
                className="overflow-hidden rounded-full border-gray-500 object-cover h-200 w-200
                filter group-hover:grayscale transition duration-300 ease-in-out"
                src="./images/sport_climbing.png" alt="" />
              <div className='absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white h-200 w-200 rounded-full z-0 '>
                  <div className='flex items-center justify-center h-full'>
                      <p className='text-xl font-bold text-white opacity-100 '>+ Route to Database</p>
                  </div> 
              </div>
          </div>
          </div>
        </Link>

	<div className="flex flex-col p-20 md: p-10 sm: p-5">
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="py-3 px-6 md:py-2 sm:px-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Route Name
                            </th>
                            <th scope="col" className="py-3 px-6  md:py-2 sm:px-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Grade
                            </th>
                            <th scope="col" className="py-3 px-6  md:py-2 sm:px-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Country
                            </th>
                            <th scope="col" className="py-3 px-6  md:py-2 sm:px-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Crag
                            </th>
                            <th scope="col" className="py-3 px-6  md:py-2 sm:px-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Grade
                            </th>
                            <th scope="col" className="py-3 px-6 md:py-2 sm:px-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Date Ascended
                            </th>
                            <th scope="col" className="py-3 px-6 md:py-2 sm:px-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Climbed As
                            </th>
    
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">

                            {leads?.map((item) => (
                              <tr className='hover:bg-gray-100 dark:hover:bg-gray-200'>
                                <td className="py-4 px-6 md:py-2 sm:px-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.data.route_name}</td>
                                <td className="py-4 px-6 md:py-2 sm:px-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.data.route_grade}</td>
                                <td className="py-4 px-6 md:py-2 sm:px-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.data.route_country}</td>
                                <td className="py-4 px-6 md:py-2 sm:px-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.data.route_crag}</td>
                                <td className="py-4 px-6 md:py-2 sm:px-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.data.route_grade}</td>
                                <td className="py-4 px-6 md:py-2 sm:px-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.data.route_date}</td>
                                <td className="py-4 px-6 md:py-2 sm:px-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.data.route_climb_type}</td>
                            <td className="py-4 px-6 text-sm font-medium right-20 whitespace-nowrap">
                              <Link href={`/leads/${item?.id}`}>
                                <p className="text-blue-600 dark:text-blue-500 hover:underline">Details</p>
                              </Link>
                            </td>
                              </tr>
                              
                            ))}

 
                        
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  </div>
    </>
  )
}

export default Leads