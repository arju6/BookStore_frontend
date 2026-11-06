import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Route,Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Home from './user/pages/Home'
import {useContext, useEffect,useState} from 'react'
import Preloader from './components/Preloader'
import Auth from './pages/Auth'
import AllBooks from './user/pages/AllBooks'
import Contact from './user/pages/Contact'
import Profile from './user/pages/Profile'
import ViewBook from './user/pages/ViewBook'
import Dashboard from './admin/pages/Dashboard'
import Resource from './admin/pages/Resource'
import Settings from './admin/pages/Settings'
import Pnf from './pages/Pnf'
import UserHeader from './user/components/UserHeader'
import PaymentSuccessful from './user/pages/PaymentSuccessful'
import PaymentFail from './user/pages/PaymentFail'
import { routerContext } from './context/RouterGuardContext'


function App() {
  const{role}=useContext(routerContext)
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    setTimeout(() => {
        setLoading(false)
    }, 5000);
  },[])

  return (
    <>
    <Routes>
      <Route path='/' element={loading?<Preloader/>:<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/signup' element={<Auth register={true}/>}/>
      <Route path='/all-books' element={<AllBooks/>}/>
      <Route path='/contact' element={<Contact/>}/>

    { 
      role=='user' &&
      <>
      <Route path='/profile/:id' element={<Profile/>}/>
      <Route path='/view/:id/book' element={<ViewBook/>}/>
      <Route path="/success" element={<PaymentSuccessful />}/>
      <Route path="/cancel" element={<PaymentFail/>}/>
      </>
      }

      {
        role=='admin' &&
        <>
      <Route path='/admin-dashboard' element={<Dashboard/>}/>
      <Route path='/admin-resources' element={<Resource/>}/>
      <Route path='/admin-settings' element={<Settings/>}/>
        </>

      }

      <Route path='/*' element={<Pnf/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App