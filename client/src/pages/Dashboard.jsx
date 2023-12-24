import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUserInfo } from "../redux/slices/userSlice";
import { Link } from "react-router-dom";
import CreateProduct from "../components/CreateProduct";
import BrandOptions from "../components/BrandOptions";
import { getUserOrders } from "../redux/slices/userSlice";
import { getAllOrders, changeOrderStatus,deleteOrder } from "../redux/slices/userSlice";
const Dashboard = () => {

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
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const localData = localStorage.getItem("user");

  const getUserDetail = async () => {
    await dispatch(getUserInfo(JSON.parse(localData)?.email));
  };

  useEffect(() => {
    getUserDetail();
  }, [localData]);

  // const [showWishlist, setShowWishlist] = useState(false);

  const { username, email, phoneNumber, address, wishlist } = state?.user?.user;
console.log("use all data",state.user.user)
  // const handleShowWishlist = () => {
  //   setShowWishlist(!showWishlist);
  // };

  //   create product
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [showwbrandOptions, setShowBrandOptions] = useState(false);
  const handelCreateProduct = () => {
    setShowCreateProduct(!showCreateProduct);
  };

  const handelShowBrandOptions = () => {
    setShowBrandOptions(!showwbrandOptions);
  };

  const handelSeePrevOrders = async () => {
    await dispatch(getUserOrders());
  };

  const hendelGetAllOrders = async () => {
    await dispatch(getAllOrders());
  };

  const [orderStatus, setOrderStatus] = useState("");

  const handelStatus = async ({ e, orderId }) => {
    // console.log("body")
    const newstatus = e.target.value;
    setOrderStatus(newstatus)
    console.log(
      "order status",newstatus
    )

    // Dispatch an action to update the order status
    await dispatch(
      changeOrderStatus({
        orderId,
        newstatus,
      })
    );
    await dispatch(getAllOrders())
  };



  const hanelDelteOrder=async(orderId)=>{
    console.log("orderID",orderId)
    await dispatch(deleteOrder(orderId))
    await dispatch(getAllOrders())
  }
  if (!state?.user?.user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">
          Welcome, {username}!
        </h2>

        <div className="mb-4">
          <p className="text-gray-600">
            <span className="font-semibold">Email:</span> {email}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Phone Number:</span> {phoneNumber}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Address:</span> {address}
          </p>
        </div>

        <div className="mb-4">
          <Link to="/cart">
            <h3 className="text-xl font-semibold mb-2 text-indigo-600 cursor-pointer hover:underline">
              Shopping Cart
            </h3>
          </Link>
        </div>

        {/* <button
          onClick={handleShowWishlist}
          className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
        >
          {showWishlist ? 'Hide Wishlist' : 'Show Wishlist'}
        </button>

        {showWishlist && wishlist && wishlist.length > 0 && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2 text-indigo-600">Wishlist</h3>
            <ul className="list-disc pl-4">
              {wishlist.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
          </div>
        )} */}
      </div>

      {/* see orders */}
      <div className="my-8 p-4 border border-gray-300 rounded-md shadow-md">
        <p
          className="text-2xl font-bold mb-4 cursor-pointer"
          onClick={handelSeePrevOrders}
        >
          See Previous Orders
        </p>

        {state.user.userOrders?.length > 0 &&
          state.user.userOrders?.map((order) => (
            <div
              key={order._id}
              className="mb-6 p-4 bg-white border border-gray-300 rounded-md"
            >
              <p className="text-lg font-semibold">
                Order Status: {order?.status}
              </p>
              <p className="text-lg">Total Amount: ${order?.total}</p>

              {order.products.map((productItem) => (
                <div key={productItem._id} className="mt-3">
                  <p className="text-md font-semibold">
                    Product Name: {productItem?.product?.name}
                  </p>
                  <p className="text-md">Quantity: {productItem?.quantity}</p>
                  {/* Add more details based on your product structure */}
                </div>
              ))}
            </div>
          ))}
      </div>

      {/* if admin */}
      
     {
      admin && (
        <div className="container mx-auto mt-8">
        <div className="text-center">
          <p className="text-2xl font-bold mb-4">Admin Options</p>
          <div className="flex space-x-4 justify-center items-center">
            <button
              onClick={handelCreateProduct}
              className="bg-blue-500 text-white p-2 rounded-md  hover:bg-blue-600"
              >
              Create Product
            </button>
            <button
              onClick={handelShowBrandOptions}
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
              >
              Brand Options
            </button>
            <button
              onClick={hendelGetAllOrders}
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
              >
              Get All Orders
            </button>
          </div>

          {showCreateProduct && (
            <div className="flex justify-center items-center mt-8">
              <CreateProduct
                handelCreateProduct={handelCreateProduct}
                ></CreateProduct>
            </div>
          )}

          {showwbrandOptions && (
            <div className="flex justify-center items-center mt-8">
              <BrandOptions
                handelShowBrandOptions={handelShowBrandOptions}
                ></BrandOptions>
            </div>
          )}
        </div>



        {/* see all orders */}
        {state.user.allOrders?.length > 0 &&
  state.user.allOrders?.map((item) => (
    <div
      key={item?._id}
      className="mb-6 p-4 mt-6 bg-white border border-gray-300 rounded-md shadow-md"
      >
      <p className="text-lg font-semibold">User: {item.user?.username}</p>
      <p className="text-lg">Total: ${item?.total}</p>
      <p className="text-lg">Status: {item?.status}</p>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => hanelDelteOrder(item?._id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Delete Order
        </button>

        <div className="mb-4">
          <label
            htmlFor="statusOptions"
            className="block text-sm font-medium text-gray-700"
            >
            Order Status:
          </label>
          <div className="mt-1 relative">
            <select
              id="statusOptions"
              name="statusOptions"
              onChange={(e) => {
                handelStatus({ e, orderId: item?._id });
              }}
              value={orderStatus}
              className="block w-full py-2 px-4 border border-gray-300 bg-white rounded-md shadow-md focus:outline-none focus:ring focus:border-blue-300"
              >
              {/* pending', 'processing', 'shipped', 'delivered */}
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-md font-semibold">Products:</p>
        {item.products.map((productItem) => (
          <div key={productItem?._id} className="ml-4">
            <p className="text-md">
              Product Name: {productItem.product?.name}
            </p>
            <p className="text-md">
              Price: ${productItem.product?.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  ))}

      </div>
      )
     }

    </div>
  );
};

export default Dashboard;
