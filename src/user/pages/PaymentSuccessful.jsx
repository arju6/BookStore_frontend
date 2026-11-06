import React, { useEffect } from "react";
import UserHeader from "../components/UserHeader";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCreditCard,
  faLock,
  faBagShopping,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { verifyPaymentAPI } from "../../services/allApi"



function PaymentSuccessful() {

  useEffect(()=>{
    verifyPayment()
  },[])

  const verifyPayment=async ()=>{
    const sessionId= new URLSearchParams(window.location.search).get("session_id")

    const res=await verifyPaymentAPI({sessionId})
    console.log(res);
    
  }


  return (
    <>
      <UserHeader />

      {/* Main Section */}
      <div
        className="d-flex justify-content-center align-items-center w-100 px-3 py-5"
        style={{
          minHeight: "540px",
          backgroundColor: "#ffffff",
        }}
      >
        {/* Payment Card */}
        <div
          className="card border shadow-sm text-center p-4 p-md-5 mx-auto"
          style={{
            maxWidth: "600px",
            width: "100%",
            borderRadius: "18px",
            flexShrink: 0,
          }}
        >
          {/* Success Icon */}
          <div className="mb-3">
            <div
              className="d-flex justify-content-center align-items-center mx-auto rounded-circle"
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#e5e7eb",
              }}
            >
              <FontAwesomeIcon
                icon={faCircleCheck}
                style={{
                  fontSize: "65px",
                  color: "#111827",
                }}
              />
            </div>
          </div>

          {/* Heading */}
          <h2 className="fw-bold text-dark mb-2">Payment Successful!</h2>

          <p className="text-secondary mb-4">
            Thank you for shopping with BookStore. Your payment has been
            completed successfully.
          </p>

          {/* Payment Details */}
          <div
            className="rounded-3 p-3 mb-4 text-start"
            style={{
              backgroundColor: "#f3f4f6",
              border: "1px solid #e5e7eb",
            }}
          >
            {/* Payment Status */}
            <div className="d-flex justify-content-between align-items-center py-2 gap-2">
              <span className="text-dark">
                <FontAwesomeIcon icon={faCreditCard} className="me-2 me-md-3" />
                Payment Status
              </span>

              <span
                className="badge text-dark px-3 py-2"
                style={{ backgroundColor: "#d1d5db" }}
              >
                Paid
              </span>
            </div>

            <hr className="my-2" />

            {/* Order Status */}
            <div className="d-flex justify-content-between align-items-center py-2 gap-2">
              <span className="text-dark">
                <FontAwesomeIcon icon={faLock} className="me-2 me-md-3" />
                Order Status
              </span>

              <span
                className="badge text-dark px-3 py-2"
                style={{ backgroundColor: "#d1d5db" }}
              >
                Confirmed
              </span>
            </div>
          </div>

          <p className="text-secondary mb-4">
            Your purchase is confirmed. Happy reading!
          </p>

          {/* Buttons */}
          <div className="d-flex flex-column gap-3 w-100">
            <Link
              to="/all-books"
              className="btn text-white py-3 fw-semibold w-100"
              style={{
                backgroundColor: "#111111",
                borderRadius: "10px",
              }}
            >
              <FontAwesomeIcon icon={faBagShopping} className="me-2" />
              Continue Shopping
            </Link>

            <Link
              to="/"
              className="btn btn-outline-dark py-3 fw-semibold w-100"
              style={{
                borderRadius: "10px",
              }}
            >
              <FontAwesomeIcon icon={faHouse} className="me-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentSuccessful;
