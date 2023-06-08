import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, highToLowPrice, lowToHighPrice, reset, sortcategory } from './productSlice'
import { priceRange } from './productSlice'
const init={low:0,high:100000000};
export const ProductView = () => {
    const dispatch=useDispatch()
    const products=useSelector((state)=>state.product.queryProduct);
    const loading=useSelector((state)=>state.product.loading);
    const error=useSelector((state)=>state.product.error);
    useEffect(()=>{
       console.log(error);
    },error)
    useEffect(()=>{
         dispatch(fetchProducts())
    },[])
    const [range,setRange]=useState(init);
    const [catogry,setCatogry]=useState("");
    useEffect(()=>{dispatch(sortcategory(catogry))},[catogry])
    if(loading) return  <div>loading ....</div>
  return (
    <div>
        <div>
        <h1>Filters</h1>
        <div className='flex gap-4'>
         <button onClick={()=>dispatch(lowToHighPrice())}>LowToHigh</button>
         <button onClick={()=>dispatch(highToLowPrice())}>HighToLow</button>
         <div>
         <input type="number" value={range.low} onChange={(event)=>setRange({...range,low:event.target.value})}/>
         <input type="number" value={range.high} onChange={(event)=>setRange({...range,high:event.target.value})}/>
          <button onClick={()=>dispatch(priceRange({low:range.low,high:range.high}))}>apply</button>
         </div>
         <select name="" value={catogry} onChange={(event)=>{
            setRange(init);
            setCatogry(event.target.value);
            
            
            }} id="">
            <option value="">default</option>
            <option value="men's clothing">men's clothing</option>
            <option value="jewelery">jewelery</option>
            <option value="electronics">electronics</option>
            <option value="women's clothing">women's clothing</option>
         </select>
         <button onClick={()=>{dispatch(reset()); setRange(init);setCatogry("") }}>reset</button>

         
        </div>  
        </div>
        {products.map((product=>(<ProductItem key={product.id} product={product} />)))}
    </div>
  )
}

const ProductItem=({product})=>{
    return (
        <div className='flex-col' >
            
           <h1 className='text-cyan-300 text-left p-2'>{product.title}</h1>
           <div className="flex gap-2 items-center">
           <img className='w-[80px] h-[80px]' src={product.image} alt="" />
           <p>{product.description}</p>
           </div>
           <div className="flex justify-between">
            <p>
                ${product.price}
            </p>
            <p>
               rating: {product.rating.rate} count: {product.rating.count} 
            </p>
           </div>

           
        </div>
    );
}
