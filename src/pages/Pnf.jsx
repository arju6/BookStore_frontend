import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { routerContext } from '../context/RouterGuardContext'

function Pnf() {
  const navigate = useNavigate()
  const { authorizedUser, role } = useContext(routerContext)
  const backtoHome = () => {
    if(role==='user'){
      navigate('/')

    }else{
      navigate('/admin-dashboard')
    }
  }
  return (
    <main className="flex min-h-[100vh] items-center justify-center bg-slate-50 px-4 py-12 sm:px-6">
      <section className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-xl sm:p-10 md:p-14">
        <div
          aria-hidden="true"
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-400 text-4xl shadow-md sm:h-24 sm:w-24 sm:text-5xl"
        >
          📚
        </div>

        <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-600">
          Page not found
        </p>

        <h1 className="mt-3 text-6xl font-black tracking-tight text-slate-950 sm:text-8xl">
          404
        </h1>

        <h2 className="mt-3 text-xl font-bold text-slate-800 sm:text-2xl">
          Looks like this page is off the shelf.
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600 sm:text-base">
          The page you’re looking for may have moved, or the link might be
          incorrect. Head back to the bookstore and keep exploring.
        </p>
        {
          authorizedUser ?
            <button onClick={backtoHome} className="mt-8 inline-flex min-h-11 items-center justify-center rounded-lg bg-yellow-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-yellow-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500">
              Back to Home
            </button>
            :
            <Link
              to="/"
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-lg bg-yellow-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-yellow-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
            >
              Back to home
            </Link>
        }
      </section>
    </main>
  )
}

export default Pnf