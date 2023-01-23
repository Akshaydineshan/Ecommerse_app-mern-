import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Button } from 'react-bootstrap'
import { useEffect } from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getProduct } from '../../Actions/productAction'
import ProductsCart from '../Products/ProductsCart'
const p1 = require('../../Assets/pic11.jpg')
const p2 = require('../../Assets/pic9.jpg')
const p3 = require('../../Assets/pic6.jpg')





function Home() {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.products?.products)
  console.log("components", data)

  useEffect(() => {



    dispatch(getProduct())

  }, [])

  return (

    <div className="home-cont" >

      <div className='banner '>
        <Carousel className=''>
          <img src={p1} alt="" style={{ width: "100%", height: "100vh", backgroundSize: "cover", }} />
          <img src={p2} alt="" style={{ width: "100%", height: "100vh", backgroundSize: "cover" }} />
          <img src={p3} alt="" style={{ width: "100%", height: "100vh", backgroundSize: "cover" }} />
        </Carousel>

        <div className='banner-txt'>
          <div><label style={{ fontSize: "50px", fontWeight: "900px", fontFamily: "-moz-initial" }}>Buy 2 Get <span>1 Free</span></label></div>
          <div><label style={{ fontSize: "48px", fontFamily: "fantacy" }}>Fashionable </label></div>
          <div><label style={{ fontSize: "48px", marginLeft: "9px", fontFamily: "fantacy" }}>Collection</label></div>
          <Button style={{ marginLeft: "40px", width: "120px", height: "45px", borderRadius: "8px" }} className=' btn btn-success '>Shop Now</Button>
        </div>

      </div>

      <div className="featured-cont mt-5"  >
        <div style={{display:"flex",justifyContent:"center"}}>
        <h5  >Featured Products</h5>
       </div>
   
       
        <Container>
          <Row>
           
              {
                
                data?.map((item) => (
                  <Col md={3}>
                  <ProductsCart key={item._id} product={item} />
                  </Col>
                ))
               
              }

           
          </Row>
        </Container>

      </div>
      {/* 
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h5 >Featured Products</h5>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <h5 >Featured Products</h5>
      </div> */}



    </div>










  )
}

export default Home