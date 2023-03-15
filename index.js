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
        origin: 'https://bbq.netlify.app',
        credentials: true
    }
));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const SSLCommerzPayment = require('sslcommerz-lts')
const errorHandler = require('./errorHandler.js');
const dbConnect = require('./utils/dbConnect');
const userRoute = require('./routes/v1/user.route');
const bbqRoute = require('./routes/v1/bbq.route');
const menuRoute = require('./routes/v1/menu.route');
const cartRoute = require('./routes/v1/cart.route');
const orderRoute = require('./routes/v1/order.route');
const commentRoute = require('./routes/v1/comment.route');
const jwtRoute = require('./routes/v1/jwt.route');
const isAdming = require('./routes/v1/admin.route');
const emailRoute = require('./routes/v1/email.route');
const { MongoClient,ServerApiVersion } = require('mongodb');
// app.use(cookieParser());
// const path = require('path');
// app.use(express.static('public'));
const store_id = 'webdc5f47477bc4df2'
const store_passwd = 'webdc5f47477bc4df2@ssl'
const is_live = false

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sundialcluster.nmgilo7.mongodb.net/SundialDb?retryWrites=true&w=majority`;
// dbConnect()
// const mongoose = require('mongoose');
// mongoose.connect(uri);


mongoose.connect(uri)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))



// export default connectDB;

async function run() {

    // connect to the MongoDB cluster
    // const UserList = client.db('SundialDb').collection('UserList');
    // const Categories = client.db('ResaleCycle').collection('categories');
    // const BBQProducts = client.db('SundialDb').collection('BBQProducts');
    // const CartDb = client.db('SundialDb').collection('CartProducts');
    // const OrdersDb = client.db('SundialDb').collection('OrdersDb');
    // const ImgDb = client.db('SundialDb').collection('ImgDb');
    // // const MenuDb = client.db('SundialDb').collection('MenuDb');

    app.use('/api/v1/email',emailRoute);
    app.use('/api/v1/user',userRoute);
    app.use('/api/v1/jwt',jwtRoute)
    app.use('/api/v1/admin',isAdming)
    app.use('/api/v1/bbq',bbqRoute);
    app.use('/api/v1/menu',menuRoute);
    app.use('/api/v1/cart',cartRoute);
    app.use('/api/v1/order',orderRoute);
    app.use('/api/v1/comment',commentRoute);
    app.post('/api/v1/payment',async (req,res) => {
        try {
            const orderData = req.body;

            // console.log(orderData.cartData);
            const cusName = orderData.firstName + ' ' + orderData.lastName;
            const traId = transId(10);
            // console.log(traId);
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
            }).catch(error => {
                console.log(error)
            })
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
            // const doc = new orderModels(orderNewData);
            // const result = await doc.save();
            // console.log(result);
            // res.status(200).send(result)
        } catch (error) {
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