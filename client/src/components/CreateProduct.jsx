import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../redux/slices/productSlice';
import { getAllBrands } from '../redux/slices/productSlice';
import { useSelector } from 'react-redux';
export default function CreateProduct({ handelCreateProduct }) {
  const dispatch = useDispatch();
  const state=useSelector((state)=>state)

  const [productState, setProductState] = useState({
    name: '',
    brand: '',
    price: '',
    specifications: {
      type: '',
      display: '',
      processor: '',
      memory: '',
      os: '',
    },
    stock: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('specifications.')) {
      // Handle nested specifications object
      const specName = name.split('.')[1];
      setProductState((prevProductState) => ({
        ...prevProductState,
        specifications: {
          ...prevProductState.specifications,
          [specName]: value,
        },
      }));
    } else {
      setProductState((prevProductState) => ({
        ...prevProductState,
        [name]: value,
    }));
    // console.log("value",value)
    }
  };

 

  const handleCreateProductForm = async (e) => {
    e.preventDefault();

   console.log("product state",productState)
    await dispatch(createProduct(productState));

    // Clear the form after submitting
    // setProductState({
    //   name: '',
    //   brand: '',
    //   price: '',
    //   specifications: {
    //     type: '',
    //     display: '',
    //     processor: '',
    //     memory: '',
    //     os: '',
    //   },
    //   stock: '',
    //   image: '',
    // });
    
};


// image handling
const handleImage=(e)=>{

    setProductState({...productState,
    image:e.target.files[0]
})
}

// Close the form
  const  handelonClose=()=>{
    handelCreateProduct()
  };




//   get all brands

const getBrands=async()=>{
    await dispatch(getAllBrands())
}

useEffect(()=>{
    getBrands()
},[])

// console.log(state.product.allBrands)

  return (
    <>
   <div className="flex flex-col items-center justify-center bg-white p-8 rounded-md max-w-md w-full h-full">
        <button
          onClick={handelonClose}
          className="text-gray-600 hover:text-gray-800 cursor-pointer text-4xl"
        >
          x
        </button>
        <form
          onSubmit={handleCreateProductForm}
          className="w-[80%] h-full shadow-xl p-4 mt-8"
        >
    <div className="mb-4">
    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
      Product Name
    </label>
    <input
      type="text"
      id="name"
      name="name"
      value={productState.name}
      onChange={handleChange}
      className="mt-1 p-2 border rounded-md w-full"
      required
    />
  </div>

  <div className="mb-4">
    <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
      Brand
    </label>
   <select name="brand" value={productState.brand} onChange={handleChange}>
    {state.product.allBrands.length > 0 ? (
        state.product.allBrands.map((item) => (
            <option key={item?._id} value={item?._id}>
                {item.name}
            </option>
        ))
    ) : (
        <option value="" disabled>
            No Brands Available
        </option>
    )}
</select>

  </div>

  <div className="mb-4">
    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
      Price
    </label>
    <input
      type="number"
      id="price"
      name="price"
      value={productState.price}
      onChange={handleChange}
      className="mt-1 p-2 border rounded-md w-full"
      required
    />
  </div>

  <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Type
            </label>
            <input
              type="text"
              id="type"
              name="specifications.type"
              value={productState.specifications.type}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="display"
              className="block text-sm font-medium text-gray-700"
            >
              Display
            </label>
            <input
              type="text"
              id="display"
              name="specifications.display"
              value={productState.specifications.display}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="processor"
              className="block text-sm font-medium text-gray-700"
            >
              Processor
            </label>
            <input
              type="text"
              id="processor"
              name="specifications.processor"
              value={productState.specifications.processor}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="memory"
              className="block text-sm font-medium text-gray-700"
            >
              Memory
            </label>
            <input
              type="text"
              id="memory"
              name="specifications.memory"
              value={productState.specifications.memory}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="os" className="block text-sm font-medium text-gray-700">
              OS
            </label>
            <input
              type="text"
              id="os"
              name="specifications.os"
              value={productState.specifications.os}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>

  <div className="mb-4">
    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
      Stock
    </label>
    <input
      type="number"
      id="stock"
      name="stock"
      value={productState.stock}
      onChange={handleChange}
      className="mt-1 p-2 border rounded-md w-full"
      required
    />
  </div>

  <div className="mb-4">
    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
      Image 
    </label>
    <input
      type="file"
      id="image"
      name="image"
    //   value={productState.image}
      onChange={handleImage}
      className="mt-1 p-2 border rounded-md w-full"
      required
    />
  </div>

  <button
    type="submit"
    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-4"
  >
    Create Product
  </button>
</form>

      </div>
  </>
  );
}
