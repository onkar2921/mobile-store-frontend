import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import Cart from "./pages/Cart";
import SingleProduct from "./pages/SingleProduct";
import Dashboard from "./pages/Dashboard";
import PrivateEntry from "./components/PrivateEntry";
function App() {
  const [user, setUser] = useState(false);

  const verifyUser = () => {
    const storedUser = localStorage.getItem("user");
    const userId = JSON.parse(storedUser)?._id;

    if (userId) {
      setUser(true);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
       
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={ user?<Cart/>:<Login/>}></Route>
        <Route path="/singleProduct/:productId" element={user?<SingleProduct/>:<Login/>}></Route>
        <Route path="/dashboard" element={user?<Dashboard/>:<Login/>}></Route>
      </Routes>
    </>
  );
}

export default App;
