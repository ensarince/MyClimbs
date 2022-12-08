import React,{useRef, useState} from 'react'
import { auth, db } from '../firebase'
import { useRouter } from 'next/router'
import Link from 'next/link'
type Props = {}

function forgotPassword({}: Props) {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const resetPassword = async() => {
        try {
            setLoading(true)
            await auth.sendPasswordResetEmail(emailRef?.current.value)
            alert("Check your inbox please.")
        } catch (error) {
            alert(error)
        }
        setLoading(false)
    }

  return (
<div className='flex justify-center h-screen bg-gradient-to-t from-violet-500 to-fuchsia-500'>
    <img className='absolute mt-32 w-32 h-32 object-contain p-5' src="./images/logo.png"  alt="" />
      <div className='absolute top-1/3 z-1 text-black p-20 ml-auto mr-auto text-center left-0 right-0'>
                <form className='flex flex-col justify-center items-center'>
                    <h2 className='text-white text-lg  mb-3'>Enter your email</h2>
                    <input className='outline-none bg-slate-200 rounded-sm border-b px-14 py-5 border-yt-gray
                        text-gray-400 transition-all font-semibold placeholder-gray-500 focus:border-darkGray2
                        focus:text-black hover:border-darkGray2/40 mb-3' ref={emailRef} placeholder='Email' type="email" />
                    <button disabled={loading} className='px-14 mt-5 py-5 font-sans font-semibold text-white bg-cursorColor hover:bg-fuchsia-500 hover:border-black border-none cursor-pointer' type='submit' onClick={resetPassword}>Reset Password</button>
                    <Link href={'/landing'}>
                        <button className='text-xl hover:underline cursor-pointer mt-5 text-white'>Login</button>
                    </Link>
                </form>
        </div>
    </div>
  )
}

export default forgotPassword