import React, { useState } from "react";
// import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";

import "./Apps.scss";
import SuccessImg from "./img/success.png";
import FailImg from "./img/fail.png";

function App() {
  const [{ fullName, email }, setFields] = useState({
    email: "",
    fullName: "",
  });


  const [showStatus, setShowStatus] = useState(false);
  const [ paymentDetails ] = useState({
    amount: 700,
    currency: "NGN",
    status: "successful",
    name: "Hello World",
  });


  const handleInput = (e) => {
    setFields((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // handleFlutter({
    //   callback: (res) => {
    //     console.log(res);
    //     closePaymentModal();
    //     setPaymentDetails(res);
    //     setShowStatus(true);
    //   },
    // });
  };

  const handleClose = () => {
    if (showStatus) {
      setFields({
        email: "",
        fullName: "",
      });
    }
    setShowStatus(false);
  };

  const config = {
    public_key: process.env.P_KEY,
    amount: 700,
    currency: "NGN",
    customer: {
      email,
      name: fullName
      // phonenumber: "09088765433",
    },
    customization: {
      title: "CBTS CONCERT",
      description: "book your tickets",
    },
    tx_ref: Date.now(),
  };
  // const handleFlutter = useFlutterwave(config);

  const PaymentStatus = ({ details }) => (
    <div className="paymentCard">
      {details?.status === "successful" ? (
        <>
          <img src={SuccessImg} alt="success" />
          <h1>Payment Successful</h1>
          <p>
            You have now registered for CBTS concert. Use the payment
            receipt sent to your email as your enterance permit.
          </p>
        </>
      ) : (
        <>
          <img src={FailImg} alt="fail" />
          <h1>Payment Not Successful</h1>
          <p>Sorry, your payment wasn't accepted, please try again.</p>
        </>
      )}
      <button onClick={handleClose}>Close</button>
    </div>
  );

  return (
    <>
      {showStatus && <PaymentStatus details={paymentDetails} />}
      <div
        className={`concert ${showStatus ? "site-dark" : undefined}`}
        onClick={handleClose}
      >
        <div className="main">
          <div className="card">
            <div className="show">
              <h1>CBTS CONCERT</h1>
              <p>Book Ticket To Party with Sonyx</p>
            </div>

            <div className="showcase">
              <form onSubmit={handleSubmit}>
                <div className="group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    id="fullName"
                    name="fullName"
                    placeholder="Enter full Name"
                    required={true}
                    onChange={handleInput}
                  />
                </div>

                <div className="group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    name="email"
                    placeholder="Enter email"
                    required={true}
                    onChange={handleInput}
                  />
                </div>

                <button type="submit">
                  <p>Pay 700</p>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
