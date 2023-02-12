import "bootstrap-icons/font/bootstrap-icons.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { Route, Routes, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Product from "./pages/Product";
import Cart from "./components/Cart";
import Details from "./components/Details";
function App() {
  return (
    <>
   <Routes>
      <Route exact path='/' element={<Landing />} />
      <Route exact path="/Register" element={<Register/>} />
      <Route exact path="/Login" element={<Login/>} />
      <Route exact path='/Product' element={<Product />} />
      <Route exact path='/Cart' element={<Cart/>}/>
      <Route exact path='/details/:name' element={<Details />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
    </>
  );
}

export default App;
