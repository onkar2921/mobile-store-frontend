import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserCart } from "../redux/slices/productSlice";
import CartItem from "../components/CartItem";
import { placeOrderQuery } from "../redux/slices/userSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const getUserCartData = async () => {
    await dispatch(getUserCart());
  };
  const [totalAmount, setTotalAmount] = useState(0);

  const calcTotalAmt = () => {
    if (state?.product?.userCartData.length > 0) {
      const sum = state.product.userCartData.reduce((total, item) => {
        return item?.product && total + item?.product?.price;
      }, 0);

      setTotalAmount(sum);
    }
  };
  useEffect(() => {
    getUserCartData();
    calcTotalAmt();
  }, [state?.product?.userCartData]);

  const handelPlaceOrder=async()=>{
    await dispatch(placeOrderQuery())
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className=" w-full text-center text-3xl font-bold mb-8 text-gray-800">
        Your Cart
      </h1>

      {state?.product?.userCartData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state?.product?.userCartData?.map((item) => (
            <CartItem key={item._id} product={item} />
          ))}
          <div className="flex flex-col items-center mt-8">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300" onClick={handelPlaceOrder}>
              Place Order
            </button>
            <p className="text-lg mt-4">Total Amount: $ {totalAmount}</p>
          </div>
        </div>
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          <p className="text-gray-500  text-3xl mt-4 p-4 border border-gray-300 rounded-md bg-white shadow-md">
            Oops! Your cart is empty.
            <span role="img" aria-label="Sad Face" className="ml-2">
              😢
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Cart;
