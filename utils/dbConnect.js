const mongoose = require('mongoose');

function dbConnect(uri) {


    const connectDB = async () => {
        try {
            await mongoose.connect(uri)
            console.log('MongoDB Connected...');
        } catch (err) {
            console.error(err.message);
            process.exit(1);
        }
    }
}
module.exports = dbConnect;