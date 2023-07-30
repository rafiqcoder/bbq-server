const orderModels = require("../models/order.models");

module.exports.PaySuccess = async (req,res) => {
    try {
        const id = req.params.transId;
        console.log(id);
        const data = req.body;
        const filter = { tran_id: id };
        const update = { $set: { payment: 'paid' } };
        const result = await orderModels.findOneAndUpdate(filter,update)
        console.log(result);
        // res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.send({ error: error.message });
    }
}