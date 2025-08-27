import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
   
  return (
    <div className='relative mt-10 pt-10'>
        <div className='mt-13'></div>
        <img src={assets.main_banner_bg} alt="main banner" className='w-full hidden md:block' />
        <img src={assets.main_banner_bg_sm} alt="main banner" className='w-full md:hidden' />
        
        {/* Fixed positioning - changed insert-0 to inset-0, added proper positioning */}
        <div className='absolute inset-0 top-0 left-0 flex flex-col items-center md:items-start justify-center md:justify-center px-4 md:pl-18 lg:pl-24'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15'>
                Freshness You Can Trust, Savings You Will!
            </h1>
       
            <div className='flex items-center mt-6 font-medium'>
                <Link to={"/products"} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-[#B0DB9C] hover:bg-[#C2E7AD] transition rounded text-black cursor-pointer'>
                    Shop Now
                    <img className='md:hidden transition group-focus:translate-x-1' src={assets.white_arrow_icon} alt="arrow" />
                </Link>
                {/* Fixed class name from group-hidden to hidden group */}
                <Link to={"/products"} className='hidden group md:flex items-center gap-2 px-9 py-3 cursor-pointer'>
                    Explore Deals
                    <img src={assets.black_arrow_icon} alt="arrow" className='transition group-hover:translate-x-1' />
                </Link>
            </div>
        </div>
    </div>
  )
}

export default MainBanner