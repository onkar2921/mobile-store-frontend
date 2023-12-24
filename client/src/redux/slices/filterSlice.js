import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    filterData:"",
    loading:true,
    error:false

};

const uri= process.env.REACT_APP_BACKEND_URI

const normalSearchQuery=createAsyncThunk("normalSearchQuery",async(search)=>{
   
    
    const response = await fetch(`${uri}/normalSearch`,{
        method:"post",
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify({
           search
        }),
    });
    return response.json();


});




const filterQuery=createAsyncThunk("filterQuery",async(body)=>{

    
    const {  name, type, processor, memory, os } = body?.filters;
    
    console.log("hitting",body?.priceRange[1])
    const priceMin=body?.priceRange[0]
    const priceMax=body?.priceRange[1]
    const response = await fetch(
       
        `${uri}/filterProduct?` +
`name=${name}&type=${type}&processor=${
    processor
  }&memory=${memory}&os=${os}&priceMin=${priceMin}&priceMax=${priceMax}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch filtered products');
      }
  
      return response.json();
    }
    );





 

const filterSlice=createSlice({

    name:"filter",
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
       builder.addCase(normalSearchQuery.fulfilled,(state,action)=>{
           state.filterData=action.payload?.products
           console.log("normla search data",state.filterData)
       });

       builder.addCase(filterQuery.fulfilled,(state,action)=>{
            console.log("filter query data",action.payload)
       })
    }     
});



export default filterSlice.reducer;
export {normalSearchQuery,filterQuery}
