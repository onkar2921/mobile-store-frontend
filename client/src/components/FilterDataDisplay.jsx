import React from 'react';
import Card from './Card';
import { useSelector } from 'react-redux';

const FilterDataDisplay = () => {
  const state = useSelector((state) => state);

  return (
     <>
     {
         state?.filter?.filterData.length > 0  &&
    <div className="bg-gray-100 min-h-screen p-8">
     <h2 className="text-3xl font-bold mb-8 text-center">Filter Data</h2>
     
     <div className="flex justify-center items-center flex-wrap">
     {state?.filter?.filterData.length > 0  &&(
          state?.filter?.filterData?.map((item) => (
              <Card key={item?._id} product={item} />
              ))
              )}
              </div>
              </div>
            } 
     </>
  );
};

export default FilterDataDisplay;
