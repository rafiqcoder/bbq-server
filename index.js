const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const jwt = require('jsonwebtoken');
const { MongoClient,ServerApiVersion,ObjectId } = require('mongodb');
const SSLCommerzPayment = require('sslcommerz-lts')
const app = express();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const errorHandler = require('./errorHandler.js');
const dbConnect = require('./utils/dbConnect');
const userRoute = require('./routes/v1/user.route');
const bbqRoute = require('./routes/v1/bbq.route');
const menuRoute = require('./routes/v1/menu.route');
const cartRoute = require('./routes/v1/cart.route');
const orderRoute = require('./routes/v1/order.route');

app.use(express.json());
app.use(cors());
// const path = require('path');
app.use(express.static('public'));


const store_id = 'webdc5f47477bc4df2'
const store_passwd = 'webdc5f47477bc4df2@ssl'
const is_live = false //true for live, false for sandbox


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sundialcluster.nmgilo7.mongodb.net/SundialDb?retryWrites=true&w=majority`;

const connectDB = async () => {
    try {
        await mongoose.connect(uri)
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

app.use('/api/v1/user',userRoute);
app.use('/api/v1/bbq',bbqRoute);
app.use('/api/v1/menu',menuRoute);
app.use('/api/v1/cart',cartRoute);
app.use('/api/v1/order',orderRoute);


app.all('*',(req,res) => {
    res.send('No Route Found')
})




app.listen(port,() => {
    // console.log(`Server is running on port: ${port}`);
    connectDB();
})