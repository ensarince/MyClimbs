import React from 'react'
import Nav from './nav'
import { auth } from '../firebase'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { selectUser } from '../features/userSlice'

type Props = {}

function ProfileScreen({}: Props) {
  const user = useSelector(selectUser)
  const router = useRouter();

  const signOutFunc = () => {
    auth.signOut()
    router.push('/')
  }

  return (
    <>
        <Nav />
      <div className='h-screen text-white bg-gradient-to-t from-violet-500 to-coolRed'>
          <div className='flex items-center absolute top-1/3 right-0 left-0 justify-center flex-col w-1/2 ml-auto  mr-auto max-w-800'>
          <h1 className='font-medium text-3xl border-b-1 mb-10'>Profile</h1>
            <img className='h-64 w-64 rounded-sm' src="./images/logo_1.png" alt="" />
            <div className='flex flex-col items-center justify-center text-white flex-1'>
              <h2 className='p-10 text-xl'>{user?.email}</h2>
              <button onClick={() => signOutFunc()} className='text-xl hover:underline cursor-pointer'>Sign out</button>
            </div>
          </div>
      </div>
    </>
  )
}

export default ProfileScreen