import React from 'react';

const Payment = ({ onPaymentSuccess }) => {
    const handlePayment = async () => {
        const res = await fetch("http://localhost:3000/api/v1/payment/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ amount: 500 }) // ₹5.00
        });

        const data = await res.json();

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            name: "Test Corp",
            description: "Test Transaction",
            order_id: data.id,
            handler: function (response) {
                alert("Payment Successful!");
                console.log("Razorpay Response:", response);
                if (onPaymentSuccess) {
                    onPaymentSuccess(response.razorpay_payment_id);
                }
            },
            prefill: {
                name: "John Doe",
                email: "john@example.com",
                contact: "9999999999"
            },
            theme: {
                color: "#3399cc"
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <button
                onClick={handlePayment}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300"
            >
                Checkout
            </button>
        </div>
    );
};

export default Payment;
