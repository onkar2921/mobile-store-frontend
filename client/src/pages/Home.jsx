import React, { useEffect } from 'react';
import Filter from '../components/Filter';
import FilterDataDisplay from '../components/FilterDataDisplay';
import Card from '../components/Card';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getProducts } from '../redux/slices/productSlice';

const Home = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const callGetProducts = async () => {
    await dispatch(getProducts());
  };

  useEffect(() => {
    callGetProducts();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Filter />
      <FilterDataDisplay />
      <div className="max-w-screen-xl mx-auto mt-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mb-8">Shop Our Mobiles</h1>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {state?.product?.productsdata.length > 0 ? (
            state?.product?.productsdata?.map((item) => (
              <Card key={item._id} product={item} />
            ))
          ) : (
            <p className="text-gray-500 text-lg text-center">
              Sorry, no products available at the moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
