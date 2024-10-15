import React,{useState} from 'react'
import Input from '../components/inputs';
import { motion } from 'framer-motion'
import {Mail, User,Lock,Loader,ArrowLeft} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../Store/authStore';
import toast from 'react-hot-toast';


const ResetPasswordPage = () => {

const navigate=useNavigate()
    const {token}=useParams()
   const [password, setpassword] = useState("")
   const [confrimpassword, setConfrimPassword] = useState("")
const [ErrorMessage, setErrorMessage] = useState("")
   const{resetPassword,isLoading,error}=useAuthStore()
  const handleSubmit=async(e)=>{
  if(password!==confrimpassword){
    setErrorMessage("Password Does Not Match")
  }
     e.preventDefault()
try {
 await resetPassword(token,password) 
 console.log(error);
 
 if(!error){
   toast.success("Your Are redirecting To Login Page in 2 Sec")
 navigate("/login")}
} catch  {
  console.log("Hello",error);
  setErrorMessage(error)
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
className='p-5'
>
<h2
className='mb-6 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text'
>Reset Password</h2>


      <Input
icon={Lock}
type="password"
placeholder="New password"
value={password}
onChange={(e)=>setpassword(e.target.value)}
/>
      <Input
icon={Lock}
type="password"
placeholder="Confrim New password"
value={confrimpassword}
onChange={(e)=>setConfrimPassword(e.target.value)}
/>
{ErrorMessage && (
            <p className="my-2 font-serif text-red-500">{ErrorMessage}</p>
          )}
<motion.button
className="w-full px-4 py-3 font-bold text-white transition duration-200 rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
type='submit'
// onSubmit={handleSubmit}
onClick={handleSubmit}
disabled={isLoading}
>
{isLoading ? <Loader className='mx-auto animate-spin' size={35} /> : "Set New Password"}
</motion.button>
  
</div>

      
    </motion.div>

  )
}

export default ResetPasswordPage