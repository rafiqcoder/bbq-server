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
        // origin: 'http://localhost:3000',
        origin: 'https://bbq.netlify.app',
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
const SSLCommerzPayment = require('sslcommerz-lts');
const SslCommerzPayment = require('sslcommerz-lts/api/payment-controller.js');

// app.use(cookieParser());
// const path = require('path');
// app.use(express.static('public'));
const store_id = 'sundi64220b1ee2bcb'
const store_passwd = 'sundi64220b1ee2bcb@ssl'
const is_live = false
// const sslcommerz = new SSLCommerz({
//     store_id: 'sundi64220b1ee2bcb',
//     store_password: 'sundi64220b1ee2bcb@ssl',
//     is_sandbox: true // set to true for sandbox mode
// });

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
    //get all bbq
    // app.post('/api/v1/ssl-payment-success',async (req,res) => {
        
    //     const data = req.body
    //     console.log(data);
    //     res.send({
    //         data: data.tran_id,
    //         status: 'success'
    //     })
    // })
    // app.post('/api/v1/ssl-payment-failure',async (req,res) => {
    //     return res.status(400).json({
    //         data: req.body,
    //     })
    // })
    // app.post('/api/v1/ssl-payment-cancel',async (req,res) => {
    //     return res.status(200).json({
    //         data: req.body,
    //     })
    // })
    // app.post('/api/v1/ssl-payment-ipn',async (req,res) => {
    //     return res.status(200).json({
    //         data: req.body,
    //     })
    // })
    // app.all('*',(req,res) => {
    //     res.send('No Route Found')
    // })
} run().catch(console.dir);

app.listen(port,async () => {
    // console.log(`Server is running on port: ${port}`);
    // await connectDB();
})