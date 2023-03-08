const { ObjectId } = require("mongodb");
const userModels = require("../models/user.models");

module.exports.saveUser = async (req,res) => {
    try {
        const user = req.body;
        console.log(user);
        const query = { email: user.email }
        const existUser = await userModels.find(query)
        if (existUser.length === 0) {
            const doc = new userModels(user);
            console.log(doc);
            const result = await doc.save();
            console.log(result);
            return res.status(200).send(result);
            // console.log(result);
        }
        const userExist = new Error("User already exist");
        throw userExist;
    } catch (error) {
        res.send({ error: error.message });
    }
}

module.exports.getAllUsers = async (req,res) => {

    try {
        const Users = await userModels.find({})
        res.status(200).send(Users)
    } catch (error) {
        res.send({ error: error.message });
    }
}
module.exports.deleteUserById = async (req,res) => {

    try {
        const id = req.params.id;
        const query = { _id: ObjectId(id) }
        const result = await userModels.deleteOne(query)

        res.status(200).send(result)
    } catch (error) {
        res.send({ error: error.message });
    }
}
module.exports.updateUserById = async (req,res) => {

    try {
        const email = req.body.email;
        const userData = req.body;
        const query = { email: email }
        const update = { $set: { userData } }
        const result = await userModels.findOneAndUpdate(query,update)

        res.status(200).send(result)
    } catch (error) {
        res.send({ error: error.message });
    }
}
