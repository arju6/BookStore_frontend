import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosinstance'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { userUpdateAPI } from '../../services/allApi'

function Edit() {
    const [editStatus, seteditStatus] = useState(false)
    const [userDetails, setUserDetails] = useState({_id:"", username: "", password: "", cpassword: "", picture: "", bio: "" })
    const [existingPicture, setExistingPicture] = useState('')
    const [preview, setPreview] = useState("")
    const [imageFile, setImageFile] = useState(false)
    const [passwordMatch, setPasswordMatch] = useState(false)
    const navigate=useNavigate()

    useEffect(() => {

        if (sessionStorage.getItem("user")) {
            const user = JSON.parse(sessionStorage.getItem("user"))
            setUserDetails({ ...userDetails,_id:user._id, username: user.username, bio: user.bio })
            setExistingPicture(user.picture)
        }
    }, [])
   // console.log(userDetails);
   // console.log(existingPicture);

    const handleFileUpload = (e) => {

        const imageFile = e.target.files[0]
        if (imageFile.type.startsWith("image/")) {
            setUserDetails({ ...userDetails, picture: e.target.files[0] })
            setPreview(URL.createObjectURL(e.target.files[0]))
            setImageFile(true)
        }
        else {
            setImageFile(false)
        }


    }

    const checkPasswordMatch = (data) => {
        setUserDetails({ ...userDetails, cpassword: data })
        userDetails.password == data ? setPasswordMatch(true) : setPasswordMatch(false)

    }

    const resetProfileForm = () => {

        const user = JSON.parse(sessionStorage.getItem("user"))
        setUserDetails({ ...userDetails,_id:user._id, username: user.username, password: "", cpassword: "", picture: "", bio: user.bio })
        setExistingPicture(user.picture)

        setPreview("")
        setImageFile(false)
        setPasswordMatch(true)

    }

    const updateProfile=async()=>{
        const {username,password,cpassword,bio}=userDetails
        if(!username||!bio){
            toast.warning("Fill the frields completely!")
        }
        else if(password&&cpassword){
                     if(passwordMatch){
            const reqbody=new FormData()

            for(let key in userDetails){
                if(key!="picture"){
                reqbody.append(key,userDetails[key])
                }
                else{
                    preview?reqbody.append(key,userDetails[key]):reqbody.append(key,existingPicture)
                }
            }

            const result=await userUpdateAPI(userDetails._id,reqbody)
            console.log(result);
            if(result.status==200){
                toast.success("profile updated successfully")
                seteditStatus(false)
                navigate('/login')
                sessionStorage.clear()
            }
        }
        }
        else{
            const reqbody=new FormData()

            for(let key in userDetails){
                if(key!="picture"){
                reqbody.append(key,userDetails[key])
                }
                else{
                    preview?reqbody.append(key,userDetails[key]):reqbody.append(key,existingPicture)
                }
            }

            const result=await userUpdateAPI(userDetails._id,reqbody)
            console.log(result);
            if(result.status==200){
                toast.success("profile updated successfully")
                seteditStatus(false)
                navigate('/login')
                sessionStorage.clear()
            }
        }

    }

    return (

        <>

            <button className='bg-blue-900 text-white p-2 rounded' onClick={() => seteditStatus(true)}>Edit</button>


            {/* modal */}
            {
                editStatus &&
                <div className='relative z-10'>
                    <div className='bg-gray-500/75 inset-0 fixed'>
                        <div className='flex items-center justify-center min-h-screen p-10'>
                            <div className='md:w-250 w-full bg-white' style={{ height: '500px' }}>

                                {/* modal header */}

                                <div className='flex  text-white p-3 bg-black items-center justify-between'>
                                    <h3>Update Profile</h3>
                                    <FontAwesomeIcon icon={faXmark} onClick={() => seteditStatus(false)} />

                                </div>
                                {/* modal body */}
                                <div className='bg-sky-300 p-5'>
                                    <div className='flex justify-center items-center'>

                                        <input type="file" className='hidden' id='userPic' onChange={e => handleFileUpload(e)} />
                                        <label htmlFor="userPic">

                                            {
                                                existingPicture == "" ?
                                                    <img style={{ width: '150px', height: '150px', borderRadius: '50%' }} src={preview ? preview : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="} alt="" />
                                                    :
                                                    existingPicture.startsWith('https://1h3.googleusercontent.com') ?
                                                        <img src={preview ? preview : existingPicture} alt="" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                                                        :
                                                        <img src={preview ? preview : `${axiosInstance.defaults.baseURL}/uploads/${existingPicture}`} alt="" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />

                                            }

                                        </label>



                                    </div>
                                    {
                                        !imageFile &&
                                        <div className='text-red-400 text-center mt-3'>
                                            *only upload image files
                                        </div>}
                                    <div className='flex flex-col gap-4 mt-5'>

                                        <input value={userDetails.username} type="text" placeholder='Username' className='bg-white p-2 rounded' onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} />

                                        <input value={userDetails.password} type="password" placeholder='New Password' className='bg-white p-2 rounded' onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} />

                                        <input value={userDetails.cpassword} type="password" placeholder='Confirm Password' className='bg-white p-2 rounded' onChange={(e) => checkPasswordMatch(e.target.value)} />
                                        {
                                            !passwordMatch &&
                                            <div className='text-red-400 text-sm'>
                                                *password and confirm password must be same
                                            </div>
                                        }
                                        <textarea value={userDetails.bio} type="text" placeholder='Bio' className='bg-white p-2 rounded' onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })} />
                                    </div>


                                </div>
                                <div className='bg-white p-2 flex justify-end gap-2 text-white'>
                                    <button className='bg-gray-700 p-2 rounded' onClick={resetProfileForm}>Reset</button>
                                    <button onClick={updateProfile} className='bg-blue-700 p-2 rounded'>Update</button>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            }
        </>


    )
}

export default Edit