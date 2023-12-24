import React from 'react';
import { useDispatch } from 'react-redux';
import { getAllBrands } from '../redux/slices/productSlice';
import { deleteBrand } from '../redux/slices/productSlice';
const BrandCard = ({ brand }) => {
  const { name, _id } = brand;
  const dispatch=useDispatch()


  const handelDeleteBrand=async()=>{
        await dispatch(deleteBrand(_id))
    await dispatch(getAllBrands())
  }
  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <div className="flex space-x-4">
        
        <button onClick={handelDeleteBrand} className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">
          Delete
        </button>
      </div>
      
    </div>
  );
};

export default BrandCard;
