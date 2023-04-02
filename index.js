const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:3000',
        // origin: 'https://bbq.netlify.app',
        credentials: true
    }
));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// const SSLCommerzPayment = require('sslcommerz-lts')
const SSLCommerz = require('sslcommerz-nodejs');
const errorHandler = require('./errorHandler.js');
const dbConnect = require('./utils/dbConnect');
const userRoute = require('./routes/v1/user.route');
const bbqRoute = require('./routes/v1/bbq.route');
const menuRoute = require('./routes/v1/menu.route');
const cartRoute = require('./routes/v1/cart.route');
const orderRoute = require('./routes/v1/order.route');
const commentRoute = require('./routes/v1/comment.route');
const jwtRoute = require('./routes/v1/jwt.route');
const isAdmin = require('./routes/v1/admin.route');
const emailRoute = require('./routes/v1/email.route');
const { MongoClient,ServerApiVersion } = require('mongodb');

// app.use(cookieParser());
// const path = require('path');
// app.use(express.static('public'));
// const store_id = 'webdc5f47477bc4df2'
// const store_passwd = 'webdc5f47477bc4df2@ssl'
// const is_live = false
const sslcommerz = new SSLCommerz({
    store_id: 'sundi64220b1ee2bcb',
    store_password: 'sundi64220b1ee2bcb@ssl',
    is_sandbox: true // set to true for sandbox mode
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sundialcluster.nmgilo7.mongodb.net/SundialDb?retryWrites=true&w=majority`;


mongoose.connect(uri)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))



// export default connectDB;

async function run() {

    app.use('/api/v1/email',emailRoute);
    app.use('/api/v1/user',userRoute);
    app.use('/api/v1/jwt',jwtRoute)
    app.use('/api/v1/admin',isAdmin)
    app.use('/api/v1/bbq',bbqRoute);
    app.use('/api/v1/menu',menuRoute);
    app.use('/api/v1/cart',cartRoute);
    app.use('/api/v1/order',orderRoute);
    app.use('/api/v1/comment',commentRoute);
    app.post('/api/v1/payment',async (req,res) => {
        try {
            sslcommerz.init_transaction({
                total_amount: 100,
                currency: 'BDT',
                tran_id: 'your_transaction_id',
                success_url: 'http://localhost:3000/success',
                fail_url: 'http://localhost:3000/fail',
                cancel_url: 'http://localhost:3000/cancel',
                emi_option: 0
            },(response) => {
                console.log(response);
                // redirect to SSLCommerz checkout page
            });
            // const orderNewData = {
            //     total_amount: data.total_amount,
            //     products: orderData.cartData,
            //     product_name: data.product_name,
            //     cus_name: data.cus_name,
            //     cus_email: data.cus_email,
            //     ship_address: data.ship_add1,
            //     cus_postcode: data.cus_postcode,
            //     cus_phone: data.cus_phone,
            //     tran_id: data.tran_id,
            //     status: 'pending',
            //     payment: 'completed',
            //     shipping_method: data.shipping_method,
            // }
            // const doc = new orderModels(orderNewData);
            // const result = await doc.save();
            // console.log(result);
            // res.status(200).send(result)
        } catch (error) {
            console.log(error);
            res.send({ error: error.message });
        }

    })


    // app.all('*',(req,res) => {
    //     res.send('No Route Found')
    // })
} run().catch(console.dir);

app.listen(port,async () => {
    // console.log(`Server is running on port: ${port}`);
    // await connectDB();
})