import axios from 'axios'

const axiosInstance=axios.create({
    baseURL:'https://bookstore-server-26is.onrender.com',
    timeout:10000
})

//request interceptors:handling token append to headers

axiosInstance.interceptors.request.use(
    (config)=>{
        const token=sessionStorage.getItem("token")
        if(token){
            config.headers.Authorization=`Bearer ${token}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response)=>{
        console.log("response received");
        return response
    },
    (error)=>{
        if(error.response){
            const status=error.response.status
            if(status==401){
                console.log("Un-Authorized"); 
            }
            else if(status==404){
                console.log("API not found");   
            }
            else if(status==500){
                console.log("server error!");             
            }
        } else if(error.request){
            console.log("Client error");
        } else{
            console.log("Error"+error.message);
        }
        return Promise.reject(error)
    }
)

export default axiosInstance