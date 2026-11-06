import { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark'
import { faCamera, faEye } from '@fortawesome/free-regular-svg-icons'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../api/axiosinstance'
import { getSingleBooksAPI, paymentAPI } from '../../services/allApi'

function ViewBook() {
  const [modalStatus,setmodalStatus]=useState(false)
  const[bookDetails,setBookDetails]=useState({})
  const {id}=useParams()
  const navigate = useNavigate()


  useEffect(()=>{
    const getBooks=async()=>{
      try {
        const res=await getSingleBooksAPI(id)
        if(res.status===200){
          setBookDetails(res.data)
        }
      } catch(error) {
        console.error("Failed to load book details",error)
      }
    }

    getBooks()
  },[id])

  const makepayment=async ()=>{
    const res=await paymentAPI(id)
    console.log(res);
    if(res.status==200){
      const {checkoutURL}=res.data
      window.location.href=checkoutURL
    }

  }
  return (
    <>
      <UserHeader />

      <div className='md:m-10 m-5 '>

        <div className='p-5 border shadow rounded-3xl'>

          <div className='md:grid grid-cols-3 gap-15'>

            {/* Book Image */}
            <div className='col-span-1'>
              <img
                src={bookDetails.imageUrl}
                alt={bookDetails.title || "Book cover"}
                className='w-60 rounded-2xl'
              />
            </div>

            {/* Book Information */}
<div className='col-span-2'>

  {/* Book Title */}
  <div className='flex items-center justify-between'>
    <div>
      <h3 className='font-bold text-3xl'>
        {bookDetails.title}
        
      </h3>
      <p className='text-sm text-indigo-500 font-semibold mt-2' style={{color:'#EC2627'}}>
        - {bookDetails.author}
      </p>
    </div>

    

    <div>
      <button onClick={()=>setmodalStatus(true)}>
      <FontAwesomeIcon icon={faEye}/>
    </button>
    </div>
    
  </div>
  

  {/* Book Details */}
  <div className='grid md:grid-cols-3 gap-5 mt-10 text-sm font-semibold'>

    <div>
      <p>Publisher : {bookDetails.publisher}</p>

      <p className='mt-4'>
        Seller Mail : {bookDetails.sellerEmail}
      </p>
    </div>

    <div>
      <p>Language : {bookDetails.language}</p>

      <p className='mt-4'>
        Real Price : ${bookDetails.price}
      </p>
    </div>

    <div>
      <p>No. of pages : {bookDetails.pages}</p>

      <p className='mt-4'>
        ISBN : {bookDetails.isbn}
      </p>
    </div>

  </div>

  {/* Description */}
  <div className='mt-10 text-sm font-semibold leading-5'>
    <p>
      {bookDetails.abstract}
    </p>
  </div>

  {/* Buttons */}
  <div className='flex justify-end gap-4 mt-12'>

    <button className='bg-indigo-500 text-white px-7 py-3 rounded-full' style={{backgroundColor:'black'}} onClick={() => navigate('/all-books')}>
     <FontAwesomeIcon icon={faBackward}/> Back
    </button>

    <button className='bg-green-600 text-white px-7 py-3 rounded-full' style={{backgroundColor:'#EC2627'}} onClick={makepayment}>
      Buy Now
    </button>

  </div>

</div>

          </div>

        </div>

      </div>

      {/* modal */}
      {modalStatus && <div className='relative z-10'>
        <div className='bg-gray-500/75 inset-0 fixed'>
            <div className='flex items-center justify-center min-h-screen'>
              <div className='bg-white ' style={{height:'500px'}}>
                {/* modal header */}
                <div className='flex text-white bg-black item-center justify-between p-3'>
                  <h3>Book images</h3>
<button onClick={()=>setmodalStatus(false)}>
                    <FontAwesomeIcon icon={faXmark}/>
  
</button>    
                </div>
                {/* modla body */}
                <div className='bg-white p-5'>
                  <p className='text-blue-600'>   <FontAwesomeIcon icon={faCamera}/>  Camera clicks of the books in the seller hands</p>
                <div className="flex flex-wrap justify-center gap-4 p-5">
  {bookDetails?.uploadImages?.map((filename) => (
    <img
      key={filename}
      src={`${axiosInstance.defaults.baseURL.replace(/\/$/, "")}/uploads/${filename}`}
      alt="Additional book photo"
      className="w-48 h-48 object-contain rounded-xl"
    />
  ))}
</div>
    
                </div>
              </div>
            </div>


        </div>

      </div>}
    </>
  )
}

export default ViewBook