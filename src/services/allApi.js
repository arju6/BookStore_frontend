import apiService from "../api/apiService";


//register api
export const registerAPI=async(userData)=>{
   return await apiService('POST','/register',userData)
}

//login api
export const loginAPI=async(userData)=>{
   return await apiService('POST','/login',userData)
}

//google login
export const googleLoginAPI=async(userData)=>{
   return await apiService('POST','/google-login',userData)
}

//userprofile edit api
export const userUpdateAPI=async(userID,userData)=>{
   const token = sessionStorage.getItem('token')
   return await apiService('PUT',`/user/edit/${userID}`,userData,{
      Authorization: `Bearer ${token}`
   })
}

//add book api
export const addBookAPI=async(bookDetails)=>{
   const token = sessionStorage.getItem('token')
   return await apiService('POST','/add-book',bookDetails,{
      Authorization: `Bearer ${token}`
   })
}

//get homebooks api
export const getHomeBookAPI=async()=>{
   return await apiService('GET','/homebooks',{})
}

//get books api
export const getBooksAPI=async(searchKey)=>{
   const token = sessionStorage.getItem('token')
   return await apiService('GET',`/all-books?search=${searchKey}`,{}, {
      Authorization: `Bearer ${token}`
   })
}

///get user-books api
export const getUserBooksAPI=async()=>{
   const token = sessionStorage.getItem('token')
   return await apiService('GET','/user-books',{}, {
      Authorization: `Bearer ${token}`
   })
}


///get bought-books api
export const getBoughtBooksAPI=async()=>{
   const token = sessionStorage.getItem('token')
   return await apiService('GET','/bought-books',{}, {
      Authorization: `Bearer ${token}`
   })
}

//single book api
export const getSingleBooksAPI=async(id)=>{
   const token = sessionStorage.getItem('token')
   return await apiService('GET',`/single-book/${id}`,{}, {
      Authorization: `Bearer ${token}` })
}

//remove boook api
export const removeBookAPI=async(id)=>{
   const token = sessionStorage.getItem('token')
   return await apiService('DELETE',`/remove-book/${id}`,{}, {
      Authorization: `Bearer ${token}` })
}


//Payment API
export const paymentAPI=async(id)=>{
   const token = sessionStorage.getItem('token')
   return await apiService('GET',`/make-payment/${id}`,{}, {
      Authorization: `Bearer ${token}` })
}


export const verifyPaymentAPI=async(reqBody)=>{
   const token = sessionStorage.getItem('token')
   return await apiService('POST',`/verify-payment`,reqBody, {
      Authorization: `Bearer ${token}` })
}

//get adminbooks api
export const BooksAPI=async () =>{
   const token = sessionStorage.getItem('token')
   return await apiService('GET',`/books`,{},{
      Authorization: `Bearer ${token}` })
   
}

//book update
export const editBookStatusAPI=async (id) =>{
   const token = sessionStorage.getItem('token')
   return await apiService('PUT',`/book-update/${id}`,{},{
      Authorization: `Bearer ${token}` })
   
}

//get all user API
export const getAllUserAPI = async () => {
  const token = sessionStorage.getItem("token");
  return await apiService("GET", "/all-users", {}, {
    Authorization: `Bearer ${token}`,
  });
};

export const getAbstractAPI=async (title)=>{
   return await apiService('POST',"/book-ai",{title})
}
