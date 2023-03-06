const cartModels = require("../models/cart.models");

module.exports.savetoCart = async (req,res) => {
    try {
        const email = req.query.email;
        const cartData = req.body;
        const query = { email: email }

        const data = {
            email: email,
            cartData,
        }
        const userProducts = await cartModels.findOne(query);

        if (userProducts) {
            const updateData = await cartModels.updateOne(query,{ $set: data },{ upsert: true })
            console.log(updateData);
            return res.send(updateData)
        }
        const doc = new cartModels(data);
        const result = await doc.save();
        return res.send(result);
    } catch (error) {
        res.send({ error: error.message });
    }
}

module.exports.getCart = async (req,res) => {
    try {
        const email = req.query.email;
        const query = { email: email }
        const userEmail = email === undefined ? false : email
        if (userEmail) {
            const dbCartData = await cartModels.findOne(query)
            if (dbCartData) {
                return res.send(dbCartData.cartData)
            }
        }
    } catch (error) {
        res.send({ error: error.message });
    }
}