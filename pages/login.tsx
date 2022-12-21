import React,{useRef, useState} from 'react'
import { auth, db } from '../firebase'
import { useRouter } from 'next/router'
import Link from 'next/link'
import PopupTemplate from "../components/Popup"


type Props = {}

function SignUpScreen({}: Props) {
  const [error, setError] = useState(false)
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const passwordConfirmRef = useRef()
  const router = useRouter();

  const signIn = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value,
    ).then((authUser) => {
      router.push('/')
    })
    .catch((error) => 
      setError(true)
    )
  }
  return (
    <>
    <form className='flex flex-col justify-center items-center'>
            <input className='outline-none bg-slate-200 rounded-sm border-b px-14 py-5 border-yt-gray
                text-gray-400 transition-all font-semibold placeholder-gray-500 focus:border-darkGray2
                focus:text-black hover:border-darkGray2/40 mb-3' ref={emailRef} placeholder='Email' type="email" />
            <input  className='outline-none bg-slate-200 rounded-sm border-b px-14 py-5 border-yt-gray
                text-gray-400 transition-all placeholder-gray-500 font-semibold focus:border-darkGray2
                focus:text-black hover:border-darkGray2/40' ref={passwordRef} placeholder='Password' type="password" />
            <button className='px-14 mt-5 py-5 font-sans font-semibold text-white bg-cursorColor hover:bg-fuchsia-500 hover:border-black border-none cursor-pointer' type='submit' onClick={signIn}>Login</button>
            <h4 className='text-left mt-6 text-lg'><span className='text-gray-100 font-normal'>New to MyClimbs? </span>
              <Link href={'/signup'}>
                <span className='hover:underline hover:text-white cursor-pointer text-white font-semibold'>Sign Up</span>
              </Link>
            </h4> 
            <h3 className='text-left mt-3 text-md'><span className='text-gray-100 font-normal'> </span>
              <Link href={'/forgotPassword'}>
                <span className='hover:underline hover:text-white cursor-pointer text-white font-semibold'>Forgot Password?</span>
              </Link>
            </h3> 
                {error ?
                    <PopupTemplate text={"Login Error. Please check your email format"} />
                  : null
                }
      </form>
      </>
  )
}

export default SignUpScreen