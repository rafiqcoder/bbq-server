const mongoose = require('mongoose');
const express = require('express');
const commentModels = require('../models/comment.models');
const dbConnect = require('../utils/dbConnect');
const router = express.Router();

// const client = dbConnect();

// const comment = client.db('SundialDb').collection('reviews');


module.exports.saveComment = async (req,res) => {
    const comment = req.body;
    const newComment = new commentModels(comment)
    try {
        const saveComment = await newComment.save();
        res.status(200).json(saveComment);
    } catch (error) {
        res.status(500).json(error);
    }
}
module.exports.getComments = async (req,res) => {
    try {

        const getComments = await commentModels.find({})
        console.log(getComments);
        res.status(200).json(getComments);
    } catch (error) {
        res.status(500).json(error);
    }
}
module.exports.getCommentsById = async (req,res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const getComments = await commentModels.find({ productId: id })
        console.log(getComments);
        res.status(200).json(getComments);
    } catch (error) {
        res.status(500).json(error);
    }
}
module.exports.deleteComment = async (req,res) => {
    const id = req.params.id;
    try {
        const deleteComment = await commentModels.deleteOne({ _id: mongoose.Types.ObjectId(id) });
        res.status(200).json(deleteComment);
    } catch (error) {
        res.status(500).json(error);
    }
}