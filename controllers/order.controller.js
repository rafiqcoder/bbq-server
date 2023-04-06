const { ObjectId } = require("mongodb");
const express = require('express');
const app = express();
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
const port = 3000
module.exports.saveOrder = async (req,res,next) => {
    try {
        // const orderData = req.body;

        const { products: orderData,grandTotal,userData } = req.body
        // const grandTotal = req.body.grandTotal;
        // console.log(orderData);
        const cusName = userData.firstName + ' ' + userData.lastName;
        const traId = transId(10);
        // console.log(traId);
        console.log('grandTotal',grandTotal);
        // console.log('userData',userData);
        const data = {
            store_id: 'sundi64220b1ee2bcb',
            store_passwd: 'sundi64220b1ee2bcb@ssl',
            total_amount: grandTotal,
            currency: 'BDT',
            cus_name: cusName,
            ship_address: userData.address,
            cus_phone: userData.phone,
            cus_email: userData.email,
            tran_id: traId,
            success_url: 'http://localhost:5000/api/v1/ssl-payment-success',
            fail_url: 'http://localhost:5000/api/v1/ssl-payment-failure',
            cancel_url: 'http://localhost:5000/api/v1/ssl-payment-cancel',
            ipn_url: 'http://localhost:5000/api/v1/ssl-payment-ipn',
            shipping_method: 'NO',
            product_name: 'Test product',
            product_category: 'Test category',
            product_profile: 'general'
        };
        const orderNewData = {
            total_amount: grandTotal,
            products: orderData,
            product_name: data.product_name,
            cus_name: cusName,
            cus_email: data.cus_email,
            ship_address: data.ship_address,
            cus_phone: data.cus_phone,
            tran_id: data.tran_id,
            status: 'pending',
            payment: 'completed',
            shipping_method: data.shipping_method,
        }
        const sslcz = new SSLCommerzPayment(store_id,store_passwd,is_live)

        sslcz.init(data).then(apiResponse => {
            // Redirect the user to payment gateway
            const { GatewayPageURL } = apiResponse;
            // resUrl = apiResponse.GatewayPageURL
            // console.log('apiResponse',apiResponse);
            if (apiResponse?.GatewayPageURL) {
                // console.log('Redirecting to: ',GatewayPageURL)
                // console.log(apiResponse);
                res.send({ url: GatewayPageURL })
            }
            //sslcommerz validation 



            // console.log('orderNewData',orderNewData);

            // const doc = new orderModels(orderNewData);
            // const result = await doc.save();
            // console.log(result);
            // res.status(200).send(result)

        })
            .catch(err => console.log("err",err))
        // 
        //    res.send({ resUrl });

        // res.send({ url: "https://sandbox.sslcommerz.com/EasyCheckOut/testcde3a69cfc9258f869dd3d3fca406b34736"})

        req.data = orderNewData;
        // next();



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