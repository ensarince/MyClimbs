import React,{useEffect, useRef, useState} from 'react'
import { auth, db } from '../firebase'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
type Props = {}

function Register({}: Props) {
    const emailRef = useRef<any>(null);
    const passwordRef = useRef<any>(null);
    const passwordConfirmRef = useRef<any>(null);
    const router = useRouter();
    const [loading, setloading] = useState(false)
    const user = useSelector(selectUser)
    
    
    let uid: string | null = null;
    if (typeof window !== "undefined") {
       uid = window.localStorage.getItem("user")
    }
    //!redirect if not logged in
    useEffect(() => {
      // checks if the user is authenticated
      !uid
      ? router.push("/signup")
      : router.push("/");
      }, []);

  const register = async(e: { preventDefault: () => void }) => {
    //prevent refresh of the page when button clicked
    e.preventDefault();

    if(passwordRef.current.value !== passwordConfirmRef.current.value){
      return alert('Passwords do not match')
    }

    setloading(true)
    await auth.createUserWithEmailAndPassword(
      emailRef?.current.value,
      passwordRef?.current.value,
    ).catch(error => (
      alert(error.message)
    ));
    setloading(false)
    router.push('/')
  }

  return (

    <div className='flex justify-center bg-gradient-to-t h-screen from-violet-500 to-fuchsia-500 overflow-hidden'>
    <img className='absolute mt-28 w-32 h-32 object-contain p-5' src="./images/logo.png"  alt="" />
      <div className='absolute top-1/4 z-1 text-black p-20 ml-auto mr-auto text-center left-0 right-0'>

        <div className='absolute flex flex-col top-1 z-1 backdrop:p-20 ml-auto mr-auto left-0 right-0 items-center'>
        
                <div className='max-w-300 p-10 ml-auto mr-auto'>
                <form className='flex flex-col justify-center items-center'>
                    <h2 className='text-md text-white mb-1'>Email</h2>
                    <input className='outline-none bg-slate-200 rounded-sm border-b px-14 py-5 border-yt-gray
                        text-gray-400 transition-all font-semibold placeholder-gray-500 focus:border-darkGray2
                        focus:text-black hover:border-darkGray2/40 mb-3' ref={emailRef} placeholder='Email' type="email" />
                    <h2 className='text-md text-white mb-1'>Password</h2>
                    <input  className='outline-none bg-slate-200 rounded-sm border-b px-14 py-5 border-yt-gray
                        text-gray-400 transition-all placeholder-gray-500 font-semibold focus:border-darkGray2
                        focus:text-black hover:border-darkGray2/40 mb-3' ref={passwordRef} placeholder='Password' type="password" />
                    <h2 className='text-md text-white mb-1'>Confirm Password</h2>
                    <input  className='outline-none bg-slate-200 rounded-sm border-b px-14 py-5 border-yt-gray
                        text-gray-400 transition-all placeholder-gray-500 font-semibold focus:border-darkGray2
                        focus:text-black hover:border-darkGray2/40' ref={passwordConfirmRef} placeholder='Confirm Password' type="password" />
                    <button disabled={loading} className='px-14 mt-5 py-5 font-sans font-semibold text-white bg-cursorColor hover:bg-fuchsia-500 hover:border-black border-none cursor-pointer' type='submit' onClick={register}>Sign in</button>
                    <Link href={'/'}>
                        <button className='text-xl hover:underline cursor-pointer mt-3 text-white'>Cancel</button>
                    </Link>
                </form>
            </div>

        </div>
      </div>
  </div>


  )
}

export default Register