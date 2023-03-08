const mongoose = require('mongoose');
const express = require('express');
const commentModels = require('../models/comment.models');
const router = express.Router();

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
module.exports.deleteComment = async (req,res) => {
    const id = req.params.id;
    try {
        const deleteComment = await commentModels.deleteOne({ _id: mongoose.Types.ObjectId(id) });
        res.status(200).json(deleteComment);
    } catch (error) {
        res.status(500).json(error);
    }
}