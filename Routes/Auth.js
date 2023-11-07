require('dotenv').config();
const jwt = require('jsonwebtoken');
const Adm = require('../Models/Administration');


//make middleware auth

const auth = (req, res, next) => {
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
}

module.exports = auth;