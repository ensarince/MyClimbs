import React, { useState } from 'react'
import SignupScreen from './login'

type Props = {}

function LoginScreen({}: Props) {
  const [signIn, setSignIn] = useState(false)
  return (
    <div className='flex justify-center h-screen bg-gradient-to-t from-violet-500 to-fuchsia-500'>
      <img className='absolute mt-32 w-32 h-32 object-contain p-5' src="./images/logo.png"  alt="" />
        <div className='absolute top-1/3 z-1 text-black p-20 ml-auto mr-auto text-center left-0 right-0'>

          <div className='absolute flex flex-col top-1/4 z-1 backdrop:p-20 ml-auto mr-auto left-0 right-0 items-center'>
            {
              signIn ? (
                <SignupScreen />
                ) : 
                (
                  <>
                  <h1 className='text-2xl mb-10 font-semibold text-white  '>Add your ascents.</h1>
                  <h2 className='text-xl mb-10 font-semibold text-white '>Always keep track of your climbs.</h2>
                  <h3 className='text-md font-semibold text-white '>Ready to see your logbook? Register now with your email.</h3>

                  <div className="m-20">
                    <form action="">
                      <button className='px-9 py-6 font-sans hover:bg-fuchsia-500 hover:border-black text-white bg-cursorColor border-none font-medium cursor-pointer' onClick={() => setSignIn(true)}>GET STARTED</button>
                    </form>
                  </div>
                </>
              )
            }
          </div>
            </div>
    </div>
  )
}

export default LoginScreen