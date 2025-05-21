import express from 'express';
import { createOrder, getPaymentDetails } from '../controllers/payment.controllers.js';

const router = express.Router();

router.post('/order', createOrder);
router.get('/details/:paymentId', getPaymentDetails);

export default router;
