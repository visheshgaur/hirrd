import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Card } from './ui/card';
import { MapPinIcon, Trash2Icon } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';   
import { IoMdHeart } from "react-icons/io";
import useFetch from '@/hooks/use-fetch';
import { saveJob } from '@/api/apiJobs';
import { useState,useEffect } from 'react';
import { deleteJob } from '@/api/apiJobs';
import { BarLoader } from 'react-spinners';

const JobCard = ({
    job,
    isMyJob=false,
    savedInit=false,
    onJobSaved=()=>{},
}) => {
    const [saved,setSaved]=useState(    savedInit);
    const {fn:fnSavedJob,data:savedJob, loading:loadingSavedJob
      }=useFetch(saveJob,{
        alreadySaved:saved,
      });
      

    const {user}=useUser();
    const handleSaveJob=async ()=>{
await fnSavedJob({
    user_id:user.id,
    job_id:job.id,
})
onJobSaved()
    }

const{
    loading:loadingDeleteJob,
    fn:fnDeleteJob
}=useFetch(deleteJob,{
    job_id:job.id,
});

const handleDeleteJob=async ()=>{
await fnDeleteJob();
onJobSaved();
}




    useEffect(() => {
    if(savedJob!=undefined) setSaved(savedJob?.length>0)
    }, [savedJob])
    

   
  return <Card className="flex flex-col "   >
    {loadingDeleteJob&&(
        <BarLoader className='mb-4 ' width={"100%"} color='#36d7b7' />
    )}
        <CardHeader>
            <CardTitle className="flex justify-between font-bold">{job.title}
                {isMyJob&&(
                    <Trash2Icon onClick={handleDeleteJob} fill="red" size={18} className='text-red-300 cursor-pointer' ></Trash2Icon>
                )}
            </CardTitle>
        
        </CardHeader>
        <CardContent className="flex flex-col gap-2 flex-1">
            <div className=' flex justify-between'>
                {job.company&&<img src={job.company.logo_url} className='h-6'></img>}
                <div className='flex gap-2 items-center'>
                    <MapPinIcon size={15}></MapPinIcon>{job.location}
                </div>
            </div>
            <hr></hr>
                {job.description.substring(0,job.description.indexOf('.'))}
        </CardContent>
        <CardFooter className="flex gap-2">
            <Link to={`/job/${job.id}`} className='flex-1'>
           <Button variant="secondary" className="w-full">View Details</Button>
            </Link>
           {!isMyJob&&(
               <Button variant="outline" className="w-full" onClick={handleSaveJob} disabled={loadingSavedJob}>
  {saved?(
    <IoMdHeart size={18} stroke="red" fill='red'/>
  ):(
    <IoMdHeart size={18} />
  )} 
               </Button>
               )}
          
          
        </CardFooter>
    </Card>
  
}

export default JobCard