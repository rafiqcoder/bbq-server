const cartModels = require("../models/cart.models");


module.exports.emptyCartitems = async(req,res) => {
    const data = req.body;
    const email = req.query.email;
    console.log("empty email :" , email);
    const query = { email: email }
    const update = { $set: { cartData: [] } };
    const result = await cartModels.findOneAndUpdate(query,update)
    console.log(result);
    console.log("data",data);
};