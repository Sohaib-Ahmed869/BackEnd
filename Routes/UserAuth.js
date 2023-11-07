require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../Models/Customer');
const bcrypt = require('bcrypt');

const auth = async (req, res, next) => {
    if(req.headers.token){
        jwt.verify(req.headers.token, process.env.SECRET, async(err, decoded) => {
            if(err){
                res.json({ message : err.message });
            }
            else{
                const user = await User.findOne({ Phone : decoded.Phone, Password : await bcrypt.hash(decoded.password, 10)});
                if(user){
                    next();
                }
                else{
                    res.json({ message : 'User not found' });
                }
            }
        });
    }
    else
    {
        res.json({ message : 'Token not found' });
    }
}

module.exports = auth;