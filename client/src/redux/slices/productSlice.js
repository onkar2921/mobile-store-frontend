import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ConvertToBase64 from "../../components/ConvertToBase64"
const initialState={
    productsdata:"",
    userCartData:"",
    singleProduct:"",
    allBrands:"",
    loading:true,
    error:false

};

const uri= process.env.REACT_APP_BACKEND_URI
const storedUser = localStorage.getItem("user");
const userId = JSON.parse(storedUser)?._id;
const email=JSON.parse(storedUser)?.email
var token=localStorage.getItem("token");

const getProducts=createAsyncThunk("getProducts",async(search)=>{ 
    const response = await fetch(`${uri}/getAllProducts`,{
        method:"get",
        headers: {
            "Content-Type": "application/json", 
            'authorization':`Bearer ${token}`,
        }
    });
    return response.json();


});

// get product by id

const getProductById=createAsyncThunk("getProductById",async(productId)=>{
   

    const response = await fetch(`${uri}/getProduct/${productId}`,{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
            'authorization':`Bearer ${token}`, 
        }
    });
    return response.json();


});



const createProduct=createAsyncThunk("createProduct",async(body)=>{
    const { name, brand, price, specifications, stock, image } = body;
    // console.log("body",body)
   const convertedImage=await ConvertToBase64(image);
//    console.log("image",convertedImage)
// console.log("brand",brand)
//    const formData = new FormData();
//    formData.append("name", name);
//    formData.append("brand", brand);
//    formData.append("price", price); // Corrected from formData.append(price, price)
//    formData.append("specifications", JSON.stringify(specifications));
//    formData.append("stock", stock);
//    formData.append("image", convertedImage);

   const response = await fetch(`${uri}/createProduct`, {
       method: "POST",
       headers: {
        "Content-Type": "application/json",
           'authorization': `Bearer ${token}`,
       },
       body:JSON.stringify({

        name, brand, price, specifications, stock,
        image:convertedImage
       })
   });

   return response.json();


});



// update a product

const updateProduct=createAsyncThunk("updateProduct",async(body)=>{
    // console.log("productId",productId)
    
    const { name, brand, price, specifications, stock, image } = body?.productState;
    const convertedImage=await ConvertToBase64(image);
    const {productId}=body
    // console.log("body",productId)

    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("brand", brand);
    // formData.append("price", price); 
    // formData.append("specifications", JSON.stringify(specifications));
    // formData.append("stock", stock);
    // formData.append("image", convertedImage);
 
    const response = await fetch(`${uri}/updateProduct/${productId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'authorization': `Bearer ${token}`,
        },
        body:JSON.stringify({
            name, brand, price, specifications, stock, image:convertedImage 
        }),
    });
 
    return response.json();
 
 
 });
 
 



// delete product


const deleteProduct=createAsyncThunk("deleteProduct",async(productId)=>{
   

    const response = await fetch(`${uri}/deleteProduct/${productId}`,{
        method:"DELETE",
        headers: {
            "Content-Type": "application/json",
            'authorization':`Bearer ${token}`, 
        }
    });
    return response.json();


});















// brands
//  get all brands

// get product by id

const getAllBrands=createAsyncThunk("getAllBrands",async()=>{
   

    const response = await fetch(`${uri}/getAllBrands`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            'authorization':`Bearer ${token}`, 
        }
    });
    return response.json();


});


// create a new brand
const createBrand=createAsyncThunk("createBrand",async(body)=>{
   console.log("body",body)
    const {name,country}=body
    const response = await fetch(`${uri}/createBrand`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            'authorization':`Bearer ${token}`, 
        },
        body:JSON.stringify({
            name,country
        })
    });
    return response.json();


});


// delete a brand

const deleteBrand=createAsyncThunk("deleteBrand",async(brandId)=>{
   

    const response = await fetch(`${uri}/deleteBrand/${brandId}`,{
        method:"DELETE",
        headers: {
            "Content-Type": "application/json",
            'authorization':`Bearer ${token}`, 
        }
    });
    return response.json();


});



// add to cart

const addToCart=createAsyncThunk("addToCart",async(productId)=>{
   

    const response = await fetch(`${uri}/addToCart`,{
        method:"PATCH",
        headers: {
            "Content-Type": "application/json",
            'authorization':`Bearer ${token}`, 
        },
        body:JSON.stringify({
            productId
        })
    });
    return response.json();


});

// get user cart

const getUserCart=createAsyncThunk("getUserCart",async(productId)=>{
   
    
    // console.log("token",token)
    const response = await fetch(`${uri}/getUserCart`,{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
            'authorization':`Bearer ${token}`, 
        }
    });
    return response.json();


});


// delete product from cart

const deleteProductFromCart=createAsyncThunk("deleteProductFromCart",async(productId)=>{
  
    const response = await fetch(`${uri}/deleteFromCart`,{
        method:"PATCH",
        headers: {
            "Content-Type": "application/json",
            'authorization':`Bearer ${token}`, 
        },
        body:JSON.stringify({
            productId
        })
    });
    return response.json();


});
 
 

const productSlice=createSlice({

    name:"product",
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {

        // create product

        builder.addCase(createProduct.fulfilled,(state,action)=>{
            console.log(action.payload)
            // getProducts()
        })


        // update a product
        builder.addCase(updateProduct.fulfilled,(state,action)=>{
            console.log("update product ",action.payload)
        })


       builder.addCase(getProducts.fulfilled,(state,action)=>{
           
        //    console.log("get all products data",action.payload)
           state.productsdata=action.payload?.products
       });

    //    get product by id
    builder.addCase(getProductById.fulfilled,(state,action)=>{
        // console.log("get product by id data",action.payload)
        state.singleProduct=action.payload?.product
    })

    
    // delete a product
    builder.addCase(deleteProduct.fulfilled,(state,action)=>{
        console.log("delte a product",action.payload)
    })









// brands


// get brands

        builder.addCase(getAllBrands.fulfilled,(state,action)=>{
            console.log('get all brands',action.payload)
            state.allBrands=action.payload?.brands
        })


// create a brand

        builder.addCase(createBrand.fulfilled,(state,action)=>{
           
         
        })


        // delete a brand

        builder.addCase(deleteBrand.fulfilled,(state,action)=>{
            console.log("delete a brand",action.payload)
        })




    //    add to cart
    builder.addCase(addToCart.fulfilled,(state,action)=>{
            // console.log("add to cart data",action.payload)
    })

    // get user cart
    builder.addCase(getUserCart.fulfilled,(state,action)=>{
        // console.log("get user cart data",action.payload?.cart)
       
         state.userCartData=action.payload?.cart
    })

    // delete from cart
    builder.addCase(deleteProductFromCart.fulfilled,(state,action)=>{
        console.log("delete from cart",action.payload)
    })

    }     
});



export default productSlice.reducer;
export {getProducts,getProductById,createProduct,updateProduct,deleteProduct,addToCart,getUserCart,deleteProductFromCart,getAllBrands,createBrand,deleteBrand}
