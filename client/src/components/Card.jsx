import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/productSlice';
const Card = ({ product }) => {
  const dispatch=useDispatch()

  const handelAddToCart=async(productId)=>{

      await dispatch(addToCart(productId))
  }
  return (
    <div className="border border-gray-300 rounded overflow-hidden shadow-lg m-4 max-w-xs">
      <img className="w-full h-40 object-cover" src={product?.imageUrl} alt={product?.name} />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{product?.name}</h2>
        <p className="text-sm text-gray-600 mb-2">Brand: {product?.brand?.name}</p>
        <p className="text-lg font-bold text-blue-500 mb-2">${product?.price}</p>
        {/* <p className="text-sm text-green-600">In Stock: {product?.stock}</p> */}
        <div className="flex justify-between mt-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 m-2" onClick={()=>{
            handelAddToCart(product?._id)
          }}>Add To Cart</button>
          <Link to={`/singleProduct/${product?._id}`}>
            <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 m-2">View More</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;




        {/* <p className="text-sm text-gray-600 mb-2">{product?.specifications?.display}</p>
        <p className="text-sm text-gray-600 mb-2">{product?.specifications?.memory}</p>
        <p className="text-sm text-gray-600 mb-2">{product?.specifications?.os}</p>
        <p className="text-sm text-gray-600 mb-2">{product?.specifications?.processor}</p>
        <p className="text-sm text-gray-600 mb-2">{product?.specifications?.type}</p> */}