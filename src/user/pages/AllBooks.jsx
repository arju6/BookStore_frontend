import React, { useState } from 'react'
import UserHeader from '../components/UserHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { getBooksAPI } from '../../services/allApi'
import { useContext } from 'react'
import { SearchContext } from '../../context/SearchContext'

function AllBooks() {
  const [listStatus,setListStatus]=useState(false)
  const [token,setToken]=useState("")
  const [allBooks, setAllBooks] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [dummyallBooks, setDummmyAllBooks] = useState([])
const { searchKey, setSearchKey } = useContext(SearchContext)
  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      setToken(sessionStorage.getItem('token'))
    }
    getBooks()
  },[searchKey])

  const getBooks = async () => {
    const res = await getBooksAPI(searchKey);
    if (res.status == 200) {
        setAllBooks(res.data);
        setDummmyAllBooks(res.data)
        const tempCategoryList=res.data.map(bk=>bk.category)
        setCategoryList([...new Set(tempCategoryList)])
    }
};

const filterBooks=(category)=>{
  console.log(category);
  if(category!='all'){
    setAllBooks(dummyallBooks?.filter(book=>book.category==category))
  }
  else{
    getBooks()
  }
}
  
  
  return (
    <>
      <UserHeader />
    { token ?
     <>
        <section className='flex justify-center items-center flex-col'>
        <div>
          <div className='flex flex-col items-center'>
            <h1 className='text-3xl mt-5 font-bold'>Collections</h1>
            <div className='mt-3 flex'>
              <input value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} type="text" placeholder='Search by Title' className='border p-1 ps-3' />
              <button className='bg-sky-500 p-1 ps-5 pe-5 text-white '>Search</button>
            </div>
          </div>

          {/* <div className='md:flex'> */}
          <div className='grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 mt-5'>
            <div>
                <h3 className='text-2xl font-bold'>Filter</h3>
              <div className='md:flex flex-col'>
               {
                categoryList?.map(cat=>(
                   <div className='mt-3 '>
                  <input onClick={()=>filterBooks(cat)} type="radio" name="" id="" /> <label htmlFor="">{cat}</label>
                </div>
                ))
               }
                <div>
                  <input onClick={()=>filterBooks('all')} type="radio" name="" id="" /> <label htmlFor="">No Filter</label>
                </div>
                
              </div>
            </div>

            {/* <div className='md:grid grid-cols-4 mt-3'> */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
             {  
             allBooks?.length > 0 ?
             allBooks?.map(book=>(
                <div className="p-3">
  <div hidden={book?.status=='Pending' || book?.status=='Sold'} className="shadow p-3 rounded text-center h-[420px] flex flex-col">
    <Link
      to={`/view/${book._id}/book`}
      className="h-64 w-full flex items-center justify-center"
    >
      <img
        src={book.imageUrl}
        alt={book.title}
        className="h-full w-full object-contain"
      />
    </Link>
    <h3 className="mt-3">{book.author}</h3>
    <h3 className="font-bold line-clamp-1">{book.title}</h3>
    <Link
      to={`/view/${book._id}/book`}
      className="w-full bg-blue-700 text-white p-1 mt-auto"
    >
      Buy-{book.price}
    </Link>
  </div>
</div>
             ))
             :
             <p className='font-bold text-center my-3'>Loading.....</p>
              
              }

            </div>

          </div>
        </div>
      </section>
      </>
      :
      <div className='min-h-screen flex justify-center items-center flex-col'>
        <img className='w-50' src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="" />
        <h4 className='mt-10 text-xl font-bold'>Please <Link className='text-blue-600 underline' to={'/login'}>Login</Link>to explore more......</h4>
      </div>
      }
      
    </>
  )
}

export default AllBooks
