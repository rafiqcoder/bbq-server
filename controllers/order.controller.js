const { ObjectId } = require("mongodb");


// const SslCommerzPayment = require('sslcommerz-lts')
const orderModels = require("../models/order.models");
const transId = require("../utils/transId");

// const store_id = 'webdc5f47477bc4df2'
// const store_passwd = ''
// const is_live = false //true for live, false for sandbox
const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = 'webdc5f47477bc4df2'
const store_passwd = 'webdc5f47477bc4df2@ssl'
const is_live = false 
    
module.exports.saveOrder = async (req,res) => {
    try {
        const orderData = req.body;

        console.log(orderData.cartData.totalPrice);
        const cusName = orderData.firstName + ' ' + orderData.lastName;
        const traId = transId(10);
        console.log(traId);
        const data = {
            total_amount: 100,
            currency: 'BDT',
            tran_id: 'REF123', // use unique tran_id for each api call
            success_url: 'http://localhost:3030/success',
            fail_url: 'http://localhost:3030/fail',
            cancel_url: 'http://localhost:3030/cancel',
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            product_name: 'Computer.',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: 'Customer Name',
            cus_email: 'customer@example.com',
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01711111111',
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };
        const sslcz = new SSLCommerzPayment(store_id,store_passwd,is_live)
        sslcz.init(data).then(apiResponse => {
            // Redirect the user to payment gateway
            let GatewayPageURL = apiResponse.GatewayPageURL
            res.redirect(GatewayPageURL)
            console.log('Redirecting to: ',GatewayPageURL)
        });
        const orderNewData = {
            total_amount: data.total_amount,
            products: orderData.cartData,
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
        const doc = new orderModels(orderNewData);
        const result = await doc.save();
        console.log(result);
        res.status(200).send(result)
    } catch (error) {
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
        res.send({ error: error.message });
    }

}