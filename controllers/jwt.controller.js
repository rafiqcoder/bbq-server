const jwt = require('jsonwebtoken');
const userModels = require('../models/user.models');

module.exports.getJwt = async (req,res,next) => {

    try {
        const email = req.query.email;
        const query = { email: email }
        const findUser = await userModels.findOne(query);
        if (!findUser) {
            return res.status(400).send({ error: 'User not found' });
        }
        const token = jwt.sign({ email },process.env.ACCESS_SECRET_TOKEN,{ expiresIn: '1d' });

        return res.status(200).send({ token: token });
    } catch (error) {
        console.log(error);
        res.send({ error: error.message });
    }

}