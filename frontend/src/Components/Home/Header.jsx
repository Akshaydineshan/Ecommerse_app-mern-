import React, { useRef } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

import{FaSistrix} from "react-icons/fa"
import{FiShoppingCart} from "react-icons/fi"
import {CgProfile} from "react-icons/cg"
import {AiOutlineHeart} from "react-icons/ai"



function Header(props) {
  console.log(props);
  return (
    <div className="Header" style={{ marginTop: '10px',justifyContent:"space-between",backgroundColor:'	#F8F8FF',pointer:"curser"}}>
      {/* header topbar */}
      <div className="header-topbar" style={{ display: "flex", justifyContent: "space-around" }}>
        {/* left topbar */}
        <div className="top-barlogo">
          <h3>E_commerse</h3>
        </div>

        {/* topbar Middle */}
        <div className="box bg-primary" style={{ padding: "2px 40px", borderRadius: "3px" }}>
          <span
            style={{ color: 'white' }} 
          >
            Welcome to our shop...You can find anything in here as your
            favourites..
          </span>
        </div>

        {/* topbar right */}

        <div className="topbar-right">
          <h5>mvakshay801@gmail.com</h5>
        </div>

      </div>


      {/* header nav */}

      <div className="header-navbar mt-5 p-3"style={{display:"flex",justifyContent:"space-between" }} >
        <div className="links">
          <ul style={{ display: "flex", alignItems: "center", listStyle: "none" }}>
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/about">
              <li>About</li>
            </Link>
            <Link to="/Products">
              <li>Products</li>
            </Link>
            <Link to="/creator">
              <li>Become A Seller</li>
            </Link>
            <Link to="/faq">
              <li>Users Rules</li>
            </Link>
            <Link to="/contact">
              <li>Contact</li>
            </Link>
          </ul>
        </div>

        <div className="search d-flex">
          <input className='form-control'  style={{ width:"600px"}}  type="text" placeholder='search Product'></input><FaSistrix style={{position:"relative",right:"40px",top:"7px"}} size={25}/>
        </div>

        <div className="icons" style={{marginRight:"40px"}}>
        <span className='me-4'><AiOutlineHeart className='ic' size={25}/><span className='count'>5</span></span>
         <span className='me-4'><FiShoppingCart className='ic' size={25}/><span className='count'>2</span></span>
         <span className='me-4'> <CgProfile className='ic' size={25}/></span>
        
           
           
          
        </div>


      </div>



    </div>



  )
}

export default Header