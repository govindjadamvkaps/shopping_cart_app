import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify';

const WishList = () => {
    const userId = localStorage.getItem("_id")

    const [data,setData] = useState([])
    const fetchProductOfWishList = async()=>{
        try {
            const resp = await axios.get(`http://localhost:5000/wishlist/get-product/${userId}`)
            setData(resp.data.data.productId)
            // console.log("ewsaa", resp.data)
        } catch (error) {
            console.log("error in get product of wishlist", error)
        }
    }
    useEffect(()=>{
        fetchProductOfWishList()
    },[])

    const handleClick = async(pId)=>{
        try {
            const resp = await axios.delete(`http://localhost:5000/wishlist/delete-product/${userId}/${pId}`)
            // console.log(resp.data)

            if(resp.status===StatusCodes.OK)
            {
                toast.success('product delete from wishlist',{
                    position:"top-center"
                })
            }
            const res = await axios.get(`http://localhost:5000/wishlist/get-product/${userId}`)
            setData(res.data.data.productId)     

        } catch (error) {
            toast.error('error product delete from wishlist',{
                position:"top-center"
            })
            console.log("error in delete the product from wishlist", error)
        }

    }

  return (
    <>
       <div className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0">
              <NavLink to="/">Home</NavLink> <span className="mx-2 mb-0">/</span>{" "}
              <strong className="text-black">Wish-List</strong>
            </div>
          </div>
        </div>
      </div>

      <Container>
        <Row>
          {data.map((curItem) => {
            return (
              <Col lg={4} className="mt-4">
                <div className="card" style={{width: "18rem"}}>
                  <img src={`http://localhost:5000/public/images/${curItem .pImage}`} height="500px" width="50px" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h4 className="card-title">{curItem.pName}</h4>
                    <h5 className="card-title">Price &#8377;{curItem .pPrice}</h5>
                  
                    <Button variant="danger" onClick={()=>handleClick(curItem._id)}>Delete</Button>
                    
                    
                    
                   </div> 
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  )
}

export default WishList
