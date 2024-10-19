import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({children}) => {

    const{isSignedIn,isLoaded,user}=useUser()
    const{pathname}=useLocation()

    if(isLoaded&&!isSignedIn&&isSignedIn!==undefined){
     return <Navigate to="/?sign-in=true"></Navigate>;
    }
    if(user!==undefined&&!user?.unsafeMetadata?.role&&pathname!=='/onboarding'){
        return <Navigate to="/onboarding"></Navigate>;
        
    }

    return children;
  
   
  
};

export default ProtectedRoute