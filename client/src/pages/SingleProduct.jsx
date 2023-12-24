import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, deleteProduct } from "../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";
import UpdateProductForm from "../components/UpdateProductForm";

const SingleProduct = () => {


  const [admin,setAdmin]=useState(false)

  // get user role
  const setUserRole=()=>{
    const user=localStorage.getItem("user")
    // console.log("user",JSON.parse(user).role)
    const role=JSON.parse(user).role
    role==="admin"? setAdmin(true):setAdmin(false)

  }

  useEffect(()=>{
    setUserRole()
  },[admin])

  const navigate = useNavigate();
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.singleProduct);

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId]);

  const { name, price, _id, imageUrl, specifications } = product;
console.log("produvt",specifications)
  const [show, setShow] = useState(false);
  const handleUpdate = () => {
    setShow(!show);
  };

  const handleDeleteProduct = async () => {
    await dispatch(deleteProduct(_id));
    navigate("/");
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto mt-8">
        <div className="max-w-2xl mx-auto flex flex-col lg:flex-row bg-white rounded-md overflow-hidden shadow-md">
          <div className="w-full lg:w-1/2 h-70 border rounded overflow-hidden">
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
          </div>

          <div className="p-6 flex flex-col justify-between w-full lg:w-1/2">
            <div>
              <h2 className="text-3xl font-bold mb-4">{name}</h2>

              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Display: {specifications?.display}
                </p>
                <p className="text-sm text-gray-600">
                  Memory: {specifications?.memory}
                </p>
                <p className="text-sm text-gray-600">
                  OS: {specifications?.os}
                </p>
                <p className="text-sm text-gray-600">
                  Processor: {specifications?.processor}
                </p>
                <p className="text-sm text-gray-600">
                  Type: {specifications?.type}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-2xl text-gray-800 font-semibold">
               Price: ${price}
              </span>
            </div>

            <div className="flex space-x-4">
             
              {
                admin && (
                  <>
                  <button
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                onClick={handleUpdate}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={handleDeleteProduct}
              >
                Delete
              </button>
                  </>
                )
              }
            </div>
          </div>
        </div>

        {show && (
          <div className="mt-4 flex justify-center items-center w-full">
            <UpdateProductForm handleUpdate={handleUpdate} productId={_id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
