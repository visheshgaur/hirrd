import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import useFetch from '@/hooks/use-fetch'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Textarea } from '@/components/ui/textarea'
import { getCompanies } from '@/api/apiCompanies'
import { State } from 'country-state-city'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useUser } from '@clerk/clerk-react'
import BarLoader from 'react-spinners/BarLoader'
import { Navigate, useNavigate } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor'
import { Button } from '@/components/ui/button'
import { addNewJob } from '@/api/apiJobs'
import AddCompany from '@/components/addCompany'
const schema=z.object({
  title:z.string().min(1,{message:"title is required"}),
  description:z.string().min(1,{message:"Description is required"}),
  
  location:z.string().min(1,{message:"location is required"}),
  
company_id:z.string().min(1,{message:"select or add a new company"}),
  
 requirements:z.string().min(1,{message:"requirements is required"}),
  
})
const PostJob = () => {


  const{isLoaded,user}=useUser()
 const navigate = useNavigate()
 const{register,
  control,
  handleSubmit
  ,formState:{errors},
} =useForm({
    defaultValues:{
      location:"",
      company_id:"",
      requirements:"",
    },
    resolver:zodResolver(schema),
  })
  const {fn:fnCompanies,data:companies,loading:loadingCompanies}=useFetch(getCompanies)
  useEffect(()=>{
    if(isLoaded)fnCompanies();
  },[isLoaded])

  const {
    loading:loadingCreateJob,
    error:errorCreateJob,
    data:dataCreateJob,
    fn:fnCreateJob,

  }=useFetch(addNewJob);

  const onSubmit=(data)=>{
    fnCreateJob({
      ...data,
      recruiter_id:user.id,
      isOpen:true,
    });
  };
useEffect(()=>{
if(dataCreateJob?.length>0){
  navigate("/jobs")
}
  

},[loadingCreateJob])

  if(!isLoaded||loadingCompanies){
    return <BarLoader className='mb-4 ' width={"100%"} color='#36d7b7' />
  }
  if(user?.unsafeMetadata?.role !=="recruiter"){
    return <Navigate to="/jobs"></Navigate>
  }
  return (
    <div>
      <h1 className='gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8'>Post a Job</h1>
      <form  onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 p-4 pb-0'>
        <Input placeholder="Job Title" {...register("title")}/>
        {errors.title&&<p className='text-red-500'>{errors.title.message}</p>}
     
      <Textarea placeholder='job Description' {...register("description")}/>
      {errors.description&&(
        <p className='text-red-500'>{errors.description.message}</p>
      )}
      <div className='flex gap-4 items-center'>
        <Controller
        name="location"
        control={control}
        render={({field})=>(
          <Select 
          value={field.value}
           onValueChange={field.onChange}
          >
          <SelectTrigger >
            <SelectValue placeholder="Filter By Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
            {State.getStatesOfCountry("IN").map(({name})=>{
              return (
               <SelectItem  key={name}value={name}>{name}</SelectItem>
              );
            })}
             </SelectGroup>
          </SelectContent>
        </Select>
        )}>

        </Controller>

     
     <Controller
     name="company_id"
     control={control}
     render={({field})=>(
      <Select 
      value={field.value} 
      onValueChange={field.onChange}
      >
        <SelectTrigger >
          <SelectValue placeholder="Filter By Company" >
           { field.value?companies.find((com)=>com.id===Number(field.value))?.name:"Company"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
          {companies?.map(({ name, id })=>{
            return (
             <SelectItem  key={name} value={id}>
             {name}
             </SelectItem>
            );
          })}
           </SelectGroup>
        </SelectContent>
      </Select>
     )}
     ></Controller>
    
    <AddCompany  fetchCompanies={fnCompanies}/>
    </div>
    {errors.location&&(
      <p className='text-red-500'>{errors.location.message}</p>
    )}

    {errors.company_id&&(
      <p className='text-red-500'>{errors.company_id.message}</p>
    )}
  <Controller
        name="requirements"
        control={control}
        render={({field})=>(
          <MDEditor value={field.value} onChange={field.onChange}/>
        )}/>
        {errors.requirements&&(
          <p className='text-red-500'>{errors.requirements.message}</p>
        )}
        {errorCreateJob?.message&&(
          <p className='text-red-500'>{errorCreateJob}</p>)}
        {loadingCreateJob&&<BarLoader className='mb-4 ' width={"100%"} color='#36d7b7' />}
        <Button variant="blue" type="submit"  size="lg" className="mt-2">Post Job</Button>
  

    </form>
    </div>
  )
}

export default PostJob