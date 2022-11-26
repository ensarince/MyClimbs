import React, { useState } from 'react'
import SignupScreen from './signup'

type Props = {}

function LoginScreen({}: Props) {
  const [signIn, setSignIn] = useState(false)
  return (
    <div className='flex justify-center h-screen bg-gradient-to-t from-violet-500 to-fuchsia-500'>
      <img className='absolute mt-10 w-32 h-32 object-contain p-5' src="./images/logo.png"  alt="" />
      
        <div className='absolute top-1/3 z-1 text-white p-20 ml-auto mr-auto text-center left-0 right-0'>
        </div>
          {/*<div className='loginScreen__gradient' />*/}

          <div className='absolute flex flex-col top-1/4 z-1 text-white p-20 ml-auto mr-auto left-0 right-0 items-center'>
            {
              signIn ? (
                <SignupScreen />
                ) : 
                (
                  <>
                  <h1 className='text-lg mb-10 '>Add your ascents.</h1>
                  <h2 className='text-md mb-10 font-normal'>Always keep track of your climbs.</h2>
                  <h3 className='text-sm font-normal'>Ready to see your logbook? Register now with your email.</h3>

                  <div className="m-20">
                    <form action="">
                      <input className='p-10 outline-0 h-30  w-2/3 border-none max-w-600' type="email" placeholder='Email Adress' />
                      <button className='px-9 py-6 font-sans text-white bg-cursorColor border-none font-medium cursor-pointer' onClick={() => setSignIn(true)}>SIGN IN</button>
                    </form>
                  </div>
                </>
              )
            }
          </div>
    </div>
  )
}

export default LoginScreen