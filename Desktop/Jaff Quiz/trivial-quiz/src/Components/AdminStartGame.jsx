import React from 'react'

const AdminStartGame = () => {
  return (
    <div className='w-10p h-9p fixed bottom-0 flex justify-center items-center'>
      <div className='flex'>
        <div className='border border-dashback-200'>
          <button className='bg-green-like-100 py-2 px-5 text-white'>Maths</button>
        </div>
        <div className='border border-dashback-200'>
          <button className='bg-green-like-100 py-2 px-5 text-white'>English</button>
        </div>
        <div className='border border-dashback-200'>
          <button className='bg-green-like-100 py-2 px-5 text-white'>English</button>
        </div>
      </div>
    </div>
  );
}

export default AdminStartGame