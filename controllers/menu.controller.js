const { ObjectId } = require("mongodb");
const menuModels = require("../models/menu.models");

module.exports.saveMenu = async (req,res) => {
    try {
        const menu = req.body;
        // console.log('menu',menu);
        const doc = new menuModels(menu);
        const result = await doc.save();
        // console.log(result);
        return res.status(200).send(result);
    } catch (error) {
        res.send({ error: error.message });
    }
}
module.exports.getAllMenu = async (req,res) => {
    try {
        const menu = await menuModels.find({});
        return res.send(menu);

    } catch (error) {
        res.send({ error: error.message });
    }
}
module.exports.getMenuById = async (req,res) => {
    try {
        const id = req.params.id;
        console.log(id);
        if (id !== '[object Object]') {
            const menuProduct = await menuModels.findOne({ _id: ObjectId(id) })
            // console.log(id);
            return res.send(menuProduct)
        }
    } catch (error) {
        res.send({ error: error.message });
    }
}
module.exports.updateMenuById = async (req,res) => {
    try {
        const id = req.params.id;
        const product = req.body;
        const update = { $set: product }

        const filter = { _id: ObjectId(id) }
        if (id !== '[object Object]') {
            const result = await menuModels.findOneAndUpdate(filter,update)
            // console.log(id);
            return res.send(result)
        }
    } catch (error) {
        res.send({ error: error.message });
    }
}
module.exports.deleteMenuById = async (req,res) => {
    try {
        const id = req.params.id;
        const filter = { _id: ObjectId(id) }
        if (id !== '[object Object]') {
            const result = await menuModels.deleteOne(filter)
            // console.log(id);
            return res.send(result)
        }
    } catch (error) {
        res.send({ error: error.message });
    }
}