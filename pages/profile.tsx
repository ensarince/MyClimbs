import React, { useEffect } from 'react'
import Nav from './nav'
import { auth } from '../firebase'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { selectUser } from '../features/userSlice'
import Link from 'next/link'

type Props = {}

export default function ProfileScreen({}: Props) {

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
    : router.push("/profile");
    }, []);


  const user = useSelector(selectUser)
  const router = useRouter();

  const signOutFunc = async() => {
    try {      
     await auth.signOut()
      router.push('/')
      window.localStorage.setItem("user", "")
    } catch (error) {
      alert(error)
    }
  }

  return (
    <>
      <div className='h-screen text-white bg-gradient-to-t from-violet-500 to-coolRed scrollbar scrollbar-thumb-darkGray2/50 scrollbar-gray-300 overflow-y-scroll'>
        <Nav />
          <div className='flex items-center absolute top-1/4 right-0 left-0 justify-center flex-col w-1/2 ml-auto  mr-auto max-w-800'>
          <h1 className='font-medium text-3xl border-b-1 mb-10'>Profile</h1>
            <img className='h-64 w-64 rounded-sm' src="./images/logo_1.png" alt="" />
            <div className='flex flex-col items-center justify-center text-white flex-1'>
              <h2 className='text-xl mt-5'>{user?.email}</h2>


              <Link href={'/updateProfile'}>
                <button className='px-8 mt-5 py-2 font-sans font-semibold text-white bg-cursorColor hover:bg-fuchsia-500 hover:border-black border-none cursor-pointer'>Update Profile</button>
              </Link>
              <button onClick={() => signOutFunc()} className='text-xl hover:underline cursor-pointer mt-5'>Log out</button>
              <Link href={"/stats"}>
                <button className='text-xl hover:underline cursor-pointer mt-5'>Stats</button>
              </Link>

            </div>
          </div>
      </div>
    </>
  )
}

