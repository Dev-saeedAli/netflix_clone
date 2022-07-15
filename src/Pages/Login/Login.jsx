import React from 'react'
import { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import "../Login/Login.css"
import { AllContext } from "../../Context/Context" 
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signin } = AllContext()
  const navigate = useNavigate()
  
  const login = async (e) =>{
    e.preventDefault()
    await signin(email, password)
    await setEmail("")
    await setPassword("")
    await navigate('/')
    // console.log(user);
  }

  return (
    <div className='signin-screen'>
       <form onSubmit={(e) => login(e)}>
        <h3>Sign In</h3>
        <label htmlFor="email">
          <input type="email" placeholder='Enter your email'  onChange={(e)=> setEmail(e.target.value)}/>
        </label>
        <label htmlFor="password">
          <input type="password" placeholder='Enter your password'  onChange={(e)=> setPassword(e.target.value)}/>
        </label>
        <button className="btn-login" type='submit'>Sign in</button>
        <div className="help">
        <label htmlFor="check">
        <input type="checkbox" name="checkbox" id="check" />
        <span className='remember'>Remember me</span>
        </label>
        <span className='need-help'>Need Help?</span>
        </div>
       <span className='no-account'>Dont have an account? <Link to={"/signup"}>Sign Up</Link></span>
       </form>
    </div>
  )
}

export default Login
