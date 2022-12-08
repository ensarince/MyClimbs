import Head from 'next/head'
import Image from 'next/image'
import { Provider } from 'react-redux'
import Link from 'next/link'
import { auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import {login, logout, selectUser} from "../features/userSlice"
import { useEffect, useState } from 'react'
import React from 'react'
import LoginScreen from './landing'
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
    <div className='scrollbar scrollbar-thumb-darkGray2/50 scrollbar-gray-300 overflow-y-scroll h-screen'>

        <Head>
        <title>My Climbs</title>
        </Head>
          <>
          <div>
             <Link href={!user ? "/login" : "/"} passHref legacyBehavior>
               {!user ? <LoginScreen /> : <HomeScreen/>} 
            </Link> 

          </div>

          </>  

    </div>
  )
}
