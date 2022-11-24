import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";



import "./styles.css";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe
    ('pk_test_51M4mbsAfQqkZDeROXg9a4gsforPF45pYdoJZvVraUnSXUXFj3bKEFwd7qnv9605FDlMlsjz7auZ3W7LjIFM1KR8800RwcUvlRm');
  }

  return stripePromise;
};

const Checkout = () => {
  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const item = {
    price: "price_1M4pnnAfQqkZDeROB1YXkYGp",
    quantity: 1
  };

  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`
  };

  const redirectToCheckout = async () => {
    setLoading(true);
    console.log("redirectToCheckout");

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);

    if (error) setStripeError(error.message);
    setLoading(false);
  };

  if (stripeError) alert(stripeError);

  return (
    <div className="checkout_body">
      <div className="checkout_section">
    <div className="checkout">
      <h1>FitratInsan -Donation Community</h1>
      <p className="checkout-title">
A House Of Giving & Power Generosity</p>
      {/* <p className="checkout-description">
      Fitrat Insan
A House Of Givivig & Power Generosity
      </p> */}
      <h1 className="checkout-price">$10</h1>
      {/* <img
        className="checkout-product-image"
        src="https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/s93-pm-2757_1.jpg?w=1200&h=1200&dpr=1&fit=clip&crop=default&fm=jpg&q=75&vib=3&con=3&usm=15&cs=srgb&bg=F4F4F3&ixlib=js-2.2.1&s=05795ca7e68606242e2dd767860cfacb"
        alt="Product"
      /> */}
      <button
        className="checkout-button"
        onClick={redirectToCheckout}
        disabled={isLoading}
      >
        <div className="grey-circle">
          <div className="purple-circle">
            <img className="icon" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNSAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMSAxOUg0QzMuMTcgMTkgMi41IDE4LjMzIDIuNSAxNy41VjYuNUMyLjUgNS42NyAzLjE3IDUgNCA1SDIxQzIxLjgzIDUgMjIuNSA1LjY3IDIyLjUgNi41VjE3LjVDMjIuNSAxOC4zMyAyMS44MyAxOSAyMSAxOVoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMyIvPgo8cGF0aCBkPSJNMjIuNSA5SDIuNVYxMEgyMi41VjlaIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjYiLz4KPC9zdmc+Cg==" alt="credit-card-icon" />
          </div>
        </div>
        <div className="text-container">
          <p className="text">{isLoading ? "Loading..." : "Donate"}</p>
        </div>
      </button>
    </div>
    </div>
    </div>
  );
};

export default Checkout;
