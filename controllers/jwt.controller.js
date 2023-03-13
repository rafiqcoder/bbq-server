const jwt = require('jsonwebtoken');
const userModels = require('../models/user.models');

module.exports.getJwt = async (req,res,next) => {

    try {
        const email = req.query.email;
        const query = { email: email }
        console.log(email)
        const findUser = await userModels.findOne(query);
        if (!findUser) {
            return res.status(400).send({ error: 'User not found' });
        }
        const token = jwt.sign({ email },process.env.ACCESS_SECRET_TOKEN,{ expiresIn: '15s' });
        const refreshToken = jwt.sign({ email },process.env.ACCESS_REFRESH_TOKEN,{ expiresIn: '7d' });

        // console.log(refreshToken);
        res.cookie('refreshToken',refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
            // secure: true
        })
        return res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.send({ error: error.message });
    }

}