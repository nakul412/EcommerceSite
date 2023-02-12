import { useLocation } from "react-router-dom"
import Navbar from "./Navbar";
import './Details.css'
import { useState } from "react";

const products_data = require('./../assets/Products');
const Details = () => {
    const [datasend, setdatasend] = useState();
    const [dataremove, setdataremove] = useState();
    const location_name = useLocation().state.name;
    let data = null;

    for(let elem of products_data) {
        if(elem.name === location_name) {
            data = elem;
            break;
        }
    }

    const addInCart = async (ele, value) => {
        let email = sessionStorage.getItem("email")
        const {name, img, price, features} = ele;
        const res = await fetch("/addtocart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, img, price, features, email, value
            })
        })

    }
    function addToCart(e, ele) {
        let in_cart = e.target.innerHTML;
        if (in_cart === 'Add to Cart') {
            setdatasend(ele);
            e.target.innerHTML = "Remove from Cart"
            addInCart(ele, 0);
        }
        else {
            setdataremove(ele)
            e.target.innerHTML = "Add to Cart"
            addInCart(ele, 1);
        }
    }

    return (
        <>
            <Navbar />
            <div className="container details-container">
                <img src={data.img} alt="prod_img" className="product-img" />
                <div className="details">
                    <h1 className="name">
                        {data.name}
                    </h1>
                    <p className="price">
                        MRP: &#8377;{data.price} &#40;inclusive all taxes&#41;
                    </p>
                    <div className="features">
                        <p className="feature-heading">
                            Features
                        </p>
                        <ul className="features-list">
                            {
                            data.features.map((item)=>{
                                return (
                                <li key={item} className="feature-item">
                                    {item}
                                </li>
                                )})
                            }
                        </ul>
                    </div>
                    <div className="btns">
                        <button className="my-btn" onClick={(e) => addToCart(e, data)}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Details
