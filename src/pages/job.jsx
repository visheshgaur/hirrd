import React, { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useParams } from 'react-router-dom';
import useFetch from '@/hooks/use-fetch';
import { BarLoader } from 'react-spinners';
import { getSingleJob } from '@/api/apiJobs';
import { Briefcase, MapPin } from 'lucide-react';
import { DoorClosed } from 'lucide-react';
import { DoorOpen } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import { updateHiringStatus } from '@/api/apiJobs';
import ApplicationCard from '@/components/application-card';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ApplyJobDrawer from '@/components/ui/apply-job';
const JobPage = () => {
  const {isLoaded,user}=useUser();
  const {id}=useParams();

  const {
    loading:loadingJob,
    data:job,
    fn:fnJob,
  }=useFetch(getSingleJob,{
    job_id:id,
  });
  useEffect(()=>{
    if(isLoaded)fnJob();
  },[isLoaded]);
  
  const {loading:loadingHiringStatus, fn:fnHiringStatus}=useFetch(
    updateHiringStatus,
    {
      job_id:id,
    }
  );

  const handleStatusChange=(value)=>{
    const isOpen=value==="open";
    fnHiringStatus(isOpen).then(()=>fnJob());
  };
 

  if(!isLoaded||loadingJob){
return <BarLoader className='mb-4 ' width={"100%"} color='#36d7b7' />
  }
  return (
    <div className='flex flex-col gap-8 mt-5'>
      <div className='flex flex-col-reverse gap-6 md:flex-row justify-between items-center'>
        <h1 className='font-extrabold gradient-title text-5xl pb-3 text-4xl sm:text-6xl'>{job?.title}</h1>
        <img src={job?.company?.logo_url}  className =" h-12"alt={job?.title} />
      </div>
      <div className='flex justify-between'>
<div className='flex gap-2 items-center'>
  <MapPin />
  {job?.location}
  </div>
  <div className='flex gap-2'>
    <Briefcase/>{job?.applications?.length} Applicants
  </div>
  <div className='flex gap-2'>
   {job?.isOpen?(
    <><DoorOpen/>Open</>
   ):(<><DoorClosed/>Closed</>
  )}
  </div>
      </div>
      {/* hiring status */}

      {job?.recruiter_id===user?.id &&(
        <Select  onValueChange={handleStatusChange}>
      <SelectTrigger className={`w-full ${job?.isOpen?"bg-green-950":"bg-red-950"}`}>
        <SelectValue placeholder={"Hiring status" + (job?.isOpen?"(Open)":"(Closed)")} />
      </SelectTrigger>
      <SelectContent>
        
       
    
           <SelectItem  value="open">Open</SelectItem>
           <SelectItem  value="closed">Closed</SelectItem>
         
      </SelectContent>
    </Select>
  )
        
      }
      <h2 className='text-2xl sm:text-3xl font-bold'>About the Job</h2>
   <p className='sm:text-lg'>{job?.description}</p>
   <h2 className='text-2xl sm:text-3xl font-bold'>
   What we are looking For</h2>
   <MDEditor.Markdown className='bg-transparent sm:text-lg'
   source={job?.requirements}/>

   {/* render applications */}

   {job?.recruiter_id!==user?.id&&(<ApplyJobDrawer
   job={job} 
   user={user}
    fetchJob={fnJob}
   applied={job?.applications?.find((ap)=>ap.candidate_id===user.id)}
   />
   )}
   {job?.applications.length>0&&job?.recruiter_id===user?.id&&(
    <div className='flex flex-col gap-4'>
      <h2 className='text-2xl sm:text-3xl font-bold'>Applications</h2>
      {job?.applications.map((application)=>{
        return <ApplicationCard key={application.id} application={application}/>
      })}
    </div>
   )
     
   }
    </div>
  
   )
  }

export default JobPage