import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import {BarLoader} from 'react-spinners'
import { useNavigate } from 'react-router-dom';
const Onboarding = () => {
  const{user , isLoaded}=useUser();
  const navigate=useNavigate();

  const navigateUser=(currRole)=>{
    navigate(currRole==="recruiter"?"/post-job":"/jobs");
  };
  const handleRoleSelection=async(role)=>{
await user.update({
  unsafeMetadata:{role}
}).then(()=>{
  navigate(role==='recruiter'?"/post-job":"/jobs")
})
.catch((err)=>{
  console.log(err);
})
}
useEffect(()=>{
if(user?.unsafeMetadata?.role){
navigate(
  user?.unsafeMetadata?.role==='recruiter'?"/post-job":"/jobs"
)
}
},[user])
  
  if(!isLoaded){
    return <BarLoader className='mb-4 ' width={"100%"} color='#36d7b7' />
  }
  return (
    <div className='flex flex-col justify-center items-center mt-3'>
      <h2 className='tracking-tighter gradient-title font-extrabold text-7xl sm:text-8xl'> I am a...</h2>
      <div className='mt-16 grid grid-cols-2 gap-4 w-full md:px-40'>
        <Button variant="blue" className="h-36 text-2xl" onClick={()=>{handleRoleSelection("candidate")}}>Candidate</Button>
        <Button variant="destructive" className="h-36 text-2xl" onClick={()=>{handleRoleSelection("recruiter")}}>Recruiter</Button>
      </div>
    </div>
  )
}

export default Onboarding
