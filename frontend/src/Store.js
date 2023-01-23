import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import ProductDetails from './Components/Products/ProductDetails'
import { productDetailsReducer, productReducer } from './Reducers/productReduces'


// let initialState=[]

const reducer=combineReducers({
    products:productReducer,
    ProductDetails:productDetailsReducer,

})

const middleware=[thunk]


let store = createStore(reducer,applyMiddleware(...middleware))

export default store