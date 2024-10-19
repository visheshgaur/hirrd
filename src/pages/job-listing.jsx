
import { useSession, useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { getJobs } from '@/api/apiJobs'
import useFetch from '@/hooks/use-fetch'
import { useState } from 'react'  
import { BarLoader } from 'react-spinners'
import JobCard from '@/components/job-card'
import { getCompanies } from '@/api/apiCompanies'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { State } from 'country-state-city'

const JobListing = () => {
 
  const [searchQuery,setSearchQuery]=useState("");
  const [location,setLocation]=useState("");
  const [company_id,setCompany_id]=useState("");
const {isLoaded}=useUser()

const clearFilters=()=>{
  setLocation("")
  setCompany_id("")
  setSearchQuery("")  
}
const {fn:fnJobs,

  data:jobs,
  loading:loadingJobs
}=useFetch(getJobs,{
  location,
  company_id,
  searchQuery,
})

const {fn:fnCompanies,

  data:companies,
 
}=useFetch(getCompanies)
useEffect(()=>{
  if(isLoaded){
   fnCompanies()
  }
},[isLoaded])

useEffect(()=>{
  if(isLoaded){
    fnJobs()
  }
  fnJobs()
},[isLoaded,location,company_id,searchQuery])

const handleSearch=(e)=>{
e.preventDefault();
let formData= new FormData(e.target);
const query=formData.get("search-query");
if(query){
  setSearchQuery(query)
}
}

if(!isLoaded){
  return <BarLoader className='mb-4 ' width={"100%"} color='#36d7b7' />
}

  return (
    <div >
      <h1 className='font-extrabold gradient-title text-6xl sm:text-8xl text-center pb-8'>Latest Jobs</h1>
      <form onSubmit={handleSearch} className='flex h-14 mb-4 gap-2 items-center'>
  <Input type="text" placeholder="Search jobs by title"  name="search-query" className="h-full flex-1 px-4 text-md" ></Input>
  <Button variant="blue" className="h-full sm:w-28" type="submit">Search</Button>
 </form>
 <div className='flex flex-col sm:flex-row gap-2'>
 <Select value={location} onValueChange={(value)=>setLocation(value)}>
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
    <Select value={company_id} onValueChange={(value)=>setCompany_id(value)}>
      <SelectTrigger >
        <SelectValue placeholder="Filter By Company" />
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
    <Button  onClick={clearFilters}variant="destructive" className="sm:w-1/2">Clear Filters</Button>
 </div>
      {loadingJobs&& (
        <BarLoader className='mt-4 ' width={"100%"} color='#36d7b7' />
      )}
 {loadingJobs===false&&(
  <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
    {jobs?.length?(
      jobs.map((job)=>{
        return <JobCard  key={job.id} job={job}     savedInit={job?.saved?.length>0}/>
    
      })
    ):(
      <div> No Jobs Found </div>
      )}
      </div>
    )}
 
    </div>
  )
}


export default JobListing