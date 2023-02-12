import './Card.css'
import { useState,useEffect } from 'react';
import {NavLink} from 'react-router-dom'

const Card = ({id, name, img, price,features}) => {
  const [datasend, setdatasend] = useState();
  const [dataremove, setdataremove] = useState();

  let email=sessionStorage.getItem("email")
  const addInCart = async ( value) => {
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
  function addToCart(e){
    let in_cart = e.target.innerHTML;
        if (in_cart === 'Add to Cart') {
            setdatasend();
            e.target.innerHTML = "Remove from Cart"
            addInCart( '0');
        }
        else {
            setdataremove()
            e.target.innerHTML = "Add to Cart"
            addInCart( '1');
        }
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
            <button className="my-btn" onClick={(e) => addToCart(e)}>Add to Cart</button>
          </div>
        </div>
      </div>
  )
}

export default Card
