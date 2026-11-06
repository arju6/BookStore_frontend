import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {ToastContainer,toast} from 'react-toastify'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { googleLoginAPI, loginAPI, registerAPI } from '../services/allApi'
import { routerContext } from '../context/RouterGuardContext'
import { useContext } from 'react'



function Auth({ register }) {
  const{setRole,setAuthorizedUser}=useContext(routerContext)
  const navigate=useNavigate()

  const formik=useFormik({
    initialValues:{
      username:'',
      email:'',
      password:''
    },
    validationSchema:Yup.object({
      username:register
        ? Yup.string().min(3,"Must be 3 atleast charecters").required("Required")
        : Yup.string(),
      email:Yup.string().email("Invalid email").required("Required"),
      password:Yup.string().required("Required")
    }),
    onSubmit:async(values,{resetForm})=>{
      try{
        if(register){
          await handleRegister(values)
        }else{
          await handleLogin(values)
        }
        resetForm()
      }catch(error){
        const responseData=error.response?.data
        const message=typeof responseData==='string'
          ? responseData
          : responseData?.message || (error.request
            ? "Unable to connect to the server. Please try again."
            : "Something went wrong. Please try again.")
        toast.error(message)
      }
    }
  })

  const handleRegister=async(userData)=>{
    const result=await registerAPI(userData)
    if(result.status==200){
        toast.success("Registration successfull please login")
        navigate('/login')
    }
  }

  const handleLogin=async(userData)=>{
    const result=await loginAPI(userData)
    if(result.status==200){
      toast.success("Login Successfull!!")
      sessionStorage.setItem("user",JSON.stringify(result.data.user))
      sessionStorage.setItem("token",result.data.token)
      setAuthorizedUser(true)
      if(result.data.user.role=='admin'){
        setRole('admin')
        navigate('/admin-dashboard')
        
      }
      else{
        setRole('user')
        navigate('/')

      }
    }
    else{
      toast.error(result.response)
    }
  }



  const handleGoogleLogin=async(credentialResponse)=>{
    console.log("inside google login");
    console.log(credentialResponse);
    const {name,email,picture}=jwtDecode(credentialResponse.credential)
    
    try{
      const res=await googleLoginAPI({username:name,email,password:"googlepassword",picture})
      if(res.status==200){
        toast.success("Login Successfull!!")
        sessionStorage.setItem("user",JSON.stringify(res.data.user))
        sessionStorage.setItem("token",res.data.token)
        setAuthorizedUser(true)
        setTimeout(() => {
          setRole('user')
          navigate('/')
        }, 2500);
      }
    }catch(error){
      const responseData=error.response?.data
      toast.error(typeof responseData==='string'
        ? responseData
        : responseData?.message || "Unable to sign in with Google. Please try again.")
    }
  }

  return (
    <section id='signup' className='w-full min-h-screen bg-[url(/auth.jpg)] bg-cover bg-center flex justify-center items-center flex-col'>
      <div className='w-full flex items-center justify-center flex-col p-10'>
        <div className='flex justify-center items-center flex-col bg-gray-950/50 rounded-3xl text-white p-5 w-2/4' >
        <h1 className='text-4xl font-bold text-white p-4'>BOOK STORE</h1>

          <FontAwesomeIcon icon={faUser} style={{ borderRadius: '50%' }} className='border rounded p-5 text-white text-6xl' />
          {register ?
            <h3 className='text-white mt-3 text-xl'>Register</h3> :
            <h3 className='text-white mt-3 text-xl'>Login</h3>
          }
          <form className='w-full' onSubmit={formik.handleSubmit}>
          {register &&
            <div className='mt-5 w-full'>
              <input name='username' onChange={formik.handleChange} value={formik.values.username} type="text" className='bg-white text-black placeholder-gray-700 px-2 py-2 rounded-xl w-full' placeholder='User Name' />
            </div>
          }
          <div className='mt-5 w-full'>
            <input name='email' onChange={formik.handleChange} value={formik.values.email} type="email" autoComplete="email" className='bg-white text-black placeholder-gray-700 px-2 py-2 rounded-xl w-full' placeholder='Email Id' />
          </div>
          <div className='mt-5 w-full'>
            <input name='password' onChange={formik.handleChange} value={formik.values.password} type="password" autoComplete={register ? "new-password" : "current-password"} className='bg-white text-black placeholder-gray-700 px-2 py-2 rounded-xl w-full' placeholder='Password' />
          </div>
          <p className='text-yellow-500 mt-3'>*Never share password with others</p>
          {register ?
            <button type='submit' className='bg-green-900 text-white p-2 w-full mt-2 rounded'>Signup</button>

            :
            <button type='submit' className='bg-green-900 text-white p-2 w-full mt-2 rounded'>Login</button>

          }
          </form>
          {
            !register&&
            <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
    handleGoogleLogin(credentialResponse)
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
          }

          {register ?
            <p className='text-white mt-2 text-center'>Are you already user? <Link className='text-blue-700 underline' to={'/login'}>Login</Link></p>
            :
            <p className='text-white mt-2 text-center'>Are you already user? <Link className='text-blue-700 underline' to={'/signup'}>Signup</Link></p>
          }

        </div>

          {/*toaster */}
          <ToastContainer position='top-center' theme='colored' autoClose={3000}/>

      </div>
      

    </section>

    
  )
}

export default Auth