import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import Payment from '../models/payment.model.js';


dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: amount * 100, // Razorpay expects amount in paise
            currency: "INR",
            receipt: `receipt_order_${Math.random() * 1000}`,
        };

        const order = await razorpay.orders.create(options);

        // Save to MongoDB
        const payment = new Payment({
            razorpayOrderId: order.id,
            amount: order.amount,
            currency: order.currency,
            status: 'created'
        });

        await payment.save();

        res.status(200).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create Razorpay order" });
    }
};

export const getPaymentDetails = async (req, res) => {
    try {
        const { paymentId } = req.params;

        const payment = await razorpay.payments.fetch(paymentId);

        res.status(200).json(payment);
    } catch (err) {
        console.error("Error fetching payment:", err);
        res.status(500).json({ message: "Failed to fetch payment details" });
    }
};

