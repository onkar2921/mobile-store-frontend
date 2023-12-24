import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProductFromCart, getUserCart } from '../redux/slices/productSlice';

const CartItem = ({ product }) => {
  const productData = product?.product;
  const { quantity } = product;
  const dispatch = useDispatch();

  const handelRemoveCartItem = async () => {
    await dispatch(deleteProductFromCart(productData?._id));
    await dispatch(getUserCart());
  };

  if (!productData) {
    return null;
  }

  return (
    <div className="max-w-md bg-white p-6 rounded-md shadow-md">
      <img src={productData?.imageUrl} alt="Product Image" className="w-full h-32 object-cover mb-4 rounded-md" />
      <h2 className="text-xl font-bold mb-2">{productData?.name}</h2>

      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-800 font-semibold">${productData?.price}</span>
        <div className="flex items-center">
          <span className="mr-2">Quantity:</span>
          <span className="bg-gray-200 px-2 py-1 rounded-md">{quantity}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={handelRemoveCartItem}>
          Remove from Cart
        </button>
      </div>
    </div>
  );
};

export default CartItem;
