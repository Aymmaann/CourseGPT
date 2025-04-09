import { Link, useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [emailErrorMsg, setEmailErrorMsg] = useState('')
  const [password, setPassword] = useState('')
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let isValid = true;

    if (email === '') {
        setEmailErrorMsg("Email is required");
        isValid = false;
    } else if (!regex.test(email)) {
        setEmailErrorMsg("Invalid email");
        isValid = false;
    } else {
        setEmailErrorMsg("");
    }

    if (password === '') {
        setPasswordErrorMsg("Password is required");
        isValid = false;
    } else if (password.length < 8) {
        setPasswordErrorMsg("Password must be at least 8 characters");
        isValid = false;
    } else {
        setPasswordErrorMsg("");
    }

    if (!isValid) return;

    setLoading(true);
    setTimeout(() => {
        if (localStorage.getItem('user')) {
            localStorage.removeItem('user'); 
        }
        localStorage.setItem('user', JSON.stringify({ email, password }));
        setLoading(false);
        navigate('/home');
    }, 500);
  };

  return (
    <div className='h-screen text-white'>
        <div className='flex'>
          {/* Left Side */}
          <div className='w-1/2 h-screen bg-[#090909] p-6'>
            {/* Logo */}
            <div className='flex gap-2 items-center w-[100px]'>
              <img src={assets.logo} alt="" className='w-[30px]'/>
              <p className='text-xl font-light'>Course<span className='font-semibold'>GPT</span></p>
            </div>

            <div className='mt-32 flex justify-center'>
              <div className='min-w-[300px]'>
                <p className='text-3xl font-medium inline-block'>Welcome back!</p>
                <p className='text-xs font-light text-zinc-400 mt-2'>Smarter Insights for Your Crypto Journey</p>

                <form onSubmit={handleLogin}>
                  <p className='text-sm ml-1 mt-8'>Email</p>
                  <input type="email" 
                        placeholder='mark@gmail.com' 
                        className='w-full mt-2 bg-transparent text-sm border border-borderGray rounded-md py-2.5 px-3 outline-none placeholder:text-zinc-600'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className='text-[#ec3e44] text-xs mt-2 ml-1'>{emailErrorMsg}</p>

                  <div className='flex justify-between items-center text-sm mt-5'>
                    <p className=' ml-1'>Password</p>
                    <p className='text-violet cursor-pointer text-xs font-light'>Forgot your password?</p>
                  </div>
                  <input type="password" 
                        placeholder='mark@12345' 
                        className='w-full mt-2 bg-transparent text-sm border border-borderGray rounded-md py-2.5 px-3 outline-none placeholder:text-zinc-600'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className='text-[#ec3e44] text-xs mt-2 ml-1'>{passwordErrorMsg}</p>
                  <button className='mt-6 text-sm w-full bg-[#111111] border border-borderGray rounded-md py-2.5 flex justify-center items-center gap-1 smoothTransition hover:bg-borderGray' 
                          type='submit'
                          disabled={loading}
                  >
                    {loading? "Logging in..." : "Log in"}
                  </button>
                </form>

                <Link to="/signup">
                  <p className='text-[13px] mt-4 text-center font-light'>Don't have an account? <span className='text-violet font-medium'>Sign Up</span></p>
                </Link>
                </div>
              </div>
          </div>
          
          {/* Right Side */}
          <div className='w-1/2 h-screen bg-[#000000] relative text-center'>
              <div className='z-10 absolute left-1/2 -translate-x-1/2 w-full'>
                <p className='text-[40px] mt-24 text-zinc-300 z-10'>Every tick matters</p>
                <p className='text-[40px] bg-gradient-to-b from-zinc-400 to-zinc-700 bg-clip-text text-transparent z-10'>Monitor the market in real time.</p>
              </div>
              <img src={assets.loginImg} className='absolute w-full bottom-0 z-0' alt="" />
          </div>
       </div>
    </div>
  )
}

export default Login
