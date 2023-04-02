const { ObjectId } = require("mongodb");
const express = require('express');
const app = express();

// const SslCommerzPayment = require('sslcommerz-lts')
const SSLCommerzPayment = require('sslcommerz-lts')
const orderModels = require("../models/order.models");
const transId = require("../utils/transId");
const cors = require('cors');
app.use(cors());
// const store_id = 'webdc5f47477bc4df2'
// const store_passwd = ''
// const is_live = false //true for live, false for sandbox
const store_id = 'sundi64220b1ee2bcb'
const store_passwd = 'sundi64220b1ee2bcb@ssl'
const is_live = false

module.exports.saveOrder = async (req,res,next) => {
    try {
        const orderData = req.body.cart;
        const grandTotal = req.body.grandTotal;
        // console.log(orderData);
        const cusName = orderData.firstName + ' ' + orderData.lastName;
        const traId = transId(10);
        // console.log(traId);
        console.log('orderData',grandTotal);
        const data = {
            store_id: 'sundi64220b1ee2bcb',
            store_passwd: 'sundi64220b1ee2bcb@ssl',
            total_amount: grandTotal,
            currency: 'BDT',
            tran_id: 'TRE45',
            success_url: 'https://your_website.com/success',
            fail_url: 'https://your_website.com/fail',
            cancel_url: 'https://your_website.com/cancel',
            ipn_url: 'https://your_website.com/ipn',
            shipping_method: 'NO',
            product_name: 'Test product',
            product_category: 'Test category',
            product_profile: 'general'
        };
        // const sslcz = new SSLCommerzPayment(store_id,store_passwd,is_live)
        // sslcz.initPayment(config,function (err,response) {
        //     if (err) {
        //         console.log(err);
        //         return;
        //     }
        //     console.log(response.GatewayPageURL);
        //     res.redirect(response.GatewayPageURL)
        // });
        const orderNewData = {
            total_amount: grandTotal,
            products: orderData,
            product_name: data.product_name,
            cus_name: data.cus_name,
            cus_email: data.cus_email,
            ship_address: data.ship_add1,
            cus_postcode: data.cus_postcode,
            cus_phone: data.cus_phone,
            tran_id: data.tran_id,
            status: 'pending',
            payment: 'completed',
            shipping_method: data.shipping_method,
        }
        // console.log('orderNewData',orderNewData);
        req.data = orderNewData;
        // const doc = new orderModels(orderNewData);
        // const result = await doc.save();
        // console.log(result);
        // res.status(200).send(result)
        next();
    } catch (error) {
        console.log(error);
        res.send({ error: error.message });
    }

}
module.exports.updateOrderById = async (req,res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const filter = { _id: ObjectId(id) };
        const update = { $set: { data } };
        const result = await orderModels.findOneAndUpdate(filter,update)
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.send({ error: error.message });
    }

}