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
    <div className='max-w-300 p-70 ml-auto mr-auto bg-darkGray2'>
      <form className='grid flex-col'>
            <input className='outline-0 h-16 mb-5 border-5 px-5 py-15' ref={emailRef} placeholder='Email' type="email" />
            <input  className='outline-0 h-16 mb-5 border-5 px-5 py-15' ref={passwordRef} placeholder='Password' type="password" />
            <button className='px-9 py-6 font-sans text-white bg-cursorColor border-none font-medium cursor-pointer' type='submit' onClick={signIn}>Sign In</button>

            <h4 className='text-left mt-6'><span className='text-gray-400'>New to Netflix? </span>
                <span className='hover:underline cursor-pointer' onClick={register}>Sign up now. </span>
            </h4> 
      </form>
    </div>
  )
}

export default SignUpScreen