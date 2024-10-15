import { motion } from 'framer-motion'
import { Loader } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../Store/authStore';
import toast from 'react-hot-toast';

const VerifyEmail = () => {

  
    const {verifyemail,isLoading,error}=useAuthStore()
    const [code, setcode] = useState(["","","","","",""])
    const inputRefs=useRef([]);
    const navigate=useNavigate();

    const handleChange=(index,value)=>{
      const newCode = [...code];

		// Handle pasted content
		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setcode(newCode);

			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
			inputRefs.current[focusIndex].focus();
		} else {
			newCode[index] = value;
			setcode(newCode);

			if (value && index < 5) {
				inputRefs.current[index + 1].focus();
			}
		}
    };
    const handleKeyDown=(index,e)=>{
      if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}};

const handlesubmit=async (e)=>{
  e.preventDefault();
  const verificationCode=code.join("");
  // alert(`verfication code submitted${verificationCode}`)
  try {
    await verifyemail(verificationCode)
    navigate('/')
    toast.success("Email Verified SuccessFully")
  } catch  {
    console.error(error);
  }
}
    
useEffect(()=>{
  // if(code.every((digit)=>digit!=="")){
  //   handlesubmit(new Event("submit"));
  // }
},[code])
    
  return (
    <>
      <motion.div
    initial={{opacity:0,y:20}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.5}}
    className='w-full max-w-md overflow-hidden bg-gray-800 bg-opacity-50 shadow-xl backdrop-filter backdrop-blur-xl rounded-2xl'    
    >
     <div
     className='p-8'
     >
      <h2 className='mb-4 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text'
 >  Verify Your Email  </h2>
    <p className='py-5 text-center text-gray-400'>Enter 6-digit code sent to your Email Address</p>
     <form className='space-y-5' onSubmit={handlesubmit} >
      <div className="flex justify-between">
      {
        code.map((digit,index)=>(
            <input 
            key={index}
            type='text'
            maxLength='6'
            ref={(el)=>{inputRefs.current[index]=el}}
            value={digit}
            onChange={(e)=>handleChange(index,e.target.value)}
            onKeyDown={(e)=>handleKeyDown(index,e)}
            className='w-12 h-12 text-2xl font-bold text-center text-white bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none' 
            />     
        ))
      }        
      </div>
      {error&&
<p className='mt-2 font-serif text-red-500' >{error}</p>
}
      <motion.button
className='w-full px-4 py-3 mt-5 font-bold text-white transition duration-200 rounded-lg shadow-lg my-7 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
type='submit'
disabled={isLoading}
>
{isLoading ? <Loader className='mx-auto animate-spin' size={24} /> : "Verify Email"}
</motion.button>
        
     </form>



      
    </div>
    </motion.div>
    </>
  )
}

export default VerifyEmail