import {NavLink, useNavigate} from 'react-router-dom'
import './Navbar.css'
import { useState,useEffect } from 'react';
import Swal from 'sweetalert2'

const Navbar = () => {
const Navigate=useNavigate();
    const name = sessionStorage.getItem('name');
    const [login,setlogin]=useState("false");
    useEffect(() => {
     setlogin(sessionStorage.getItem("login"))  
    }, [])
    
    const logout = () =>{
        sessionStorage.clear()
        setTimeout(() => {
            Swal.fire(
                'Logged Out!',
                'You have been logged out!',
                'success'
            )
        }, 1000);
    }

  return (
      <nav className="navbar navbar-expand-md bg-body-tertiary">
          <div className="container">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <b className="navbar-brand">Ecommerce Site</b>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        <i className='bi bi-house-door-fill'></i>
                          <NavLink className={className=>className.isActive?'nav-link active': 'nav-link'} aria-current="page" to='/'>Home</NavLink>
                      </li>
                      <li className="nav-item">
                          <i className='bi bi-phone-fill'></i>
                          <NavLink className={className=>className.isActive?'nav-link active': 'nav-link'} aria-current="page" to='/product'>Products</NavLink>
                      </li>
                      <li className="nav-item">
                          <i className='bi bi-cart-fill'></i>
                          <NavLink className={className=>className.isActive?'nav-link active': 'nav-link'} aria-current="page" to='/cart'>Cart</NavLink>
                      </li>
                      {
                          (login === 'true') ? 
                          <li className="nav-item user" key={name}>
                              <i className='bi bi-person-fill'></i>
                              <a className='nav-link' to='/'>{name}</a>
                          </li> :
                          <></>
                      }
                      <li className='nav item user'> 
                      {(login=="true")?<a href="/"><button onClick={logout} className="btn btn-dark">Logout</button></a>:
                      ""}
                      
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
  )
}

export default Navbar
