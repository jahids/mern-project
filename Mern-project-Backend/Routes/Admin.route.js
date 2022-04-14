const { Router } = require('express');
const express = require('express');
const UserModel = require('../Models/UserModel');
const router = require('express').Router();

router.get('/users', async (req, res , next) => {
    try {
        const AllUsers = await UserModel.find();
        res.send(AllUsers);
        console.log(AllUsers.role, 'test ro')

    } catch (error) {
        
    }
})

module.exports = router;
