import React from 'react';

const Login = () => {
  return (
    <>
  <div className='flex justify-center'>
    <div className='bg-amber-500 h-120  mt-50 w-110 rounded-2xl'>
        <div className='ms-10 me-10'>
            <h2 className='text-5xl text-center font-serif mt-4'>Login</h2>

            <label className='font-serif text-3xl relative top-8 '>Email</label> <br />
            <input 
            type="text"
            className="mt-8 bg-white h-10 w-70 rounded ps-5 text-[20px]"
            placeholder="Enter your email"
            required/> <br/>

            <label className='font-serif text-3xl relative top-8 '>Password</label><br />
              <input 
            type="text"
            className="mt-8 bg-white h-10 w-70 rounded ps-5 text-[20px]"
            placeholder="Enter your email"
            required/> <br/>

            
        </div>
    </div>
  </div>
    </>
  )
}

export default Login;