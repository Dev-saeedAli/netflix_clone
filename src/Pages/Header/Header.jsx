import React from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom"
import "../Header/Header.css"
import { useNavigate } from 'react-router'
import { AllContext } from '../../Context/Context'
import { auth } from '../../Firebase/Firebase_Configue'


const Header = () => {
  const [bg, setBg] = useState(false)
  const navigate = useNavigate()
  const { user, logout } = AllContext()

  window.addEventListener("scroll", () => {
    if(window.scrollY >= 80){
      setBg(true)
    }else{
      setBg(false)
    }
  })

  const logOut = async ()=>{
    await logout(auth)
    navigate('/')
  }
  // console.log(bg);
  return (
    <div className={ bg ? `navbar black` : `navbar`}>
        <div className="logo" onClick={()=> navigate('/')}>
           <h3>NETFLIX</h3>
        </div>
        <ul>
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/"}>Tv Shows</Link></li>
            <li><Link to={"/"}>Movies</Link></li>
            <li><Link to={"/"}>New & popular</Link></li>
            <li><Link to={"/"}>My List</Link></li>
        </ul>
        <div className="info">
            <button className="btn" >{
              user?.email ? (
                <span onClick={()=> navigate('/account')}>Account</span>
                ):(
                  <span onClick={() => navigate('/signin')}>Sign In</span>
                  )
            }</button>
            <button className="btn btn-red" >{
                   user?.email ? (
                    <span onClick={()=> logOut()}>Logout</span>
                    ):(
                      <span onClick={() => navigate('/signup')}>Sign Up</span>
                      )
            }</button>
        </div>
    </div>
  )
}

export default Header
