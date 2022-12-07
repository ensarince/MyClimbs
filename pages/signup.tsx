import React,{useRef} from 'react'
import { auth, db } from '../firebase'
import { useRouter } from 'next/router'

type Props = {}

function SignUpScreen({}: Props) {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const router = useRouter();

  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value,
    ).then((authUser) => {
      router.push('/')
    })
    .catch((error) => alert(error.message))
  }

  const register = (e) => {
    //prevent refresh of the page when button clicked
    e.preventDefault();
    auth.createUserWithEmailAndPassword(
      emailRef?.current.value,
      passwordRef?.current.value,
    ).catch(error => (
      alert(error.message)
    ));
  }

  return (
    <div className='max-w-300 p-10 ml-auto mr-auto'>
      <form className='flex flex-col justify-center items-center'>
            <input className='outline-none bg-slate-200 rounded-sm border-b px-14 py-5 border-yt-gray
                text-gray-400 transition-all font-semibold placeholder-gray-500 focus:border-darkGray2
                focus:text-black hover:border-darkGray2/40 mb-3' ref={emailRef} placeholder='Email' type="email" />
            <input  className='outline-none bg-slate-200 rounded-sm border-b px-14 py-5 border-yt-gray
                text-gray-400 transition-all placeholder-gray-500 font-semibold focus:border-darkGray2
                focus:text-black hover:border-darkGray2/40' ref={passwordRef} placeholder='Password' type="password" />
            <button className='px-14 mt-5 py-5 font-sans font-semibold text-white bg-cursorColor hover:bg-fuchsia-500 hover:border-black border-none cursor-pointer' type='submit' onClick={signIn}>Sign In</button>
            <h4 className='text-left mt-6 text-lg'><span className='text-gray-100 font-normal'>New to MyClimbs? </span>
                <span className='hover:underline hover:text-white cursor-pointer text-white/70 font-semibold' onClick={register}> Sign up now. </span>
            </h4> 
      </form>
    </div>
  )
}

export default SignUpScreen