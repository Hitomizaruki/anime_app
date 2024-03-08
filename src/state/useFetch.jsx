import { useEffect, useState } from "react";
import axios from "axios";



export const useFetch=(url)=>{
    
   
    const [state,setState]=useState({
        isLoading:false,
        isError:false,
        post:null
    })
    const fetchData=async()=>{
        try {

            setState({post:null,isError:false,isLoading:true})
            const response = await axios.get(`${url}`);
            setState({...state,post:response.data,isLoading:false})

        } catch (error) {

            console.error(error);
            setState({post:null,isError:true,isLoading:false})
    
        }
    }
    useEffect(()=>{
        fetchData()
    },[url])

    return state
}