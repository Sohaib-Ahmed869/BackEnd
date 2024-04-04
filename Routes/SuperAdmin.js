const SuperAdmin = require('../Models/SuperAdmin');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../Models/Administration');
const Router = express.Router();

//add admin
Router.post('/addAdmin', async (req, res) => {
    const admin = new Admin({
        Name: req.body.Name,
        Phone: req.body.Phone,
        Email: req.body.Email,
        Password: await bcrypt.hash(req.body.Password, 10),
        Role: "Admin"
    });
    try {
        const savedAdmin = await admin.save();
        return res.status(200).json({ admin: savedAdmin });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

//add superadmin
Router.post('/', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.Password, 10);
    const superadmin = new SuperAdmin({
        Name: req.body.Name,
        Password: hashedPassword
    });
    try {
        const savedSuperAdmin = await superadmin.save();
        return res.status(200).json({ superadmin: savedSuperAdmin, status: "success" });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

//login superadmin
Router.post('/login', async (req, res) => {
    const { Name, Password } = req.body;

    try {
        const superadmin = await SuperAdmin.findOne({ Name });

        if (!superadmin) {
            return res.status(400).json({ error: 'SuperAdmin not found' });
        }

        const isMatch = await bcrypt.compare(Password, superadmin.Password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        // Generate token
        const token = jwt.sign({ Name: superadmin.Name }, process.env.SECRET);

        res.status(200).json({ superadmin, token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
});


//update password
Router.put('/updatePassword', async (req, res) => {
    try {
        const superadmin = await SuperAdmin.findOne({ Name: req.body.Name });
        superadmin.Password = await bcrypt.hash(req.body.Password, 10);
        const updatedSuperAdmin = await superadmin.save();
        return res.status(200).json({ superadmin: updatedSuperAdmin });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

//delete admin
Router.delete('/deleteAdmin/:id', async (req, res) => {
    try {
        const deletedAdmin = await Admin.deleteOne({ _id: req.params.id });
        return res.status(200).json({ admin: deletedAdmin });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

//get admins
Router.get('/getAdmins', async (req, res) => {
    try {
        const admins = await Admin.find();
        return res.status(200).json({ admins });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);


module.exports = Router;