import { motion } from 'framer-motion'
import React,{useState} from 'react'
import Input from '../components/inputs';
import {Mail, User,Lock,Loader,ArrowLeft} from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../Store/authStore';


const ForgotPassword = () => {
  const [email, setemail] = useState("");
  const [isSent, setisSent] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null); 
  const navigate=useNavigate();
  const{sendResetLink,isLoading,error}=useAuthStore()
  
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
      await setTimeout(setisSent(true),1000)
     await sendResetLink(email)
    } catch {
      console.log(error);
      setErrorMessage(error)
    }
    
  }
  
  
  return (
    <div  >
   <motion.div
    initial={{opacity:0,y:20}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.5}}
    className='w-full max-w-md overflow-hidden bg-gray-800 bg-opacity-50 shadow-xl backdrop-filter backdrop-blur-xl rounded-2xl'    
    >

      
<div 
className='p-5'
>
<h2
className='mb-6 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text'
>Forgot Password</h2>
<p className='py-2 text-center text-gray-400'>Enter Your Email Address And we will send a you a reset link to reset your password</p>

<Input
icon={Mail}
type="email"
placeholder="Enter Your Email"
value={email}
onChange={(e)=>setemail(e.target.value)}
/>
{errorMessage && (
            <p className="mt-2 font-serif text-red-500">{errorMessage}</p>
          )}

{isSent?

<p className="text-center text-white cursor-pointer" >
        {`if an Account Exist For ${email}, you will Recieve a password reset link shortly`}</p>

:
  <motion.button
className="w-full px-4 py-3 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
type='submit'
// onSubmit={handleSubmit}
onClick={handleSubmit}
disabled={isLoading}
>
{isLoading ? <Loader className='mx-auto animate-spin' size={35} /> : "Send Reset Link"}
</motion.button>
}



</div>

<div className="flex flex-row justify-center w-full py-2 bg-gray-800">
<ArrowLeft color='green' size={25} />
        <p className="text-gray-400 cursor-pointer " onClick={() => navigate('/login')}>
        
          Back to login</p>
       
      </div>
</motion.div>
  



    </div>
  )
}

export default ForgotPassword