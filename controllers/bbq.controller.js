const { ObjectId } = require("mongodb");
const errorHandler = require("../errorHandler");
// const bbqModels = require("../models/bbq.models");
const dbConnect = require("../utils/dbConnect");
const client = dbConnect();

const bbqModels = client.db('SundialDb').collection('BBQProducts');


module.exports.getAllBbq = async (req,res) => {
    try {
        const BBQproducts = await bbqModels.find({}).toArray();
        // console.log('BBQproducts',BBQproducts);
        res.status(200).json(BBQproducts)
    } catch (error) {
        res.send({ error: error.message });
    }
}
module.exports.saveBbq = async (req,res) => {
    try {
        const product = req.body;
        // console.log(product);
        const doc = new bbqModels(product);
        const result = await doc.save();
        // console.log(result);
        // const query = { name: product.name }
        //save to db

        // console.log(result);
        return res.status(200).send(result);
        // console.log(result);
    } catch (error) {
        res.send({ error: error.message });
    }
}
module.exports.getBbqById = async (req,res) => {
    try {
        const id = req.params.id;
        console.log(id);
        if (id !== '[object Object]') {

            const BBQproducts = await bbqModels.findOne({ _id: ObjectId(id) })
            console.log(BBQproducts);
            return res.send(BBQproducts)
        }
    } catch (error) {
        res.send({ error: error.message });
    }
}
module.exports.deleteById = async (req,res) => {
    try {
        const id = req.params.id;
        console.log(id);
        if (id !== '[object Object]') {

            const BBQproducts = await bbqModels.deleteOne({ _id: ObjectId(id) })
            console.log(BBQproducts);
            return res.send(BBQproducts)
        }
    } catch (error) {
        res.send({ error: error.message });
    }
}
module.exports.updateById = async (req,res) => {
    try {
        const id = req.params.id;
        const product = req.body;
        const filter = { _id: ObjectId(id) }

        const update = { $set: product }
        if (id !== '[object Object]') {

            const BBQproducts = await bbqModels.findOneAndUpdate(filter,update)
            console.log(BBQproducts);
            return res.send(BBQproducts)
        }
    } catch (error) {
        res.send({ error: error.message });
    }
}