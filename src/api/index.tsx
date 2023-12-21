

import axios from "axios"

// GET; user based task
export const getTasks = async(email:string)=>{
    try{
        const res  = await axios(`http://localhost:5000?userEmail=${email}`)
        return res.data 
    }
    catch(err){
        console.log(err)
    }
}
