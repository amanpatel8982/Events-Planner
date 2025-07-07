import React from 'react';

const userDashboard = () => {
  return (
    <>
      <div className='flex flex-col items-center  bg-gray-100'>
        <h1>User Dashboard</h1>
        <p>Welcome to your Dashboard</p>
      </div>


     <div className='flex items-center justify-center  mt-10 '>
      <div className='flex flex-col items-center h-50 w-70 justify-center   bg-gray-200 p-10'>
      
        <p>Name: John Doe</p>
        <p>Email: aman@gamil.com</p>
        <p>Phone: 123-456-7890</p>
      </div>
        </div>
    </>
  )
}

export default userDashboard