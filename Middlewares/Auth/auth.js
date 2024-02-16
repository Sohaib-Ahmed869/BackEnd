require('dotenv').config();
const jwt = require('jsonwebtoken');
const Adm = require('../../Models/Administration');

const auth = (req, res, next) => {
    if (req.headers.token) {
        jwt.verify(req.headers.token, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res.json({ message: err.message });
            }
            else {
                const user = Adm.findOne({ Name: decoded.Name, Password: decoded.Password });
                if (user && user.Role == 'Admin') {
                    next();
                }
                if (user && user.Role == 'Manager') {
                    if (user.Branch_Name == req.body.Branch_Name) {
                        next();
                    }
                    else {
                        return res.json({ message: 'You are not allowed to access this branch' });
                    }
                }
            }
        });
    }
}

module.exports = auth;