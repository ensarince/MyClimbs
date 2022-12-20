import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { PieChart } from 'react-minimal-pie-chart';
import Nav from './nav';

type Props = {}

function stats({}: Props) {

  
  const router = useRouter();

   //!get local storage
   let uid: string | null = null;
   if (typeof window !== "undefined") {
     uid = window.localStorage.getItem("user")
   }
   //!redirect if not logged in
   useEffect(() => {
     // checks if the user is authenticated
     !uid
     ? router.push("/")
     : router.push("/stats");
     }, []);
 

  return (
    <div className='h-screen text-white bg-gradient-to-t from-violet-500 to-coolRed scrollbar scrollbar-thumb-darkGray2/50 scrollbar-gray-300 overflow-y-scroll'>
            <Nav />
            <div className='flex items-center absolute top-1/4 right-0 left-0 justify-center flex-col w-1/2 ml-auto  mr-auto max-w-800'>
                <PieChart
                    startAngle={180} animate
                    animationDuration={500}
                    data={[
                      { title: 'One', value: 10, color: '#E38627' },
                      { title: 'Two', value: 15, color: '#C13C37' },
                      { title: 'Three', value: 20, color: '#6A2135' },
                    ]}
                  />
              </div>
    </div>
  )
}

export default stats