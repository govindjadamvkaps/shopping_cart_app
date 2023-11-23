import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
const Thankyou = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // const {userId,amount,cart_Id} = useParams()
  // Get the values from the query parameters
  const userId = searchParams.get("userId");
  const amount = searchParams.get("amount");
  const cart_Id = searchParams.get("cart_Id");
  // console.log("userId", userId);
  // console.log("amount", amount);
  // console.log("cartId", cart_Id);

  const [cartData, setCartData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [singleProduct, setSingleProduct] = useState({});
  // console.log("cartData", cartData);
  const fetchCartData = async () => {
    try {
      const response = await axios.get(
        `https://shopping-cart-itbj.onrender.com/get-cart/${userId}`
      );
      console.log(response, "response");
      setCartData(response.data.data);
      setProductData(response.data.data.productId);
    } catch (error) {}
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  // useEffect(() => {
  //   if (cartData) {
  //     // console.log(productData, "productData");
  //     const productName = productData?.map((product, index) => {
  //       return product.pid.pName;
  //     });
  //     setSingleProduct(...productName);
  //     // console.log("singleProduct", singleProduct);
  //     // console.log("productName", ...productName);
  //     // console.log("thankyou if condtion");
  //     // const pNames ={...productName}
  //     // console.log("pnames",pNames)

  //     console.log("Before dataLayer.push", {
  //       event_category: "Page Interaction",
  //       event_label: "Enter thankyou Page",
  //       total_price: cartData.totalPrice,
  //       product_quantity: cartData.quantity,
  //       products_name: productName,
  //       debug_mode: true,
  //     });


  //     window.dataLayer.push("event", "enter_thankyou_page", {
  //       // page_path: `/shop-single/${_id}`, // Replace with the actual path of your shop single page
  //       event_category: "Page Interaction",
  //       event_label: "Enter thankyou Page",
  //       total_price: cartData.totalPrice,
  //       product_quantity: cartData.quantity,
  //       products_name: productName,
  //       debug_mode: true
  //     });
  //     console.log("After dataLayer.push");
  //   }
  // }, [cartData]);

useEffect(() => {
  if (cartData) {
    const productName = productData?.map((product, index) => {
      return product.pid.pName;
    });

    const script = document.createElement("script");
    script.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "enter_thankyou_page",
        event_category: "Page Interaction",
        event_label: "Enter thankyou Page",
        total_price: "${cartData.totalPrice}",
        product_quantity: "${cartData.quantity}",
        products_name: ${JSON.stringify(productName)},
        payment_details: {
          userId: "${userId}",
          amount: "${amount}",
          cart_Id: "${cart_Id}",
        },
        debug_mode: true,
      });
    `;

    document.head.appendChild(script);
  }
}, [cartData, userId, amount, cart_Id, productData]);

// ...



  return (
    <>
      <div className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0">
              <a href="index.html">Home</a> <span className="mx-2 mb-0">/</span>{" "}
              <strong className="text-black">thankyou</strong>
            </div>
          </div>
        </div>
      </div>
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <span className="icon-check_circle display-3 text-success" />
              <h2 className="display-3 text-black">Thank you!</h2>
              <p className="lead mb-5">You order was successfuly completed.</p>
              <p>
                <NavLink to="/shop" className="btn btn-sm btn-primary">
                  Back to shop
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Thankyou;
