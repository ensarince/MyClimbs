import Head from 'next/head'
import Image from 'next/image'
import {store} from "../app/store"
import { Provider } from 'react-redux'
import Link from 'next/link'
import { auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import {login, logout, selectUser} from "../features/userSlice"
import { useEffect } from 'react'
import React from 'react'
import LoginScreen from './login'
import HomeScreen from "./home"

export default function Home() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  
  useEffect(() => {
    //!check if logged in or not with onAuthStateChanged, and clean it after(the listener)
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if(userAuth){
        //logged in
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }))
      }else{
        //logged eout
        dispatch(logout())
      }
    })

    return unsubscribe;
  }, [dispatch])
   
  
  return (
    <div className='scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-cursorColor'>

        <Head>
        <title>My Climbs</title>
        </Head>
          <>
             <Link href={!user ? "/login" : "/"} passHref legacyBehavior>
               {!user ? <LoginScreen /> : <HomeScreen/>} 
            </Link> 

          </>  

    </div>
  )
}
