import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    user:"",
    token:"",
    userOrders:"",
    allOrders:"",
    loading:true,
    error:false

};

const uri= process.env.REACT_APP_BACKEND_URI
const storedUser = localStorage.getItem("user");
const userId = JSON.parse(storedUser)?._id;
var token=localStorage.getItem("token");

const signUpUser=createAsyncThunk("signUpUser",async(body)=>{
    console.log("hitting api for signup")
   
    const {  username, email, password, phoneNumber, address } = body;
    const response = await fetch(`${uri}/signup`,{
        method:"post",
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify({
            username, email, password, phoneNumber, address 
        }),
    });
    return response.json();


});




const LoginUser=createAsyncThunk("LoginUser",async(body)=>{

   
    const { email, password} =body;
    const response = await fetch(`${uri}/login`,{
        method:"post",
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });


    return response.json();


});



// getting user info
const getUserInfo=createAsyncThunk("getUserInfo",async(email)=>{
   
   

    const response = await fetch(`${uri}/getuser`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json", 
            'authorization':`Bearer ${token}`,
        },
        body:JSON.stringify({
            email
        })
        
    });


    return response.json();
});



// order query


const placeOrderQuery=createAsyncThunk("placeOrderQuery",async(email)=>{
   
   

    const response = await fetch(`${uri}/createOrder`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json", 
            'authorization':`Bearer ${token}`,
        }
    });


    return response.json();
});



// get user orders


const getUserOrders=createAsyncThunk("getUserOrders",async(email)=>{
   
   

    const response = await fetch(`${uri}/getUserOrder`,{
        method:"GET",
        headers: {
            "Content-Type": "application/json", 
            'authorization':`Bearer ${token}`,
        }
    });


    return response.json();
});









// admin query

// get all orders
const getAllOrders=createAsyncThunk("getAllOrders",async()=>{
    
    const response = await fetch(`${uri}/admin-getAllOrders`,{
        method:"GET",
        headers: {
            "Content-Type": "application/json", 
            'authorization':`Bearer ${token}`,
        }
    });


    return response.json();
})



// change order status

const changeOrderStatus=createAsyncThunk("changeOrderStatus",async(body)=>{
    const {orderId,newstatus}=body
    const response = await fetch(`${uri}/admin-updateStatus`,{
        method:"PATCH",
        headers: {
            "Content-Type": "application/json", 
            'authorization':`Bearer ${token}`,
        },
        body:JSON.stringify({
            orderId,newstatus
        })
    });


    return response.json();
})


// delete order

const deleteOrder=createAsyncThunk("deleteOrder",async(orderId)=>{
    
    const response = await fetch(`${uri}/admin-deleteOrder`,{
        method:"DELETE",
        headers: {
            "Content-Type": "application/json", 
            'authorization':`Bearer ${token}`,
        },
        body:JSON.stringify({
            orderId
        })
    });


    return response.json();
})

const userSlice=createSlice({

    name:"user",
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
       
        builder.addCase(signUpUser.fulfilled,(state,action)=>{
                state.loading=false
                
            })
            builder.addCase(LoginUser.fulfilled,(state,action)=>{
                state.loading=false
             
                localStorage.setItem("token",action.payload?.token)
                localStorage.setItem("user",JSON.stringify(action.payload?.user))
            })


        // get user info
        builder.addCase(getUserInfo.fulfilled,(state,action)=>{
            state.user=action.payload ;
           
        });


        // place order query
        builder.addCase(placeOrderQuery.fulfilled,(state,action)=>{
            console.log("place order ",action.payload)
        })

        // get user orders
        builder.addCase(getUserOrders.fulfilled,(state,action)=>{
            // console.log("get user orders",action.payload?.orders)
            state.userOrders=action.payload?.orders
        })



        //  for admin
        // get all orders
        builder.addCase(getAllOrders.fulfilled,(state,action)=>{
            // console.log("get all orders",action.payload)
            state.allOrders=action.payload.orders
        })

        // change order status
        builder.addCase(changeOrderStatus.fulfilled,(state,action)=>{
            // console.log("order status changes",action.payload)
        })

        // delete order
        builder.addCase(deleteOrder.fulfilled,(state,action)=>{
            // console.log("delete order",action.payload)
        })
    },
});



export default userSlice.reducer;
export {signUpUser,
    LoginUser,
    getUserInfo,placeOrderQuery,getUserOrders,getAllOrders,changeOrderStatus,deleteOrder
};
