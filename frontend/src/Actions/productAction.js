

import {ALL_PRODUCTS_FAIL,ALL_PRODUCTS_SUCCESS,ALL_PRODUCTS_REQUEST, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL}from "../Contanstands/productCont"
import axios from "axios"

export const getProduct = () => 
    async (dispatch) => {
      
        try{
            dispatch({type:ALL_PRODUCTS_REQUEST})

           let link=`http://localhost:4000/api/v2/products`
            const {data}=await axios.get(link)
            
           

            dispatch({type:ALL_PRODUCTS_SUCCESS,payload:data.products})


        }catch(err){
            dispatch({
                type:ALL_PRODUCTS_FAIL, payload:err
            })

        }

    
}
export const getProductDetails = (id) => 
    async (dispatch) => {
      
        try{
            dispatch({type:PRODUCT_DETAILS_REQUEST})

           let link=`http://localhost:4000/api/v2/Product/${id}`
            const {data}=await axios.get(link)
           

            dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data.product})


        }catch(err){
            dispatch({
                type:PRODUCT_DETAILS_FAIL, payload:err
            })

        }

    
}
