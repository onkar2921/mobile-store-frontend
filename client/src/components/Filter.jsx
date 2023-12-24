import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterQuery, normalSearchQuery } from '../redux/slices/filterSlice';

export default function Filter() {
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]); // Default price range
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchQuery = async () => {
    console.log('Searching for:', search);
    await dispatch(normalSearchQuery(search, { priceRange }));
  };

  const handlePriceRangeChange = (e) => {
    const value = e.target.value;
    setPriceRange([0, value]);
  };

  const [filters, setFilters] = useState({
    name: '',
    type: '',
    processor: '',
    memory: '',
    os: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(filterQuery({ filters, priceRange }));
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4">
      <div className="sm:flex sm:justify-center sm:items-center bg-white p-4 rounded-md shadow-md mb-4">
        <input
          type="text"
          name="search"
          value={search}
          placeholder="Search"
          onChange={handleSearch}
          className="w-full sm:w-[60%] md:w-[40%] lg:w-[30%] xl:w-[25%] border border-gray-300 p-2 rounded-md mr-2 focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          onClick={handleSearchQuery}
          className="w-full sm:w-[20%] md:w-[10%] lg:w-[8%] xl:w-[5%] bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Search
        </button>
      </div>

      <div className="mt-4">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={filters.name} onChange={handleChange} className="input" />
            </div>

            <div>
              <label htmlFor="type">Type:</label>
              <input type="text" id="type" name="type" value={filters.type} onChange={handleChange} className="input" />
            </div>

            <div>
              <label htmlFor="processor">Processor:</label>
              <input
                type="text"
                id="processor"
                name="processor"
                value={filters.processor}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label htmlFor="memory">Memory:</label>
              <input
                type="text"
                id="memory"
                name="memory"
                value={filters.memory}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label htmlFor="os">OS:</label>
              <input type="text" id="os" name="os" value={filters.os} onChange={handleChange} className="input" />
            </div>

            <div>
              <label htmlFor="price">Price Range:</label>
              <input
                type="range"
                id="price"
                name="price"
                min="0"
                max="1000"
                step="50"
                value={priceRange[1]}
                onChange={handlePriceRangeChange}
              />
              <span>${priceRange[1]}</span>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
