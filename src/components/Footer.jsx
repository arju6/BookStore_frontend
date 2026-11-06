import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import {faXTwitter } from '@fortawesome/free-brands-svg-icons'
import React from 'react'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'



function Footer() {
  return (
    <footer className="grid grid-cols-1 md:grid-cols-3 gap-10 bg-black text-white p-10 md:px-20 md:py-14">
      <div>
        <h4 className="font-semibold">ABOUT US</h4>
        <p className="font-light mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          At voluptatem inventore eveniet quos libero dolorum
          sapiente accusamus explicabo ut laborum?
        </p>
      </div>

      <div>
        <h4 className="font-semibold">NEWS LETTER</h4>
        <p className="font-light mt-4">
          Stay updated with our latest trends
        </p>
        <div className="flex mt-4">
          <input
            type="email"
            placeholder="Email ID"
            className="bg-white text-black px-4 py-2 rounded-l-md"
          />
          <button className="px-5 py-2 rounded-r-md" style={{backgroundColor:'#EC2627'}}>
             <FontAwesomeIcon icon={faArrowRight} style={{color: "rgb(255, 255, 255)",}} />
          </button>
        </div>
      </div>

      <div>
        <h4 className="font-semibold">FOLLOW</h4>
        <p className="font-light mt-4">
          Let us be social
        </p>

        <div className='text-lg mt-4'>
          <FontAwesomeIcon icon={faInstagram} style={{ color: 'rgb(255, 255, 255)', }} />
          <FontAwesomeIcon icon={faXTwitter} style={{color: "rgb(255, 255, 255)",}} />
          <FontAwesomeIcon icon={faFacebook} style={{color: "rgb(255, 255, 255)",}} />
          <FontAwesomeIcon icon={faLinkedin} style={{color: "rgb(255, 255, 255)",}} />
        </div>
      </div>
      <div>
        <p className='text-white-900'>Copyright &copy;2026 All rights reserved | This website is made with &#10084; by Akarsh Kp</p>
      </div>
    </footer>
  )
}

export default Footer
