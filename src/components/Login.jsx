import React from 'react'
import  { useState } from 'react';
const Login = () => {
    const [isLogin, setisLogin] = useState(true);
    const loginSignupHandler = () => {
        setisLogin(!isLogin);
    }
  return (
      <div className='w-screen h-screen flex items-center justify-center'>
          <div className='flex items-center justify-evenly w-[80%]'>
              <div>
                  <img className='ml-5' width={"180px"} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAdHnk7iY9bD8XUKGx9qTkOH7psCCrvH3KUQ&s' alt="twitter-logo"/>
                  
              </div>
              <div>
                  <div className='my-5'>
                      <h1 className='font-bold text-6xl'>Happening Now !</h1>
                      
                  </div>
                  <h1 className='mt-4 mb-2 text-2xl font-bold'>{isLogin ? "Login" : "signup"}</h1>
                  <form className='flex flex-col w-[55%]'>
                      {
                          !isLogin && (<>
                            <input type="text" placeholder='name' className='outline-blue-500 border border-gray-800 px-3 py-1 rounded-full my-1 font-semibold' />
                            <input type="text" placeholder='Username' className='outline-blue-500 border border-gray-800 px-3 py-1 rounded-full my-1 font-semibold'/>   
                          </>)
                      }
                     
                      <input type="text" placeholder='Email' className='outline-blue-500 border border-gray-800 px-3 py-1 rounded-full my-1 font-semibold' />
                      <input type="text" placeholder='Password' className='outline-blue-500 border border-gray-800 px-3 py-1 rounded-full my-1 font-semibold' />
                      <button className='bg-[#1D98F8] border-none py-2 rounded-full text-white font-bold my-2' >{isLogin ?  "Login":"Signup"}</button>
                      <h1>{isLogin ? "do not have an account?" : "Already have an account?"} <span onClick={loginSignupHandler } className='font-bold text-blue-600 cursor-pointer'>{isLogin ? "Signup" : "Login"}</span></h1>
                  </form> 
              </div>
          </div>
    </div>
  )
}

export default Login;