import './Card.css'
import { useState,useEffect } from 'react';
import {NavLink} from 'react-router-dom'

const CartCard = ({id, name, img, price,features,ele,setData,setSum}) => {
  const [datasend, setdatasend] = useState();
  const [dataremove, setdataremove] = useState();

 
  const addInCart = async (ele, value) => {
      var email=sessionStorage.getItem("email")
     
    const res = await fetch("/addtocart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,img,price,features,email,value
        })
    })
    
    const d=await res.json();

    const resData = await fetch("/getProducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email
        })
      })
    
      const data = await resData.json();

    setData(data.message)
    let totalPrice = 0;
    for(let elem of data.message) {
      totalPrice += elem.price;
    }

    setSum(totalPrice);
}

  function addToCart(e,ele){
    let in_cart = e.target.innerHTML;
       
            setdataremove(ele)
            
            addInCart(ele, 1);
        
  }
  return (
  
      <div className="product">
        <img className='prod-img' src={img} alt="prd-img" />
        <div className="prod-main">
          <p className="product-name">{name}</p>
              <p className="product-price">MRP: &#8377;{price} &#40;inclusive all taxes&#41;</p>
          <div className="btns">
            <NavLink key={`/details/${name.split(' ').join('')}`}
              to={`/details/${name.split(' ').join('') }`}
              state={{ name: name }}
            ><button className="my-btn">Know More</button></NavLink>
            <button className="my-btn" onClick={(e) => addToCart(e, ele)}>Remove From cart</button>
          </div>
        </div>
      </div>
  )
}

export default CartCard
