import React, {useState} from 'react'
import "../Signup/Signup.css"
import {Link , useNavigate} from "react-router-dom"
import { AllContext} from "../../Context/Context"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signup } = AllContext()
  const navigate = useNavigate()

  const createAccount = async (e) => {
       e.preventDefault()
      if(email && password){
        await signup(email, password)
        await setEmail("")
        await setPassword("")
        await navigate('/')
      }  
  }

  return (
         <div className='signup-screen'>
       <form onSubmit={(e) => createAccount(e)}>
        <h3>Sign Up</h3>
        <label htmlFor="email">
          <input type="email"  onChange={(e)=> setEmail(e.target.value)} placeholder='Enter your email'/>
        </label>
        <label htmlFor="password">
          <input type="password" onChange={(e)=> setPassword(e.target.value)}  placeholder='Enter your password'/>
        </label>
        <button type='submit' className="btn-login">Sign in</button>
        <div className="help">
        <label htmlFor="check">
        <input type="checkbox" name="checkbox" id="check" />
        <span className='remember'>Remember me</span>
        </label>
        <span className='need-help'>Need Help?</span>
        </div>
       <span className='no-account'>Already have an account? <Link to={"/signin"}>Sign In</Link></span>
       </form>
    </div>
  )
}

export default Signup
