
import React from 'react'
import UserHeader from '../components/UserHeader'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

function PaymentFail() {
  const navigate = useNavigate()

  return (
    <>
      <UserHeader />

      <div className="container d-flex justify-content-center align-items-center py-5">
        <div
          className="card shadow text-center p-4 p-md-5"
          style={{
            maxWidth: '550px',
            width: '100%',
            borderRadius: '15px'
          }}
        >
          <div className="mb-3">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="text-danger"
              style={{ fontSize: '80px' }}
            />
          </div>

          <h2 className="text-danger fw-bold">
            Payment Failed!
          </h2>

          <p className="text-muted mt-3">
            Sorry, we couldn't process your payment.
            Please try again or choose another payment method.
          </p>

          <hr />

          <div className="bg-light rounded p-3 mb-4">
            <h5 className="mb-3">Payment Details</h5>

            <div className="d-flex justify-content-between">
              <span className="text-muted">Payment Status</span>
              <span className="text-danger fw-bold">Failed</span>
            </div>
          </div>

          <p className="text-muted small">
            If money was deducted from your account,
            please check your payment status before retrying.
          </p>

          <div className="d-grid gap-2">
            <br></br>
            <Link
              to="/all-books"
              className="btn btn-outline-secondary"
            >
              Back to Books
            </Link>

           
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentFail
