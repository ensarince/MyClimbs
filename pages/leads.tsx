import { motion } from 'framer-motion'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import Nav from './nav'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import firebase from 'firebase/compat'
import { selectUser } from '../features/userSlice'
import {useReactTable}  from "@tanstack/react-table"
import Pagination from "../components/Pagination"


type Props = {}

function Leads({}: Props) {

  //user calling for data
  const user = useSelector(selectUser)
  const router = useRouter()
  const {pid} = router.query

  //pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  //loading state for smooth upload
  const [loading, setLoading] = useState(false)

  //data storing and search
  const [leads, setLeads] = useState<any>([]);
  const [search, setSearch] = useState(false)
  const [searchText, setSearchText] = useState("")

  
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
    : router.push("/leads");
    }, []);

  
  //for loading animation
  setTimeout(() => {
    setLoading(false);
  }, 2000);

        //getting climb data
        useEffect(() => {
          setLoading(true);
          db.collection('users')
            .doc(uid || user?.uid)
            .collection('leads')
            .get()
            .then((querySnapshot) => {
              setLeads(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
              })))
            }); 
        }, [search])   

         // Get current posts
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = leads.slice(indexOfFirstPost, indexOfLastPost);

        const paginateFront = () => setCurrentPage(currentPage + 1);
        const paginateBack = () => setCurrentPage(currentPage - 1);

              //filtering the data array according the search text
              function handleSearchText(){
               const filtered = leads.filter((item:any) => {
                return item.data.route_name.toLowerCase().includes(searchText.toLowerCase())
               })
                  setLeads(filtered)
              }
      
              //setting up the search text with given input
              function handleFilterTextChange(e: React.SetStateAction<string>){
                  setSearchText(e)
              }
      
              //resets the search
              function handleReset(){
                  const searchDocument: any = document.getElementById("searchBar")
                  searchDocument.value = "";
                  setSearchText("")
                  setSearch(!search)
              }
  return (
    <>
      <div className='bg-darkGray2 h-screen min-h-screen scrollbar scrollbar-thumb-darkGray2/50 scrollbar-gray-300 overflow-y-scroll'>
      <Nav />
      <Link href={"/addleads"}>
        <div className='flex flex-col justify-center items-center '>
          <h1 className='uppercase text-white text-2xl my-5'>Sport Climbing</h1>
          <div className='group relative flex cursor-pointer'>
              <motion.img 
                className="overflow-hidden rounded-full border-gray-500 object-cover h-200 w-200
                filter group-hover:grayscale transition duration-300 ease-in-out"
                src="./images/sport_climbing.png" alt="" />
              <div className='absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white h-200 w-200 rounded-full z-0 '>
                  <div className='flex items-center justify-center h-full'>
                      <p className='text-xl font-bold text-black opacity-100 '>+ Route to Database</p>
                  </div> 
              </div>
          </div>
          </div>
        </Link>
       {/*  //! */}
       {loading ? 
       (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
       ):
       (
      <>
      <div className='xl: p-10 lg:p-10 md:p-10 sm:p-5 xs:p-5'>
        <div className='flex xl:flex-row lg:flex-row md:flex-row sm:flex-row xs:flex-col'>
                <input
                className='outline-none bg-slate-400/10 rounded-sm border-b px-6 py-2 border-yt-gray
                text-white transition-all placeholder-gray-500 focus:border-coolOrange
                focus:text-white hover:border-darkGray2/40 xl:mr-5 lg:mr-5 md:mr-5 sm:mr-5 xs:mr-1'
                id='searchBar'       
                type="text"
                value={searchText}
                placeholder="Enter a route name"
                onChange = {e => handleFilterTextChange(e.target.value)}/>
               <button className='px-6 py-2 border border-coolOrange/20 rounded-full 
                  uppercase text-xs tracking-widest 
                  text-white transition-all hover:bg-slate-500 xl:mt-0 lg:mt-0 md:mt-0 sm:mt-0 xs:mt-3 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-0 xs:mb-3
              }' onClick={() => handleSearchText()}>Search</button>
                        <button className='px-6 py-2 border border-coolOrange/20 rounded-full 
                  uppercase text-xs tracking-widest hover:bg-slate-500
                  text-white transition-all ' onClick={() => handleReset()}>Reset</button>
        </div>

      <div className="flex flex-col mt-5">
  <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                      <tr>
                          <th scope="col" className="py-3 px-6 md:py-2 sm:px-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                              Detail
                          </th>
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

                  <tbody className="bg-white divide-y divide-gray-700 dark:bg-gray-800 dark:divide-gray-700">
                          {currentPosts?.map((item: any)=> (
                            <tr key={item.data.route_name} className='hover:bg-gray-600 dark:hover:bg-gray-600'>
                              <td className="py-4 px-6 text-sm font-medium right-20 whitespace-nowrap">
                                <Link href={`/leads/${item?.id}`}>
                                  <p className="text-blue-600 dark:text-blue-500 hover:underline">See Details</p>
                                </Link>
                              </td>
                              <td className="py-4 px-6 md:py-2 sm:px-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.data.route_name}</td>
                              <td className="py-4 px-6 md:py-2 sm:px-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.data.route_grade}</td>
                              <td className="py-4 px-6 md:py-2 sm:px-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.data.route_country}</td>
                              <td className="py-4 px-6 md:py-2 sm:px-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.data.route_crag}</td>
                              <td className="py-4 px-6 md:py-2 sm:px-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.data.route_grade}</td>
                              <td className="py-4 px-6 md:py-2 sm:px-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.data.route_date}</td>
                              <td className="py-4 px-6 md:py-2 sm:px-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.data.route_climb_type}</td>
                            </tr>
                          ))}
                    </tbody>
                </table>
                          {leads.length > 10 &&
                                  <Pagination
                                  postsPerPage={postsPerPage}
                                  totalPosts={leads.length}
                                  paginateBack={paginateBack}
                                  paginateFront={paginateFront}
                                  currentPage={currentPage}
                                />
                          }
                  </div>
              </div>
          </div>
        </div>
      </div>
      </>
        )
       }
</div>
    </>
  )
}

export default Leads

/* Leads.getInitialProps = async (props: any) => {
  console.info('##### Congratulations! You are authorized! ######', props);
  return {};
};
 */
