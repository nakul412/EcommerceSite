import Card from '../components/Card';
import Navbar from '../components/Navbar';
import './Product.css'

const products_data = require('./../assets/Products');
const Product = () => {
    
    return (
        <>
            <Navbar />
            <div className="container products">
                {
                    products_data.map((item) => {
                        return (
                        <Card key={item.id} id={item.id} name={item.name} img={item.img} price={item.price} features={item.features} />
                        )
                    })
                }
            </div>
        </>
    )
}

export default Product
