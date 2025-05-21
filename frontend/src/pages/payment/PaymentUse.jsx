import React, { useState } from 'react';
import Payment from '../../components/Payment';

const PaymentUse = () => {
    const [paymentId, setPaymentId] = useState('');
    const [paymentDetails, setPaymentDetails] = useState(null);

    const fetchPaymentDetails = async () => {
        if (!paymentId) return;

        const res = await fetch(`http://localhost:3000/api/v1/payment/details/${paymentId}`);
        const data = await res.json();
        setPaymentDetails(data);
    };

    const handlePaymentSuccess = (id) => {
        setPaymentId(id);
        fetchPaymentDetails(); // Automatically fetch on success
    };

    return (
        <div className="flex flex-col items-center gap-6 mt-10 px-4">
            <h1 className="text-2xl font-bold">Make a Payment</h1>

            <Payment onPaymentSuccess={handlePaymentSuccess} />

            <input
                type="text"
                value={paymentId}
                onChange={(e) => setPaymentId(e.target.value)}
                placeholder="Enter Razorpay Payment ID"
                className="border px-4 py-2 rounded w-80"
            />

            <button
                onClick={fetchPaymentDetails}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
            >
                Get Payment Details
            </button>

            {paymentDetails && (
                <div className="mt-4 bg-gray-100 p-4 rounded shadow w-full max-w-md text-sm">
                    <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
                    <p><strong>Payment ID:</strong> {paymentDetails.id}</p>
                    <p><strong>Amount:</strong> ₹{paymentDetails.amount / 100}</p>
                    <p><strong>Status:</strong> {paymentDetails.status}</p>
                    <p><strong>Method:</strong> {paymentDetails.method}</p>
                    <p><strong>Card Last 4:</strong> {paymentDetails.card?.last4 || 'N/A'}</p>
                    <p><strong>Email:</strong> {paymentDetails.email}</p>
                    <p><strong>Contact:</strong> {paymentDetails.contact}</p>
                </div>
            )}
        </div>
    );
};

export default PaymentUse;
