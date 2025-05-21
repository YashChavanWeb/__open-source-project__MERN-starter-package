import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    razorpayOrderId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, default: 'created' },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
