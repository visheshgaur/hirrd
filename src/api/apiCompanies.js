import supabaseClient from "@/utils/supabase";
import { supabaseUrl } from "@/utils/supabase";

export async function getCompanies(token){
    const supabase=await supabaseClient(token)

    const {data,error}= await supabase
    .from("companies")
   .select("*")
    if(error){
        console.log("error fetching companies ",deleteError)
        return null;
        }
        return data
}
export async function addNewCompany(token,_,companyData){
    const supabase=await supabaseClient(token)

    
    
        const random=Math.floor(Math.random()*9000);
        const fileName=`logo-${random}-${companyData.name}`;
    
    const {error:storageError}=await supabase.storage.
    from("company-logo")
    .upload(fileName,companyData.logo);
    if(storageError){
        console.log("error uploading companylogo",storageError)
        return null;
    }
    const logo_url=`${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`;

    const {data,error}= await supabase
    .from("companies")
    .insert([{
        name:companyData.name,
        logo_url
    }])
   .select()
    if(error){
        console.log("error submitting company ",error)
        return null;
        }
        return data
}