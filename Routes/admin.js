const Router = require('express').Router();

const AdminModel = require('../Models/Administrator');
const auth = require('../auth');

const Admin = AdminModel.Admin;

Router.use(auth);

Router.get('/manager', (req, res) => {
    Admin.find()
    .then((admins) => {
        const managers = admins.filter((admin) => {
            return admin.IsManager == true;
        });
        res.json(managers);
    })
    .catch((err) => {
        res.send(err);
    });
});

Router.post('/manager', (req, res) => {
    const newAdmin = new Admin({
        Name: req.body.Name,
        Phone : req.body.Phone,
        Email: req.body.Email,
        Password: req.body.Password,
        Role: req.body.Role,
        Branch_Name: req.body.Branch_Name,
    });
    newAdmin.save()
    .then((admin) => {
        res.json(admin);
    })
    .catch((err) => {
        res.send(err);
    });
});

Router.delete('/manager/:id', (req, res) => {
    Admin.findByIdAndDelete(req.params.id)
    .then((admin) => {
        res.json(admin);
    })
    .catch((err) => {
        res.send(err);
    });
});

Router.put('/manager/:id', (req, res) => {

    Admin.findByIdAndUpdate(req.params.id, req.body)
    .then((admin) => {
        res.json(admin);
    })
    .catch((err) => {
        res.send(err);
    });
});

module.exports = Router;