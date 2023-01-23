import React from 'react'
import Metadata from '../More/Metadata'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getProductDetails } from '../../Actions/productAction'
import { useParams } from 'react-router-dom'

function ProductDetails() {
 const params=useParams()
 console.log(params.id)
 const dispatch=useDispatch()
  const data = useSelector((state) => state.ProductDetails?.product)
  console.log("components", data)

  useEffect(()=>{
         dispatch(getProductDetails(params.id))
  },[])
  
  return (
  <>
  <Metadata title="product" />
  {data.name}
  
  </>
  )
}

export default ProductDetails