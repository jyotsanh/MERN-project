const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const EsewaPaymentSchemadb = require("../schema/esewaIntegration");
const OrderSchemadb = require("../schema/orderSchema");

const router = express.Router();

// eSewa UAT config
const esewaConfig = {
    successUrl: 'http://localhost:8000/esewa/success', // Your success URL
    failureUrl: 'http://localhost:8000/esewa/failure', // Your failure URL
    merchantCode: 'EPAYTEST', // Replace with your eSewa Merchant Code
    esewaEndpoint: 'https://uat.esewa.com.np/epay/main', // eSewa Test URL
};

// Route to initiate eSewa payment
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
            pid: payment._id.toString(), 
            scd: esewaConfig.merchantCode, 
            su: esewaConfig.successUrl, 
            fu: esewaConfig.failureUrl, 
        });

        const paymentUrl = `${esewaConfig.esewaEndpoint}?${params.toString()}`;
        res.redirect(paymentUrl);

    } catch (error) {
        console.error("Error in /pay route:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Success route to handle eSewa payment verification
router.get('/esewa/success', async (req, res) => {
    const { amt, rid, pid, scd } = req.query;

    if (!mongoose.Types.ObjectId.isValid(pid)) {
        return res.status(400).json({ message: 'Invalid payment ID' });
    }

    try {
        const payment = await EsewaPaymentSchemadb.findById(pid);
        if (!payment) {
            return res.status(404).json({ message: 'Payment record not found' });
        }

        // Verify payment with eSewa
        const verificationResponse = await axios.post('https://uat.esewa.com.np/epay/transrec', null, {
            params: {
                amt: amt,
                rid: rid,
                pid: pid,
                scd: scd
            }
        });

        if (verificationResponse.data.response_code === 'Success') {
            payment.transaction_id = rid;
            payment.payment_status = 'Success';
            await payment.save();

            const order = await OrderSchemadb.findById(payment.order_id);
            if (order) {
                order.status = 'Paid';
                await order.save();
            }

            res.json({ message: 'Payment successful!' });
        } else {
            res.json({ message: 'Payment verification failed' });
        }
    } catch (error) {
        console.error("Error in /esewa/success route:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Failure route to handle payment failure
router.get('/esewa/failure', async (req, res) => {
    const { pid } = req.query;

    if (!mongoose.Types.ObjectId.isValid(pid)) {
        return res.status(400).json({ message: 'Invalid payment ID' });
    }

    try {
        const payment = await EsewaPaymentSchemadb.findById(pid);
        if (!payment) {
            return res.status(404).json({ message: 'Payment record not found' });
        }

        payment.payment_status = 'Failed';
        await payment.save();

        res.json({ message: 'Payment failed!' });
    } catch (error) {
        console.error("Error in /esewa/failure route:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
