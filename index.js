const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 5000;
const jwt = require('jsonwebtoken');
const SSLCommerzPayment = require('sslcommerz-lts')
const errorHandler = require('./errorHandler.js');
const dbConnect = require('./utils/dbConnect');
const userRoute = require('./routes/v1/user.route');
const bbqRoute = require('./routes/v1/bbq.route');
const menuRoute = require('./routes/v1/menu.route');
const cartRoute = require('./routes/v1/cart.route');
const orderRoute = require('./routes/v1/order.route');
const commentRoute = require('./routes/v1/comment.route');
const { MongoClient,ServerApiVersion } = require('mongodb');
const app = express();

app.use(express.json());
app.use(cors());
// const path = require('path');
// app.use(express.static('public'));


const store_id = 'webdc5f47477bc4df2'
const store_passwd = 'webdc5f47477bc4df2@ssl'
const is_live = false //true for live, false for sandbox

dbConnect()


// const connectDB = async () => {
//     try {
//         await mongoose.connect(uri)
//         console.log('MongoDB Connected...');
//     } catch (err) {
//         console.error(err.message);
//         // process.exit(1);
//     }
// }
// connectDB();

async function run() {

    // connect to the MongoDB cluster
    // const UserList = client.db('SundialDb').collection('UserList');
    // const Categories = client.db('ResaleCycle').collection('categories');
    // const BBQProducts = client.db('SundialDb').collection('BBQProducts');
    // const CartDb = client.db('SundialDb').collection('CartProducts');
    // const OrdersDb = client.db('SundialDb').collection('OrdersDb');
    // const ImgDb = client.db('SundialDb').collection('ImgDb');
    // // const MenuDb = client.db('SundialDb').collection('MenuDb');

    app.use('/api/v1/user',userRoute);
    app.use('/api/v1/bbq',bbqRoute);
    app.use('/api/v1/menu',menuRoute);
    app.use('/api/v1/cart',cartRoute);
    app.use('/api/v1/order',orderRoute);
    app.use('/api/v1/comment',commentRoute);


    // app.all('*',(req,res) => {
    //     res.send('No Route Found')
    // })
} run().catch(console.dir);

app.listen(port,() => {
    // console.log(`Server is running on port: ${port}`);
    // connectDB();
})