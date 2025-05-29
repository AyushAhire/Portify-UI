import React from 'react'
import img1 from "../assets/logo.jpg"
import {Link} from "react-router-dom"
import Timeline from '../components/Timeline'
const Index = () => {
  return (
    <>
        <div className='w-full flex flex-row h-full'>
          <div className='w-[50%] flex flex-col justify-center items-start px-10'>
            <h1 className='text-xl font-medium ml-1 text-accent '>Welcome to GOSMP</h1>
            <h2 className='text-[3.8rem] font-semibold leading-snug'>
              Get More From Your Finance
            </h2>
            <button className="btn btn-primary text-lg my-3">
              <Link to="/riskform">
              Get Started
              </Link>
              </button>
          </div>
          <div className='w-[50%]  flex justify-center items-center'>
            <img src={img1} alt="" className='bg-blend-color mt-4'/>
          </div>
        </div>

        <div className='mx-48 flex flex-col gap-y-2 mt-20'>
          <h2 className='text-2xl font-semibold text-center '>How it Works</h2>
          <Timeline/>
        </div>
    </>
  )
}
