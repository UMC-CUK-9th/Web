import axios from "axios";
import { useEffect, useState } from "react";

interface ApiResponse<T>{
    data:T|null;  
    isLoading:boolean;
    isError:boolean;
}
type Language="ko-KR" | "en-US";
function useCustomFetch<T>(url : string, language:Language='en-US'):ApiResponse<T> {
const [data, setData] = useState<T|null>(null);

const [isLoading,setIsLoading]=useState(false);

const [isError,setIsError]=useState(false);

useEffect(()=>{
    const fetchData=async()=>{
        setIsLoading(true);
        try{
            const {data}= await axios.get<T>(url,{
                headers:{
                    Authorization:`Bearer ${import.meta.env.VITE_KEY}`,
                },
                params:{
                    language,
                }
            });
            setData(data);
        }catch{
            setIsError(true);
        }finally{
            setIsLoading(false);
        }
    }
    fetchData();
},[url,language]);

    return {data, isLoading,isError};
}
export default useCustomFetch;