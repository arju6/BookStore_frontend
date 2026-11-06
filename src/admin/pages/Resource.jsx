import React, { useState } from "react";
import Adminheader from "../components/AdminHeader";
import Sidebar from "../components/Sidebar";
import { BooksAPI, editBookStatusAPI, getAllUserAPI } from "../../services/allAPI";
import { useEffect } from "react";
import axiosInstance from "../../api/axiosinstance";

const defaultProfileImage = "/user-placeholder.svg";


function Resource() {
  const [BookList, setBookList] = useState(true);
  const [UserList, setUserList] = useState(false);
  const [allBooks,setAllBooks]=useState([])
  const [users,setUsers]=useState([])
  
  useEffect(()=>{
    if(BookList){
     getBooks()
    }
   else{
      getUsers()
   }
    
  },[BookList,UserList])

  const getBooks=async()=>{
    const res=await BooksAPI()
    console.log(res);
    setAllBooks(res.data)
  }

  const updateBookStatus= async (id)=>{
    const res =await editBookStatusAPI(id)
    console.log(res);
    if(res.status==200){
      getBooks()
    }
  }

  const getUsers=async ()=>{
    const res=await getAllUserAPI()
    console.log(res);
    setUsers(res.data)
    
  }

  return (
    <>
      <Adminheader />
      <div className="md:grid md:grid-cols-[minmax(14rem,1fr)_3fr]">
        <div className="col-span-1"> 
          <Sidebar />
        </div>
        <div className="min-w-0 md:col-span-1 p-5">
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-bold text-2xl">All Resoruces</h1>
            {/* tabs */}
            <div className="flex items-center justify-center gap-5 mt-5">
              <p
                onClick={() => {
                  setBookList(true);
                  setUserList(false);
                }}
                className={
                  BookList
                    ? "text-blue-800 border p-2 rounded"
                    : "text-black p-2"
                }
              >
                Book List
              </p>
              <p
                onClick={() => {
                  setBookList(false);
                  setUserList(true);
                }}
                className={
                  UserList
                    ? "text-blue-800 border p-2 rounded"
                    : "text-black p-2"
                }
              >
                Users
              </p>
            </div>
          </div>

          {BookList && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {
                allBooks?.length>0 ?
                allBooks?.map(book=>(
                  <div key={book?._id} className="h-full p-3">
                <div className="h-full min-h-[480px] shadow p-3 rounded text-center flex flex-col">
                  <div className="h-64 w-full shrink-0 flex items-center justify-center">
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="h-full w-full object-contain"
                  />
                  </div>
                  <h3 className="min-h-7">{book.author}</h3>
                  <h3 className="min-h-14">{book.title}</h3>
                  <h3 className="min-h-7 text-blue-900">${book.price}</h3>
                  {
                    book?.status!='Approved' ?
                    <button onClick={()=>updateBookStatus(book?._id)} className='mt-auto h-[70px] w-full bg-blue-900 text-white p-2 rounded'>Approve</button>
                    :
                    <img src="https://media.istockphoto.com/id/1416145560/vector/green-circle-with-green-tick-flat-ok-sticker-icon-green-check-mark-icon-tick-symbol-in-green.jpg?s=612x612&w=0&k=20&c=Uh3KS7c_o5QmrfisyV-aRzDUNqtAM7QUVJrc8bniVsQ=" alt="Approved" className="mt-auto mx-auto h-[70px] w-[70px]" />
                    }
                </div>
              </div>
                ))

                :
                <p>Loading</p>

              }
            </div>
          )}

          {
            UserList &&
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 p-5'>
            {  
            users?.length >0 ?
            users.map(user=>(
                    <div key={user?._id} className='min-w-0 rounded bg-gray-300 p-4'>
                <h4 className='mb-3 text-red-800 font-bold text-sm break-all'>ID: {user?._id}</h4>
                <div className='flex min-w-0 items-center gap-3'>
                  <img
                    className='h-20 w-20 shrink-0 rounded-full object-cover'
                    src={
                      !user?.picture
                        ? defaultProfileImage
                        : /^https?:\/\//i.test(user.picture)
                          ? user.picture
                          : `${axiosInstance.defaults.baseURL.replace(/\/+$/, "")}/uploads/${encodeURIComponent(user.picture)}`
                    }
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = defaultProfileImage;
                    }}
                    alt={`${user?.username || "User"} profile`}
                    height='100px'
                    width='100px'
                    style={{ borderRadius: '50%' }}
                  />
                  <div className='min-w-0 flex-1'>
                    <h2 className='font-bold break-words'>{user?.username}</h2>
                    <h3 className='font-bold text-sm break-all'>{user?.email}</h3>
                  </div>
                </div>

              </div>
            ))
            :

            <p>Loading</p>

              }

            </div>
          }
        </div>
      </div>
    </>
  );
}

export default Resource;
