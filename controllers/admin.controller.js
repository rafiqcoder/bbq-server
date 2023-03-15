const express = require('express');
const userModels = require('../models/user.models');


module.exports.isAdmin = async (req,res,next) => {
    // console.log(req.headers);
    try {
        const email = req.query.email;
        const user = req.user;
        console.log('user',email);
        const accessToken = req.accessToken ? req.accessToken : null;
        console.log('accessToken',accessToken);
        // console.log(user);
        if (email !== user.email) {
            return res.status(404).json({
                logout: true,
                error: 'user not found'

            });
        }
        const query = { email: email }

        const findUser = await userModels.findOne(query);
        // console.log(findUser);
        if (findUser) {

            if (findUser.admin) {
                if (accessToken !== null) {

                    return res.status(200).json({
                        admin: true,
                        accessToken: accessToken,
                    })
                } else {
                    return res.status(200).json({
                        admin: true,
                    })
                }
            } else {
                return
            }

        }
    } catch (error) {
        console.log(error);
        res.send({ error: error.message });
    }
}