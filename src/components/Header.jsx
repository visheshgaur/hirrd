import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignIn, SignInButton, SignInWithMetamaskButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react'
import { BriefcaseBusinessIcon, Heart, PenBox } from 'lucide-react'


const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false)
  const [search,setSearch]=useSearchParams();
  const {user}=useUser()

  useEffect(()=>{
    if(search.get('sign-in')){
      setShowSignIn(true);
    }
  },[search])
  const handleOverlayClick=(e)=>{
if(e.target===e.currentTarget) {
  setShowSignIn(false)
  setSearch({})
}
 
  }

  return (
    <>
    <nav className='py-4 flex justify-between items-center '>
        <Link>
        <img src="/logo.png" className='h-20'></img>
        </Link>
      
       <div className='flex gap-8'>
       <SignedOut>
        <Button variant="outline" onClick={()=>setShowSignIn(true)}>Login</Button>
       </SignedOut>
       
      <SignedIn>
        {user?.unsafeMetadata?.role==='recruiter' && (
 <Link to="/post-job">
 <Button variant="destructive" className="rounded-full">
   <PenBox Size={20} className='mr-2'/>
   Post Job
   </Button>
 
 </Link>
        )}
       
        <UserButton appearance={{
          elements:{
            avatarBox:"w-10 h-10"
          }
        }}>
          <UserButton.MenuItems>
            <UserButton.Link
            label='My Jobs'
            labelIcon={<BriefcaseBusinessIcon size={15}/>}
            href="/my-jobs"/>
            <UserButton.Link
            label="Saved Jobs"
            labelIcon={<Heart size={15}/>}
            href='/saved-job'/>
          </UserButton.MenuItems>
         
        </UserButton>
      </SignedIn>
       </div>
    </nav>

    {showSignIn&& <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'onClick={handleOverlayClick}>
      <SignIn 
      signUpForceRedirectUrl='/onboarding'
      fallbackRedirectUrl='/onboarding'/>
      </div>}
    </>
  )
}

export default Header