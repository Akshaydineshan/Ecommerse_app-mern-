
import {ALL_PRODUCTS_FAIL,ALL_PRODUCTS_SUCCESS,ALL_PRODUCTS_REQUEST, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL}from "../Contanstands/productCont"

export const productReducer=(state={products:[]},action)=>{
   
    switch(action.type){
        case ALL_PRODUCTS_REQUEST:return {loading:true,products:[]}
        case ALL_PRODUCTS_SUCCESS:return {loading:false,products:action.payload}
        case ALL_PRODUCTS_FAIL:return {loading:false,error:action.payload}
        default:
            return state
    }


}
export const productDetailsReducer=(state={product:{}},action)=>{
   
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:return {loading:true,product:{}}
        case PRODUCT_DETAILS_SUCCESS:return {loading:false,product:action.payload}
        case PRODUCT_DETAILS_FAIL:return {loading:false,error:action.payload}
        default:
            return state
    }


}