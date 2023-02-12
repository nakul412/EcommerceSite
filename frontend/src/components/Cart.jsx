import React, { useEffect, useState } from 'react'
import Card from './Card';
import Navbar from './Navbar'
import './Cart.css'
import  Cartcard from './Cartcard'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'



const Cart = () => {
  const [data,setData]=useState([]);
  const [sum, setSum] = useState(0);
  const navigate = useNavigate();
  const [content,setcontent]=useState(false)
  const addInCart = async (ele, value) => {
  const {name,price,features,img}=ele
  let email = sessionStorage.getItem("email");
   
  const res = await fetch("/addtocart", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          name,img,price,features,email,value
      })
  })

}
  useEffect(()=>{
    GetProducts();

  },[])
  const GetProducts = async () => {
    const email=sessionStorage.getItem("email");
    const res = await fetch("/getProducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email
      })
    })
  
    const data = await res.json();
    // console.log(data.message.length)
  
  
    if (data.message === "user not found" || data.message.length === 0) {
        setcontent(true);
    }
    else {
      setData(data.message);
      setcontent(false);
    }
    
    let totalPrice = 0;
    for(let elem of data.message) {
      totalPrice += elem.price;
    }

    setSum(totalPrice);
  }
  function addtocart(e, ele) {

    let text = e.target.innerHTML;
  
    addInCart(ele,1);
  }

  const placeOrder = () => {
    Swal.fire({
      title: 'Do you want to place order?',
      text: "You won't be able to cancel it later!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0a0',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Place Order!'
    }).then( async(result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Order Placed!',
          text: 'Your order has been placed!!!',
          icon: 'success',
          confirmButtonColor: '#000'
        })
        let email = sessionStorage.getItem('email');
        console.log(email);
        const res = await fetch("/emptycart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email
          })
        })
        const result = await res.json();
        if(result.message === 'done') {
          navigate('/Product');
        } else {
          console.log('not done');
        }
      } else {
        Swal.fire({
          title: 'Order not placed!',
          text: 'Your order is not placed yet!',
          icon: 'error',
          confirmButtonColor: '#000'
        })
      }
    })
  }

  return (
    <>
    <Navbar />
    <div className='cart-container container'>
    {
      data.map((ele,idx)=>{
       const {feautures,name,img,price}=ele
       return(
           <Cartcard key={idx} name={name} features={feautures} img={img} price={price} ele={ele} setData={setData} setSum={setSum}/>
       )
      })
     }
     </div>
     {
      (sum)
      ?
      <div className="totalPrice container">
        Total Price: {sum} /-
            <button className='btn btn-danger ms-4' onClick={placeOrder}>Place Order</button>
      </div>
      :
      <h1 style={{textAlign:'center', fontWeight:'bold'}}>
        Your Cart is Empty!
      </h1>
     }
     </>
  )

}

export default Cart