import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAllBrands } from '../redux/slices/productSlice';
import BrandCard from './BrandCard';
import { createBrand } from '../redux/slices/productSlice';

const BrandOptions = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const getAllBrandsQuery = async () => {
    await dispatch(getAllBrands());
  };

  useEffect(() => {
    getAllBrandsQuery();
  }, []);

  const [newBrand,setNewBrand]=useState({
    name:"",
    country:""
  })

  const handelChange=(e)=>{
    const {name,value}=e.target
    setNewBrand({
        ...newBrand,[name]:value
    })
  }

  const handelCreateBrand=async(e)=>{
        e.preventDefault()
        await dispatch(createBrand(newBrand))
        getAllBrandsQuery()
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="w-screen text-center text-2xl font-bold mb-4">Available Brands</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {state.product.allBrands.length > 0 &&
          state.product.allBrands?.map((item) => (
            <BrandCard key={item._id} brand={item} />
          ))}
      </div>

      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-4">Create New Brand</h1>
        <form className="flex items-center space-x-4" onSubmit={handelCreateBrand}>
          <input
            type="text"
            name="name"
            value={newBrand.name}
            placeholder="Brand Name"
            className="p-2 border rounded-md w-full"
            onChange={handelChange}
            required
          />
          <input
            type="text"
            name="country"
            value={newBrand.country}
            placeholder="Country"
            className="p-2 border rounded-md w-full"
            onChange={handelChange}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default BrandOptions;
