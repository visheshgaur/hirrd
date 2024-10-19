import { useState } from 'react'
import { useSession } from '@clerk/clerk-react'

const useFetch=(cb, options={})=>{

    const [data, setdata] = useState(undefined);
    const [loading, setloading] = useState(null);
    const [error, seterror] = useState(null);
    const {session}= useSession()

 const fn=async(...args)=>{
  setloading(true);
  seterror(null);
  try {
    const supabaseAccessToken=await session.getToken({
        template:'supabase',
    });
    const response=await cb(supabaseAccessToken,options,...args)
    setdata(response)
    seterror(null)
  } catch (error) {
    
    seterror(error)
    
  }
  finally{
    setloading(false)
  }
  
}
 return {fn,data,loading,error}
};
export default useFetch;






