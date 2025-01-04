import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login,signup } from '../../firebase'
import netfilx_spinner from '../../assets/netflix_spinner.gif'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {
  const [signState,setSignState] = useState("Sign In")

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false)


  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 6;
  };

  const isValidUsername = (name) => {
    const usernameRegex = /^[A-Za-z_]+$/; 
    return usernameRegex.test(name);
  };


  const user_auth = async (event)=>{
    event.preventDefault()

    if(signState === "Sign Up" ){
      if (!name.trim()) {
        toast.error("Name is required for signing up!");
        return;
      }
      if (!isValidUsername(name)) {
        toast.error("Username can only contain alphabets and underscores!");
        return;
      }
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email!");
      return;
    }

    if (!isValidPassword(password)) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }



    setLoading(true)
    try {

      if(signState==='Sign In'){
        await login(email,password)
        toast.success("Successfully signed in!");
      }else{
        await signup(name,email,password)
        toast.success("Account created successfully!");
      }
      
    } catch (error) {
      toast.error(error.message || "Authentication failed. Please try again.");
    }finally{
      setLoading(false)

    }
    
  }


  return (
    loading?<div className="login-spinner">
      <img src={netfilx_spinner} alt="" />
    </div>:
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up"? <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder='Your name' /> : <></>}
            
            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder='Email' />
            <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder='Password' />
            <button onClick={user_auth} type='submit'>Sign Up</button>
            <div className="form-help">
              <div className="remember">
                <input type="checkbox" />
                <label >Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>

        </form>

        <div className='form-switch'>
          {signState === 'Sign In' ? <p>New to Netflix? <span onClick={()=>setSignState('Sign Up')}>Sign Up Now</span></p> : 
          <p>Already have an account? <span onClick={()=>{setSignState('Sign In')}}>Sign In Now</span></p>
          }
           
          

        </div>

      </div>
      <ToastContainer />
    </div>
  )
}

export default Login