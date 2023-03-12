const express = require('express');
const cookieParser = require('cookie-parser');
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
const jwtRoute = require('./routes/v1/jwt.route');
const isAdming = require('./routes/v1/admin.route');
const emailRoute = require('./routes/v1/email.route');
const { MongoClient,ServerApiVersion } = require('mongodb');
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
// const path = require('path');
// app.use(express.static('public'));


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


    // app.all('*',(req,res) => {
    //     res.send('No Route Found')
    // })
} run().catch(console.dir);

app.listen(port,async () => {
    // console.log(`Server is running on port: ${port}`);
    // await connectDB();
})