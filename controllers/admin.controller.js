const express = require('express');
const userModels = require('../models/user.models');


module.exports.isAdmin = async (req,res,next) => {
    try {
        const email = req.query.email;
        const user = req.user;
        // console.log(user);
        if (email !== user.email) {
            return res.status(400).send({ error: 'User not found' });
        }
        const query = { email: email }
        
        const findUser = await userModels.findOne(query);
        // console.log(findUser);
        if (findUser) {
            
            if (findUser.admin) {
                
                return res.status(200).send({ admin: true })
            } else {
                return
            }

        }
    } catch (error) {
        console.log(error);
        res.send({ error: error.message });
    }
}