import { useState,useEffect } from 'react'
import './App.css'
import {logout,login} from './store/authSlice'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {Header,Footer} from './components'
import { Outlet } from 'react-router-dom'

function App() {

  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect( () => {
     authService.getCurrentUser()
     .then( (userData)=> {
       if (userData) {
         dispatch(login({userData}))
       } else {
          dispatch(logout() )
       }
     })
     .finally( () => {
      setLoading(false)
     })
  },[])
  

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-900'>
      <div className='w-full block'>
        <Header />
        <main className='w-full p-4 text-center text-xl text-white font-bold'>
        All Posts:  <Outlet  />
        
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App