const Router = require('express').Router();
const jwt = require('jsonwebtoken');

const AdminModel = require('../Models/Administration');
const BranchModel = require('../Models/Branch');
const ProductModel = require('../Models/Product');
const CustomerModel = require('../Models/Customer');

//login admin
Router.post('/login', async (req, res) => {
    try {
        const admin = await AdminModel.findOne({ Email: req.body.Email, Password: req.body.Password });
        if (admin) {
            const token = jwt.sign({ Email: admin.Email }, process.env.SECRET);
            return res.status(200).json({ admin: admin, token: token });
        }
        else {
            return res.status(404).json({ message: 'Wrong Email or Password' });
        }
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

//--------------------Customers--------------------
Router.get('/customer', async (req, res) => {
    try {
        const customers = await CustomerModel.find();
        return res.status(200).json({ customers: customers });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

Router.put('/customer', async (req, res) => {
    try {
        const customer = await CustomerModel.findOne({ Email: req.body.Email });
        customer.Status === 'Active' ? customer.Status = 'Inactive' : customer.Status = 'Active';
        const updatedCustomer = await customer.save();
        return res.status(200).json({ customer: updatedCustomer });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);


//--------------------Admins--------------------
Router.get('/', async (req, res) => {
    try {
        const admins = await AdminModel.find({ Role: 'Admin' });
        return res.status(200).json({ admins: admins });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

Router.post('/', async (req, res) => {
    const admin = new AdminModel({
        Name: req.body.Name,
        Phone: req.body.Phone,
        Email: req.body.Email,
        Password: req.body.Password,
        Role: 'Admin'
    });
    try {
        const savedAdmin = await admin.save();
        return res.status(200).json({ admin: savedAdmin });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

Router.delete('/:id', async (req, res) => {
    try {
        const deletedAdmin = await AdminModel.deleteOne({ _id: req.params.id });
        return res.status(200).json({ admin: deletedAdmin });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

Router.put('/:id', async (req, res) => {
    try {
        const updatedAdmin = await AdminModel.updateOne({ _id: req.params.id }, {
            $set: {
                Name: req.body.Name,
                Phone: req.body.Phone,
                Email: req.body.Email,
                Password: req.body.Password,
                Role: 'Admin'
            }
        });
        return res.status(200).json({ admin: updatedAdmin });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);


//--------------------Branches--------------------
Router.get('/branch', async (req, res) => {
    try {
        const branches = await BranchModel.find();
        return res.status(200).json({ branches: branches });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

Router.post('/branch', async (req, res) => {
    const branch = new BranchModel({
        Name: req.body.Name,
        Email: req.body.Email,
        Address: req.body.Address,
        Phone: req.body.Phone
    });
    try {
        const savedBranch = await branch.save();
        return res.status(200).json({ branch: savedBranch });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
});

Router.delete('/branch/:id', async (req, res) => {
    try {
        const deletedBranch = await BranchModel.deleteOne({ _id: req.params.id });
        return res.status(200).json({ branch: deletedBranch });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

Router.put('/branch/:id', async (req, res) => {
    try {
        const updatedBranch = await BranchModel.updateOne({ _id: req.params.id }, {
            $set: {
                Name: req.body.Name,
                Email: req.body.Email,
                Address: req.body.Address,
                Phone: req.body.Phone
            }
        });
        return res.status(200).json({ branch: updatedBranch });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

//--------------------Managers--------------------
Router.get('/manager', async (req, res) => {
    try {
        const managers = await AdminModel.find({ Role: 'Manager' });
        return res.status(200).json({ managers: managers });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

Router.post('/manager', async (req, res) => {
    const manager = new AdminModel({
        Name: req.body.Name,
        Phone: req.body.Phone,
        Email: req.body.Email,
        Password: req.body.Password,
        Role: 'Manager',
        Branch_Name: req.body.Branch_Name
    });
    try {
        const savedManager = await manager.save();
        return res.status(200).json({ manager: savedManager });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

Router.delete('/manager/:id', async (req, res) => {
    try {
        const deletedManager = await AdminModel.deleteOne({ _id: req.params.id });
        return res.status(200).json({ manager: deletedManager });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

Router.put('/manager/:id', async (req, res) => {
    try {
        const updatedManager = await AdminModel.updateOne({ _id: req.params.id }, {
            $set: {
                Name: req.body.Name,
                Phone: req.body.Phone,
                Email: req.body.Email,
                Password: req.body.Password,
                Role: 'Manager',
                Branch_Name: req.body.Branch_Name
            }
        });
        return res.status(200).json({ manager: updatedManager });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

//--------------------Admins--------------------
Router.get('/admin', async (req, res) => {
    try {
        const admins = await AdminModel.find({ Role: 'Admin' });
        return res.status(200).json({ admins: admins });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

Router.post('/admin', async (req, res) => {
    const admin = new AdminModel({
        Name: req.body.Name,
        Phone: req.body.Phone,
        Email: req.body.Email,
        Password: req.body.Password,
        Role: 'Admin'
    });
    try {
        const savedAdmin = await admin.save();
        return res.status(200).json({ admin: savedAdmin });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

Router.delete('/admin/:id', async (req, res) => {
    try {
        const deletedAdmin = await AdminModel.deleteOne({ _id: req.params.id });
        return res.status(200).json({ admin: deletedAdmin });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

Router.put('/admin/:id', async (req, res) => {
    try {
        const updatedAdmin = await AdminModel.updateOne({ _id: req.params.id }, {
            $set: {
                Name: req.body.Name,
                Phone: req.body.Phone,
                Email: req.body.Email,
                Password: req.body.Password,
                Role: 'Admin'
            }
        });
        return res.status(200).json({ admin: updatedAdmin });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

//--------------------Products--------------------
Router.get('/product', async (req, res) => {
    try {
        const products = await ProductModel.find();
        return res.status(200).json({ products: products });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

Router.post('/product', async (req, res) => {
    console.log('hi this is the product route')
    console.log(req.files, req.body);
    const image = req.files.Image;
    

    const path = image.name;

    await image.mv('./uploads/' + path);



    const product = new ProductModel({
        Name: req.body.Name,
        Description: req.body.Description,
        Price: req.body.Price,
        Category: req.body.Category,
        Variations: req.body.Variations,
        Status: req.body.Status,
        Discount: 0,
        Image: path
    });

    console.log(product);
    try {
        const savedProduct = await product.save();
        return res.status(200).json({ product: savedProduct });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
}

);

//update discount
Router.put('/discount/product/:id', async (req, res) => {
    try {
        console.log(req.body.Discount);
        console.log(req.params.id);
        const id = req.params.id;
        const prod = await ProductModel.findById(id);
        console.log(prod);
        prod.Discount = req.body.Discount;
        const updatedProduct = await prod.save();
        return res.status(200).json({ product: updatedProduct });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

// update product
Router.put('/product/update/:id', async (req, res) => {
    try {
        const prod = await ProductModel.findOne({ _id: req.params.id });
        prod.Name = req.body.Name;
        prod.Description = req.body.Description;
        prod.Price = req.body.Price;
        prod.Category = req.body.Category;
        prod.Image = req.body.Image;
        prod.Variations = req.body.Variations;
        const updatedProduct = await prod.save();
        return res.status(200).json({ product: updatedProduct });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

Router.delete('/product/:id', async (req, res) => {
    try {
        const deletedProduct = await ProductModel.deleteOne({ _id: req.params.id });
        return res.status(200).json({ product: deletedProduct });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

//add variation to product
Router.post('/product/variation/:id', async (req, res) => {
    try {
        const prod = await ProductModel.findOne({ _id: req.params.id });
        prod.Variations.push(req.body.Variation);
        const updatedProduct = await prod.save();
        return res.status(200).json({ product: updatedProduct });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

//delete a specific variation from product
Router.delete('/product/variation/:id', async (req, res) => {
    try {
        const prod = await ProductModel.findOne({ _id: req.params.id });
        prod.Variations.pull(req.body.Variation);
        const updatedProduct = await prod.save();
        return res.status(200).json({ product: updatedProduct });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);

//update a specific variation from product
Router.put('/product/variation/:id', async (req, res) => {
    try {
        const prod = await ProductModel.findOne({ _id: req.params.id });

        // Find the index of the old variation in the Variations array
        const oldVariationIndex = prod.Variations.findIndex(variation => variation.name === req.body.Variation.name);

        if (oldVariationIndex !== -1) {
            // Delete the old variation
            prod.Variations.splice(oldVariationIndex, 1);

            // Add the new variation
            prod.Variations.push(req.body.NewVariation);

            // Save the updated product
            const updatedProduct = await prod.save();

            return res.status(200).json({ product: updatedProduct, message: 'Variation updated' });
        } else {
            return res.status(404).json({ message: 'Old variation not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

//change status of a product
Router.put('/product/status/:id', async (req, res) => {
    try {
        const prod = await ProductModel.findOne({ _id: req.params.id });
        const newStatus = prod.Status === 'Available' ? 'Unavailable' : 'Available';
        prod.Status = newStatus;
        const updatedProduct = await prod.save();
        return res.status(200).json({ product: updatedProduct });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
);


module.exports = Router;