const { ObjectId } = require("mongodb");

module.exports.saveOrder = async (req,res) => {
    try {
        const orderData = req.body;
        // console.log(orderData.cartData.totalPrice);
        // const doc = new OrdersDb(orderData);
        // const result = await doc.save();
        const status = 'pending';
        const payment = 'completed';
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
            cus_name: '',
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
            res.send({ url: GatewayPageURL })

        });
        // const orderNewData = {
        //     total_amount: data.total_amount,
        //     product_name: data.product_name,
        //     cus_name : data.cus_name
        //     status:'pending',
        //     payment:'completed'
        // } 
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