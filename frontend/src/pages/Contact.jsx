import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className=' font-semibold text-lg text-gray-600'>OUR OFFICE</p>
          <p className=' text-gray-500'>123 Healthcare Plaza <br /> Suite 500, New York, NY 10001, USA</p>
          <p className=' text-gray-500'>Tel: +1-800-ZPPOLLO <br /> Email: support@zppollo.com</p>
          <p className=' font-semibold text-lg text-gray-600'>CAREERS AT ZPPOLLO</p>
          <p className=' text-gray-500'>Join our innovative team in healthcare technology. We're hiring for roles in software development, healthcare operations, and customer support.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
          <p className=' font-semibold text-lg text-gray-600 mt-6'>BUSINESS HOURS</p>
          <p className=' text-gray-500'>Monday - Friday: 9:00 AM - 6:00 PM EST<br />Saturday: 10:00 AM - 4:00 PM EST<br />Sunday: Closed</p>
        </div>
      </div>

    </div>
  )
}

export default Contact
