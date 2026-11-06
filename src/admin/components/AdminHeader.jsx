import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { routerContext } from '../../context/RouterGuardContext'
function AdminHeader() {
  const navigate = useNavigate()

  const { setAuthorizedUser } = useContext(routerContext)


  const logout = () => {
    sessionStorage.clear()
    setAuthorizedUser(false)

    navigate('/login')
  }
  return (
    <>
      <div className='flex items-center justify-between gap-2 p-2 sm:gap-4 sm:p-3'>
        <div className='flex min-w-0 items-center'>
          <img className='h-9 w-9 shrink-0 object-contain sm:h-12 sm:w-12' src="https://bookstore-wine-nu.vercel.app/logo.png" alt="" />
          <h1 className='ms-2 truncate text-lg font-bold sm:ms-3 sm:text-2xl md:text-3xl'>BOOKSTORE</h1>
        </div>

        <div className='shrink-0'>
          <button onClick={logout} className='rounded border border-black px-2 py-2 text-sm sm:px-3 sm:text-base'> <FontAwesomeIcon icon={faRightFromBracket} /> Logout</button>
        </div>
      </div>
      <nav className='w-full bg-blue-950 px-2 py-3 text-sm text-white sm:px-3 sm:text-base'>
        <marquee behavior="" direction="">
          Welcome,  Admin! You're all set to manage and monitor the system. Let's get to work!
        </marquee>
      </nav>
    </>
  )
}

export default AdminHeader