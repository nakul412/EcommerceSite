import Navbar from '../components/Navbar'
import {Link} from 'react-router-dom'
import './Landing.css'
import { useEffect,useState} from 'react'

const Landing = () => {
  const [login,setlogin]=useState("false")
  useEffect(() => {
      setlogin(sessionStorage.getItem("login"))
      console.log(login)
  }, [])
  
  return (
    <div className='landing-page'>
      <Navbar />
      <main className='main'>
        <div className="heading-container">
          <div className="heading">
            Ecommerce site
          </div>
          <div className="heading-sub">
            This ecommerce site helps you discover a wide range of home electronics with cutting-edge technology including smartphones, tablets from low-end to high-end devices.
          </div>
        </div>
        <div className="login-btns">
          {(login==="true")?<Link className='btn btn-warning' to='/Product'>Start Exploring</Link>:
          <Link className='btn btn-primary' to='/Login'>Login</Link>
}
        </div>
      </main>
    </div>
  )
}

export default Landing
