const { ServerApiVersion, MongoClient } = require('mongodb');
const mongoose = require('mongoose');

function dbConnect() {

    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sundialcluster.nmgilo7.mongodb.net/SundialDb?retryWrites=true&w=majority`;

    const client = new MongoClient(uri,{ useNewUrlParser: true,useUnifiedTopology: true,serverApi: ServerApiVersion.v1 });


//     const connectDB = async () => {
//         try {
//             await mongoose.connect(uri)
//             console.log('MongoDB Connected...');
//         } catch (err) {
//             console.error(err.message);
//             process.exit(1);
//         }
//     }
    return client;

}

module.exports = dbConnect;