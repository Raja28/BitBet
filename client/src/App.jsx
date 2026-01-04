import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {


  return (
    <div className='min-h-screen  bg-gray-100 flex flex-col items-center'>
      <div className='w-11/12'>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>

  )
}

export default App
