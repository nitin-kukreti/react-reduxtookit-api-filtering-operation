import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts=createAsyncThunk("product/getData",async()=>{
  return await axios.get("https://fakestoreapi.com/products")
})
// this is initial state
const initialState={
    loading:false,
    error:'',
    products:[],
    queryProduct:[],
    
}
// this is product slice
const productSlice=createSlice(
    {
        name:'product',
        initialState,
        reducers:{
            sortcategory:(state,action)=>{
                console.log(action);
                if(action.payload.length>0){
                  state.queryProduct=state.products.filter((product)=>product.category == action.payload);
                }else{
                    state.queryProduct=state.products;
                }
            },
            lowToHighPrice:(state)=>{
                state.queryProduct.sort((a,b)=>a.price-b.price);
            },
            highToLowPrice:(state)=>{
                state.queryProduct.sort((a,b)=>b.price-a.price);
            },
            priceRange:(state,action)=>{
               state.queryProduct=state.queryProduct.filter((product)=>product.price>=action.payload.low && product.price<=action.payload.high);
            },
            reset:(state)=>{
                state.queryProduct=state.products
            }


        },
        extraReducers:builder=>{
            builder.addCase(fetchProducts.pending,(state)=>{
                state.loading=true;
            })
            builder.addCase(fetchProducts.fulfilled,(state,action)=>{

                state.loading=false;
                state.products=action.payload.data
                state.queryProduct=state.products
            })
            builder.addCase(fetchProducts.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.error.message;
            })

        }
        
          
    }

)
export const {sortcategory,highToLowPrice,lowToHighPrice,priceRange,reset}=productSlice.actions

export default productSlice.reducer 