require('dotenv').config();
const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Adm = require('../Models/Administrator');


//make middleware auth

router.use((req, res, next) => {
    if(req.headers.token){
        jwt.verify(req.headers.token, process.env.SECRET, (err, decoded) => {
            if(err){
                res.json({ message : err.message });
            }
            else{
                const user = Adm.findOne({ Name : decoded.Name, Password : decoded.Password});
                if(user && user.Role == 'Admin'){
                    next();
                }
                else{
                    res.json({ message : 'User not found' });
                }
            }
        });
    }
});

model.exports = router;