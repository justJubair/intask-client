

import axios from "axios"

// GET; user based task
export const getTasks = async(email:string)=>{
    try{
        const res  = await axios(`https://intask-server.vercel.app/tasks?userEmail=${email}`)
        return res.data 
    }
    catch(err){
        console.log(err)
    }
}
