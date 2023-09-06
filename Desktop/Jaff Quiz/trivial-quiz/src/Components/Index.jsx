import React, { useEffect } from 'react'
import Logo from './Logo'
import { useNavigate } from 'react-router-dom'
const Index = () => {
    let navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
           navigate("/admin/login")  
        },4000)

    },[])
  return (
    <div className='w-10p h-10p fixed top-0 flex justify-center items-center spin'>
        <Logo/>
    </div>
  )
}

export default Index