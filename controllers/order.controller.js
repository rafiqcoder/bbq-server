const { ObjectId } = require("mongodb");
const orderModels = require("../models/order.models");
const transId = require("../utils/transId");

module.exports.saveOrder = async (req,res) => {
    try {
        const orderData = req.body;
        // console.log(orderData.cartData.totalPrice);
        const cusName = orderData.firstName + ' ' + orderData.lastName;
        const transId = transId(10);
        const data = {
            total_amount: 100,
            currency: 'BDT',
            tran_id: transId, // use unique tran_id for each api call
            success_url: 'http://localhost:3000/success',
            fail_url: 'http://localhost:3030/fail',
            cancel_url: 'http://localhost:3000/cancel',
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            product_name: 'Computer.',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: cusName,
            cus_email: orderData.email,
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: orderData.phone,
            cus_fax: '01711111111',
            ship_name: cusName,
            ship_add1: orderData.address,
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
            console.log('GatewayPageURL',GatewayPageURL);
            res.send({ url: GatewayPageURL })

        });
        const orderNewData = {
            products: orderData.cartData,
            total_amount: data.total_amount,
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