import React from 'react'
import { productReducer } from '../../Reducers/productReduces'
import { Card, Image } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import "./ProductCart.css"

function ProductsCart({ product }) {

  return (
    <Link to={`/product/${product._id}`} >
      <Card className=' card p-3 mt-3' >
        <Image className='cart-image' src={product.images[0].url}></Image>
        <p className='productName'>{product.name}</p>
        <p className='productName'>{product.description}</p>
        <p className='productName'>{product.name}</p>
        <p className='productName'>{product.name}</p>
      </Card>
    </Link>

  )
}

export default ProductsCart