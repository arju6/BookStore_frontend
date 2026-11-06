import { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Edit from '../components/Edit'
import { toast,ToastContainer } from 'react-toastify'
import { addBookAPI, getAbstractAPI, getBoughtBooksAPI, getUserBooksAPI, removeBookAPI } from '../../services/allApi'
import ProfileImage from '../../components/ProfileImage'

function Profile() {
  const [sellbookStatus, setsellbookStatus] = useState(true)
  const [bookStatus, setbookStatus] = useState(false)
  const [purchaseStatus, setpurchaseStatus] = useState(false)
  const [editStatus, seteditStatus] = useState(false)
  const [uploadBooks,setUploadBooks]= useState([])
  const [userDp, setuserDp] = useState('')
  const [userName, setuserName] = useState('')
  const [userBio, setuserBio] = useState('')
  const [bookDetails,setBookDetails]=useState({title:"",author:"",pages:"",imageUrl:"",price:"",discountPrice:"",abstract:"",publisher:"",isbn:"",language:"",category:"",uploadImages:[]})
  const [preview,setPreview]=useState("")
  const [previewList,setPreviewList]=useState([])
  const [purchasedBooks,setpurchasedBooks] = useState([])
  const [purchaseHistoryLoading, setPurchaseHistoryLoading] = useState(false)
  const [purchaseHistoryError, setPurchaseHistoryError] = useState(false)
  const [abstractLoading, setAbstractLoading] = useState(false)

  console.log(bookDetails);
  console.log(preview);
  console.log(previewList);
  
  

  useEffect(() => {

    if (sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"))
      setuserDp(user.picture)
      setuserName(user.username)
      setuserBio(user.bio)

    }
    
  },[])

  useEffect(()=>{
    if(bookStatus){
      getUserBooks()
    }
    else if(purchaseStatus){
      userBoughtBook()
    }
  },[bookStatus,purchaseStatus])

  useEffect(()=>{
    const title = bookDetails.title.trim()
    if(!title) return
    let active = true
    const timer = setTimeout(()=>{
      if(!active) return
      setAbstractLoading(true)
      getAbstractAPI(title)
        .then((res)=>{
          if(!active) return
          if(res.status!==200 || !res.data?.success || !res.data?.content){
            throw new Error("Gemini did not return an abstract.")
          }
          setBookDetails(current=>({...current,abstract:res.data.content}))
        })
        .catch((error)=>{
          if(active){
            const message = error.response?.data?.message ||
              (typeof error.response?.data === "string" ? error.response.data : "Unable to generate a book abstract.")
            toast.error(message)
          }
        })
        .finally(()=>{
          if(active) setAbstractLoading(false)
        })
    },500)

    return ()=>{
      active = false
      clearTimeout(timer)
    }
  },[bookDetails.title])

  const getUserBooks=async()=>{
    try {
      const res=await getUserBooksAPI()
      if(res.status===200){
        setUploadBooks(res.data)
      }
    } catch (error) {
      toast.error(error.response?.data || "Unable to load your uploaded books.")
    }
  }
  // console.log(userName);
  // console.log(userDp);
  // console.log(userBio);
 


const handleFileUpload=(e)=>{
  const imgFile=e.target.files[0]
    setBookDetails({...bookDetails,uploadImages:[...bookDetails?.uploadImages,imgFile]})
    const url=URL.createObjectURL(imgFile)
    setPreview(url)
    setPreviewList([...previewList,url])
}

const resetForm=()=>{
  setAbstractLoading(false)
  setBookDetails({title:"",author:"",pages:"",imageUrl:"",price:"",discountPrice:"",abstract:"",publisher:"",isbn:"",language:"",category:"",uploadImages:[]})
  setPreview("")
  setPreviewList([])
}

const handleAddBook=async(e)=>{
  e.preventDefault()
  const  {title,author,pages,imageUrl,price,discountPrice,abstract,publisher,isbn,language,category,uploadImages}=bookDetails
  if(!title || !author || !pages || !imageUrl || !price || !discountPrice || !abstract || !publisher || !isbn || !language || !category || uploadImages.length===0){
      toast.warning("Fill the form completely")
      return
  }
  else{
    const reqBody = new FormData()
    for(let key in bookDetails){
      if(key!="uploadImages"){
        reqBody.append(key,bookDetails[key])
      }
      else{
        bookDetails.uploadImages.forEach(file=>{
          reqBody.append("uploadImages",file)
        })
      }
    }
    try {
      const result=await addBookAPI(reqBody)
      if(result.status===200){
        toast.success("Book added successfully")
        resetForm()
        getUserBooks()
      }
    }
    catch(error) {
      toast.error(error.response?.data || "Unable to add book. Please log in and try again.")
    }
  }
}

const removeBook=async(id)=>{
  
    const res=await removeBookAPI(id)
    if(res.status===200){
      toast.success("Book deleted successfully")
      getUserBooks()
  } 
}

const userBoughtBook=async()=>{
  setPurchaseHistoryLoading(true)
  setPurchaseHistoryError(false)
  try {
    const res=await getBoughtBooksAPI()
    if(res.status===200 && Array.isArray(res.data)){
      setpurchasedBooks(res.data)
    } else {
      throw new Error("Unexpected purchase history response.")
    }
  } catch (error) {
    setPurchaseHistoryError(true)
    toast.error(error.response?.data || "Unable to load your purchase history.")
  } finally {
    setPurchaseHistoryLoading(false)
  }
}
  return (
    <>
      <UserHeader />
      <div className='bg-gray-900' style={{ height: '200px' }}>
      </div>
      <div style={{ width: '230px', height: '230px', borderRadius: '50%', marginLeft: '70px', marginTop: '-130px' }}>
        <ProfileImage picture={userDp} style={{ width: '200px', height: '200px', borderRadius: '50%' }} alt="User profile" />
      </div>
      <div className='mx-10 my-5'>
        <div className='flex justify-between items-center '>
          <h1 className='font-bold text-2xl'>{userName}</h1>
          <Edit />
          {/* <button className='bg-blue-900 text-white p-2 rounded' onClick={() => seteditStatus(true)}>Edit</button> */}

        </div>
        <p className='p-5 text-justify text-xl'>
          {userBio == "" ? "No Bio" : userBio}
        </p>
        {/* tabs */}
        <div className='flex items-center justify-center gap-5'>
          <p onClick={() => {
            setsellbookStatus(true);
            setbookStatus(false);
            setpurchaseStatus(false)
          }} className={sellbookStatus ? 'text-blue-800 border p-2 rounded' : 'text-black p-2'}>Sell Book</p>
          <p onClick={() => {
            setsellbookStatus(false);
            setbookStatus(true);
            setpurchaseStatus(false)
            getUserBooks()
          }} className={bookStatus ? 'text-blue-800 border p-2 rounded' : 'text-black p-2'}>Book Status</p>
          <p onClick={() => {
            setsellbookStatus(false);
            setbookStatus(false);
            setpurchaseStatus(true)
          }} className={purchaseStatus ? 'text-blue-800 border p-2 rounded' : 'text-black p-2'}>Purchase History</p>
        </div>
        {/* contents */}
        {/* sell books */}
        {
          sellbookStatus &&
          <div className='h-screen bg-white p-10'>
            <div className='bg-gray-400 text-center p-5 rounded w-full'>
              <h1 className='font-bold text-xl'>Book Details</h1>
              <form onSubmit={handleAddBook} className='md:grid grid-cols-2'>
                <div className='md:p-4'>
                  <input value={bookDetails.title} onChange={(e)=>{setAbstractLoading(false);setBookDetails({...bookDetails,title:e.target.value,abstract:""})}} type="text" placeholder='Title' className='w-full bg-white p-2 mt-4 rounded' />

                  <input value={bookDetails.author} onChange={(e)=>setBookDetails({...bookDetails,author:e.target.value})} type="text" placeholder='Author' className='w-full bg-white p-2 mt-4 rounded' />

                  <input value={bookDetails.pages} onChange={(e)=>setBookDetails({...bookDetails,pages:e.target.value})} type="text" placeholder='No of Pages' className='w-full bg-white p-2 mt-4 rounded' />

                  <input value={bookDetails.imageUrl} onChange={(e)=>setBookDetails({...bookDetails,imageUrl:e.target.value})} type="text" placeholder='Image URL' className='w-full bg-white p-2 mt-4 rounded' />

                  <input value={bookDetails.price} onChange={(e)=>setBookDetails({...bookDetails,price:e.target.value})} type="text" placeholder='Price' className='w-full bg-white p-2 mt-4 rounded' />

                  <input value={bookDetails.discountPrice} onChange={(e)=>setBookDetails({...bookDetails,discountPrice:e.target.value})} type="text" placeholder='Discount Price' className='w-full bg-white p-2 mt-4 rounded' />
                </div>
                <div className='md:p-4'>
                  <input value={bookDetails.publisher} onChange={(e)=>setBookDetails({...bookDetails,publisher:e.target.value})} type="text" placeholder='Publisher' className='w-full bg-white p-2 mt-4 rounded' />

                  <input value={bookDetails.language} onChange={(e)=>setBookDetails({...bookDetails,language:e.target.value})} type="text" placeholder='Language' className='w-full bg-white p-2 mt-4 rounded' />

                  <input value={bookDetails.isbn} onChange={(e)=>setBookDetails({...bookDetails,isbn:e.target.value})} type="text" placeholder='ISBN' className='w-full bg-white p-2 mt-4 rounded' />

                  <input value={bookDetails.category} onChange={(e)=>setBookDetails({...bookDetails,category:e.target.value})} type="text" placeholder='Category' className='w-full bg-white p-2 mt-4 rounded' />

                  <input value={bookDetails.abstract} onChange={(e)=>setBookDetails({...bookDetails,abstract:e.target.value})} type="text" placeholder={abstractLoading ? 'Generating abstract...' : 'Abstract'} className='w-full bg-white p-2 mt-4 rounded' />


                {/* upload boook image */}
                  <div className='md:p-10 p-5 flex justify-center items-center' >
                    <label htmlFor="img">
                      <input onChange={(e)=>handleFileUpload(e)} type="file" name="img1" id="img" className='hidden' multiple />
                      <img src={preview?preview:"https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png"} alt="" height={'100px'} width={'100px'} />
                    </label>
                  </div>

                  {/* display uploaded images*/}
                 {
                  preview&&
                  <div className='md:p-10 p-5 flex justify-center items-center' >  
                      {
                        previewList?.map(url=>(
                          <img src={url} className='mx-2' alt="" height={'70px'} width={'70px'} />
                        ))
                      }
                     {
                     previewList?.length<3 &&
                      <label htmlFor="img">
                      <input onChange={(e)=>handleFileUpload(e)} type="file" name="img1" id="img" className='hidden' multiple />
                      <FontAwesomeIcon icon={faPlus} className='ms-5 text-3xl'/>
                    </label>
                    }
                  </div>
                  }


                  <div className='flex justify-end'>
                    <button type="button" className='bg-gray-500 p-3 ' onClick={resetForm}>RESET</button>
                    <button type="submit" className='bg-blue-500 p-3 ms-2'>SUBMIT</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        }
        {
          bookStatus &&
          <div className='p-10 my-20 shadow rounded'>
            {uploadBooks.length > 0 ? uploadBooks.map(bk=>(
              <div className='p-5 mt-4 bg-gray-300 rounded' key={bk._id}>
                <div className='md:grid grid-cols-[3fr_1fr] items-center gap-6'>
                  <div className='px-4'>
                    <h1 className='text-2xl'>{bk.title}</h1>
                    <h3 className='text-xl'>{bk.author}</h3>
                    <h3 className='text-lg text-blue-600 font-bold'>Price: {bk.price}</h3>
                    <p className='text-justify'>{bk.abstract}</p>
                    <div className='mt-4'>
                      {bk.status === 'Pending' && (
                        <img
                          src="https://media.istockphoto.com/vectors/red-rubber-stamp-icon-on-transparent-background-vector-id851180540?k=20&m=851180540&s=612x612&w=0&h=pzXsrANYtP_gAE2qfH9jCd7rOoO7jbV-NqSdzWd4Q74="
                          alt="Pending"
                          className='w-25'
                        />
                      )}
                      {bk.status === 'Rejected' && (
                        <img
                          src="https://tse4.mm.bing.net/th/id/OIP.IdZ5DE_sZqAbSG7hs3Tn6wHaHa?r=0&w=900&h=900&rs=1&pid=ImgDetMain&o=7&rm=3"
                          alt="Rejected"
                          className='w-25'
                        />
                      )}
                      {bk.status === 'Approved' && (
                        <img
                          src="https://tse4.mm.bing.net/th/id/OIP.IdZ5DE_sZqAbSG7hs3Tn6wHaHa?r=0&w=900&h=900&rs=1&pid=ImgDetMain&o=7&rm=3"
                          alt="Rejected"
                          className='w-25'
                        />
                      )}
                    </div>
                  </div>
                  <img src={bk.imageUrl} alt={bk.title} className='w-50' />
                </div>
                <div className='mt-4 flex justify-end'>
                  <button
                    type="button"
                    onClick={() => removeBook(bk?._id)}
                    className='rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700'
                  >
                    Delete
                  </button>
                </div>
              </div>
            )) : <p>No books uploaded yet!</p>}
          </div>
        }
        {
          purchaseStatus &&
          <div className='h-min-50  p-10 my-20 shadow rounded'>
           { 
             purchaseHistoryLoading ?
             <p>Loading purchase history...</p>
             : purchaseHistoryError ?
             <div>
               <p>Unable to load purchase history.</p>
               <button type="button" onClick={userBoughtBook} className='mt-2 text-blue-700 underline'>
                 Try again
               </button>
             </div>
             : purchasedBooks.length>0 ?
             purchasedBooks?.map(bk=>(
              <div className='p-5 mt-4 bg-gray-300 rounded'>
              <div className='md:grid grid-cols-[3fr_1fr] items-center'>
                <div className='px-4'>
                  <h1 className='text-2xl'>{bk?.title}</h1>
                  <h3 className='text-xl'>{bk?.author}</h3>
                  <h3 className='text-lg text-blue-600 font-bold'>{bk?.price}</h3>
                  <p className='text-justify'>{bk?.abstract}</p>
                  <div className='mt-5'>
                    <img src="https://th.bing.com/th/id/OIP.AdUlbcljs1Kf7BpLG0fMaAHaHD?w=173&h=180&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3" alt="" className='w-25' style={{ borderRadius: "50%" }} />
                  </div>
                </div>
                <div className='px-4 mt-4 md:mt-0'>
                  <img src={bk?.imageUrl} alt="" className='w-50' />
                </div>
              </div>
            </div>
             ))
            :
            <p>No Books purchased yet!</p>
            }
          </div>
        }


      </div>


<ToastContainer position="top-center" theme="colored" autoClose={3000}></ToastContainer>
    </>
  )
}

export default Profile
