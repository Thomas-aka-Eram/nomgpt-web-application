const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getRequest = async(url:string)=>{
    const response = await fetch(url);
    const data = await response.json();


    if(!response.ok){
        let message = "Error occurs!";

        if(data?.message){
            message = data.message;
        }else{
            message = data;
        }
        return {error:true, message}
    }
    return data;
}
