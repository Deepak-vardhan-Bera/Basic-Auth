import { create } from "zustand";
import axios, { isCancel } from "axios";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/auth" : "/api/auth";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isCheckingAuth: true,
  data:null,

  signup: async (email, password, name) => {
    console.log("Signup calling");

    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        name,
        password,
      },{
        withCredentials: true  // Enables sending/receiving cookies
      });

      console.log(response.data); // Verify the response structure

      // Assuming the response contains user data in `response.data.user`
      set({
        user: response.data.user, // Adjust according to your API structure
        isAuthenticated: true,
        isCheckingAuth: false,
        isLoading: false,
      });
      
    } catch (error) {
      console.error("Signup error:", error);
      const errorMsg =
        error.response?.data?.message || "Error signing up. Please try again.";
      set({ error: errorMsg, isLoading: false });
      console.log("singngn",errorMsg);
      
    }
  },
  login: async (email, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/login`, { email, password });
			set({
				isAuthenticated: true,
				user: response.data.user,
				error: null,
				isLoading: false,
			});
		} catch (error) {
      console.log(">>>",error.response.data.Message);
      const msgerror=error.response.data.message
			set({ error: msgerror || "Error logging in", isLoading: false });
			throw error;
		}
	},


  verifyemail:async(code)=>{
    console.log("Verify Email calling");
    set({ isLoading: true, error: null });
try {
   const response=await axios.post(`${API_URL}/verifyemail`,{code})
    console.log(response.data);
    set({
        isLoading:false,
    })
} catch (error) {
    console.error("Signup error:", error);

      const errorMsg =
        error.response?.data?.message || "Error verfiying Email. Please try again.";
      set({ error: errorMsg, isLoading: false });
}
    
  },
  
  checkauth: async () => {
    set({ isLoading: true, error: null });
    try {
        const response = await axios.get(`${API_URL}/checkauth`, {
            withCredentials: true, // Ensure this is set to send cookies
        });
        console.log("Check Auth response:", response.data);
        set({
            user: response.data?.user,
            isLoading: false,
            isCheckingAuth: false,
            isAuthenticated: true,
        });
    } catch (error) {
        console.error("Authentication error:", error);
        const errorMsg =
            error.response?.data?.message || "Error checking authentication.";
        set({  isLoading: false, isAuthenticated: false, isCheckingAuth: false });
    }
}
,
 logout:async ()=>{
     try {
      set({isLoading:false,error:null})
     const response= axios.post(`${API_URL}/logout`, {
      withCredentials: true, // Ensure this is set to send cookies
  })
     console.log(response);
     set({isLoading:false,isAuthenticated:false,user:null})
     } catch (error) {
      console.error("Authentication error:", error);
      const errorMsg =
          error.response?.data?.message || "Error checking authentication.";
      set({ error: errorMsg, isLoading: false });

     }
 },
 
 sendResetLink:async (email)=>{
  console.log("This is email",email);

try {
  set({isLoading:true,error:null})
  const response=await axios.post(`${API_URL}/forgot-password`,{email})
  console.log("SendResetLink",response.data);
  set({isLoading:false})
} catch (error) {
  console.error("Sending error:", error);
  const errorMsg =
      error.response?.data?.message || "Error checking authentication.";
  set({ error: errorMsg, isLoading: false });
}  
},

resetPassword: async(token,password)=> {
    console.log("This is token,password",token,password);
    try {
      set({isLoading:true,error:null})
      const uri=``
      const response=await axios.post(`${API_URL}/reset-password/${token.toString()}`,{password})
      console.log("reset password response>>>",response);
      set({isLoading:false})
    } catch (error) {
      console.error("Sending error:", error);
      const errorMsg =
          error.response?.data?.message || "Error Resetting Password.";
      set({ error: errorMsg, isLoading: false }); 
    }
    
}
 
 

}));
