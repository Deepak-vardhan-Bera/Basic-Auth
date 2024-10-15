import React, { useEffect, useState } from 'react';
import FloatingShape from './components/FloatingShape';
import SignUpPage from './pages/signUpPage';
import LoginPage from './pages/loginPage';
import { Route,Routes,Navigate } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import VerifyEmail from './pages/VerifyEmail';
import {Toaster} from 'react-hot-toast'
import { useAuthStore } from './Store/authStore'
import LoadingSpinner from './components/LoadingSpinner';
import DashboardPage from './pages/Dashboard';
import ResetPasswordPage from './pages/ResetPasswordPage';

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();
console.log("proected>>",user);

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isverified) {
    
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();
console.log("Redirect>>>",user);

	if (isAuthenticated && user?.isverified) {
		return <Navigate to='/' replace />;
	}

	return children;
};

function App() {
  

  const{checkauth,isAuthenticated,isCheckingAuth}=useAuthStore()
 

  
useEffect(()=>{
  checkauth()
  console.log("is authenicated:",isAuthenticated);
  // function getCookie(name) {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop().split(';').shift();
  //   return null;
  // }
  
  // // Example usage to check if token exists
  // const token = getCookie('token');
  // if (token) {
  //   console.log('Token found in cookies:', token);
  // } else {
  //   console.log('Token not found in cookies');
  // }
  // ;
},[checkauth])


if (isCheckingAuth) return <LoadingSpinner />;
  return (
    <div
      className='relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900'
    >
      <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
      <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
      <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
     {isCheckingAuth&&<LoadingSpinner/>}
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <DashboardPage/>
           </ProtectedRoute>
          }/>
        <Route path='/signUp' element={
          <RedirectAuthenticatedUser>
             <SignUpPage/>
          </RedirectAuthenticatedUser>
         }/>
        <Route path='/login' element={
                    <RedirectAuthenticatedUser>
<LoginPage/>
</RedirectAuthenticatedUser>
}/>
        <Route path='/forgot-password' element={
                    <RedirectAuthenticatedUser>

          <ForgotPassword/>
          </RedirectAuthenticatedUser>
        }/>
        <Route path='/verify-email' element={
                    <RedirectAuthenticatedUser>

          <VerifyEmail/>
          </RedirectAuthenticatedUser>
        }/>
        <Route path='/reset-password/:token' element={
                    <RedirectAuthenticatedUser>
          <ResetPasswordPage/>
          </RedirectAuthenticatedUser>
        }/>
          <Route path='*' element={
                      <ProtectedRoute>

        <DashboardPage/>
        </ProtectedRoute>

        } />
      </Routes>
    
      <Toaster/>
    </div>
  );
}

export default App;
