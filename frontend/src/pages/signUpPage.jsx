import React,{useState} from 'react'
import { motion } from 'framer-motion';
import Input from '../components/inputs';
import {Mail, User,Lock,Loader} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom';
import PasswordStrengthMeter from '../components/passwordStrengthMeter';
import { useAuthStore } from '../Store/authStore';


const SignUpPage = () => {
  console.log("Hello");
  
const [name, setname] = useState("")
const [email, setemail] = useState("")
const [password, setpassword] = useState("")
const [Error, setError] = useState()
const{signup,error,isLoading}=useAuthStore()

const navigate = useNavigate(); 


const handleSignUp = async (e) => 
    {
      console.log("Clicked signup");
      
      e.preventDefault()
      try {
        await signup(email,password,name)
        console.log("Error",error);
        
        if(!error) navigate('/verify-email')
        else setError(error)
      } 
      catch  {
        console.log("page",error);
        
        setError(error)
        console.log(error);
      }
}

    
    return (
    <motion.div
    initial={{opacity:0,y:20}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.5}}
    className='w-full max-w-md overflow-hidden bg-gray-800 bg-opacity-50 shadow-xl backdrop-filter backdrop-blur-xl rounded-2xl'    
    >
<div 
className='p-8'
>
<h2
className='mb-6 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text'
>Create Account</h2>

<form onSubmit={handleSignUp}>
<Input
icon={User}
type="text"
placeholder="Full Name"
value={name}
onChange={(e)=>setname(e.target.value)}
/>
<Input
icon={Mail}
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setemail(e.target.value)}
/>
<Input
icon={Lock}
type="password"
placeholder="password"
value={password}
onChange={(e)=>setpassword(e.target.value)}
/>


{Error&&
<p className='mt-2 font-serif text-red-500' >{Error}</p>
}
<PasswordStrengthMeter password={password} />

<motion.button
className='w-full px-4 py-3 mt-5 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
type='submit'
disabled={isLoading}
>
{isLoading ? <Loader className='mx-auto animate-spin' size={24} /> : "Sign Up"}
</motion.button>
</form>
</div>
<div className="flex justify-center w-full mt-5 bg-gray-800">
<p className='py-2 text-gray-400' >Already have an account?</p>
<p className='p-2 text-green-500 cursor-pointer hover:underline' 
onClick={()=>{navigate('/login')}}
>Log in</p>
{/* <Link to={'/login'} className='p-2 text-g'reen-500 cursor-pointer hover:underline' >Log in</Link> */}
</div>
    </motion.div>
  )
}

export default SignUpPage