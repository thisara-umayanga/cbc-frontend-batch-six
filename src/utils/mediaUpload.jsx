const url = "https://louoahviogttbffchvuv.supabase.co"

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvdW9haHZpb2d0dGJmZmNodnV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxOTYyNjgsImV4cCI6MjA2Nzc3MjI2OH0.oHh0BRH4qTWICIpICv2UWqeDZY_Qet9LWU3DDtc-bac"

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(url,key)

export default function uploadFile(file){
    const promise  = new Promise(

        (resolve, reject)=>{

            if(file == null){
                reject("Please select a file to upload");
                return;
            }

            const timeStamp = new Date().getTime();
            const fileName = timeStamp+"-"+file.name

            supabase.storage.from("images").upload(fileName,file,{
                cacheControl: "3600",
                upsert: false
            }).then(
                ()=>{
                    const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
                    resolve(publicUrl)
                }
            ).catch(
                ()=>{
                    reject("Failed to upload file");
                }
            )
            

        }

    )
    return promise;
}

