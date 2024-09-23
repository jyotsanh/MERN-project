const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const router = express.Router();
const EsewaPaymentSchemadb = require('./models/EsewaPayment'); // Replace with actual path to the schema
const OrderSchemadb = require('./models/Order'); // Replace with actual path to the schema

// eSewa UAT config
const esewaConfig = {
    successUrl: 'http://localhost:8000/esewa/success', // Your success URL
    failureUrl: 'http://localhost:8000/esewa/failure', // Your failure URL
    merchantCode: 'EPAYTEST', // Replace with your eSewa Merchant Code
    esewaEndpoint: 'https://uat.esewa.com.np/epay/main', // eSewa Test URL
};

// 1. Route to initiate eSewa payment
router.post('/pay', async (req, res) => {
    const { order_id, amount } = req.body;

    try {
        const order = await OrderSchemadb.findById(order_id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Store the transaction in the database
        const payment = new EsewaPaymentSchemadb({
            user_id: order.user_id,
            order_id: order._id,
            amount: amount,
            payment_status: 'Pending'
        });

        await payment.save();

        // Redirect to eSewa for payment
        const params = new URLSearchParams({
            amt: amount,
            psc: 0,
            pdc: 0,
            txAmt: 0,
            tAmt: amount,
            pid: payment._id, // Unique Payment ID
            scd: esewaConfig.merchantCode, // Merchant Code
            su: esewaConfig.successUrl, // Success URL
            fu: esewaConfig.failureUrl, // Failure URL
        });

        const paymentUrl = `${esewaConfig.esewaEndpoint}?${params.toString()}`;
        res.redirect(paymentUrl);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// 2. Success route to handle eSewa payment verification
router.get('/esewa/success', async (req, res) => {
    const { amt, rid, pid, scd } = req.query;

    try {
        const verificationResponse = await axios.post('https://uat.esewa.com.np/epay/transrec', null, {
            params: {
                amt: amt,
                rid: rid,
                pid: pid,
                scd: scd
            }
        });

        if (verificationResponse.data.response_code === 'Success') {
            const payment = await EsewaPaymentSchemadb.findById(pid);
            payment.transaction_id = rid;
            payment.payment_status = 'Success';
            await payment.save();

            const order = await OrderSchemadb.findById(payment.order_id);
            order.status = 'Paid';
            await order.save();

            res.json({ message: 'Payment successful!' });
        } else {
            res.json({ message: 'Payment verification failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Payment verification failed' });
    }
});

// 3. Failure route to handle payment failure
router.get('/esewa/failure', async (req, res) => {
    const { pid } = req.query;

    try {
        const payment = await EsewaPaymentSchemadb.findById(pid);
        payment.payment_status = 'Failed';
        await payment.save();

        res.json({ message: 'Payment failed!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
