const Router = require("express").Router();
const POS_Order = require("../Models/POS_Order");
const Product = require("../Models/Product");
const Cashier = require("../Models/Cashier");
const ItemModel = require("../Models/Item");
const Category = require("../Models/Category");
const {
  ThermalPrinter,
  PrinterTypes,
  CharacterSet,
  BreakLine,
} = require("node-thermal-printer");

const jwt = require("jsonwebtoken");

const Secret = process.env.SECRET;
require("dotenv").config();
//get all categories
Router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});
//get all orders
Router.get("/orders", async (req, res) => {
  try {
    const orders = await POS_Order.find();
    return res.json(orders);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

//post an order
Router.post("/order", async (req, res) => {
  try {
    const Items = req.body.Items;
    let ItemsArray = Items.map((item) => {
      const newItem = new ItemModel({
        Name: item.Name,
        Price: item.Price,
        quantity: item.quantity,
      });
      return newItem;
    });

    const order = new POS_Order({
      Customer_Name: req.body.Customer_Name,
      Items: ItemsArray,
      Total: req.body.Total,
      GST: req.body.GST,
      Grand_Total: req.body.Grand_Total,
      Status: req.body.Status,
      Date: req.body.Date,
      Payment_Method: req.body.Payment_Method,
      Payment_Done: req.body.Payment_Done,
      Branch_Name: req.body.Branch_Name,
      Discount: req.body.Discount,
    });
    await order.save();
    return res.json({ order, status: 200 });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

//-------------------------------Cashier--------------------------------------------

//add cashier
Router.post("/cashier", async (req, res) => {
  try {
    const cashier = new Cashier({
      Name: req.body.Name,
      Password: req.body.Password,
      Phone: req.body.Phone,
      Status: req.body.Status,
    });

    await cashier.save();
    return res.json({ status: 500, cashier });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ status: 500, error: "Server Error" });
  }
});

//view all cashiers
Router.get("/cashiers", async (req, res) => {
  try {
    const cashiers = await Cashier.find();
    return res.json(cashiers);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

//update product status (invert it from available to unavailable and vice versa)
Router.put("/cashierStatus/:id", async (req, res) => {
  try {
    const cashier = await Cashier.findById(req.params.id);
    if (cashier.Status === "Available") {
      cashier.Status = "Unavailable";
    } else if (cashier.Status === "Unavailable") {
      cashier.Status = "Available";
    }
    const updatedCashier = await cashier.save();
    return res.status(200).json({ status: 200, cashier: updatedCashier });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err });
  }
});

//update cashier
Router.put("/cashier/:id", async (req, res) => {
  try {
    const cashier = await Cashier.findById(req.params.id);
    cashier.Name = req.body.Name;
    cashier.Password = req.body.Password;
    cashier.Phone = req.body.Phone;
    const updatedCashier = await cashier.save();
    return res.status(200).json({ cashier: updatedCashier });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

//login cashier
Router.post("/login", async (req, res) => {
  const { Name, Password } = req.body;

  try {
    const cashier = await Cashier.findOne({ Name });

    if (!cashier) {
      return res.status(400).json({ error: "Cashier not found" });
    }

    if (cashier.Password !== Password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ Name: cashier.Name }, process.env.SECRET);

    res.status(200).json({ status: 200, cashier, token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

//refund a product
Router.put("/refund", async (req, res) => {
  try {
    console.log(req.body);
    let qty = 0;
    const orderId = req.body.Order_id;
    const order = await POS_Order.findById(orderId);
    if (!order) {
      return res.status(500).json({ error: "Order not found" });
    }

    const findItem = order.Items.find(
      (item) => item._id == req.body.Product_ID
    );

    const item = await order.Items.find(
      (item) => item._id == req.body.Product_ID
    );

    if (!item) {
      return res.status(500).json({ error: "Item not found" });
    }
    if (item.quantity == req.body.Quantity) {
      order.Items = order.Items.filter(
        (item) => item._id != req.body.Product_ID
      );
    } else if (item.quantity > req.body.Quantity) {
      qty = item.quantity - req.body.Quantity;
    } else {
      return res.status(400).json({ error: "Invalid quantity" });
    }

    console.log(findItem);
    findItem.quantity = req.body.Quantity;
    order.Refunded_Items.push(findItem);

    //update order Total
    order.Total -= item.Price * req.body.Quantity;

    order.Items.map((item) => {
      if (item._id == req.body.Product_ID) {
        item.quantity = qty;
      }
    });
    //get order item

    console.log(order);
    await order.save();

    return res.json({ order, status: 200 }); //4
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

Router.patch("/order/additem/:id", async (req, res) => {
  try {
    const order = await POS_Order.findById(req.params.id);
    const item = new ItemModel({
      Name: req.body.Name,
      Price: req.body.Price,
      quantity: req.body.quantity,
    });
    order.Items.push(item);
    await order.save();
    return res.json(order);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

Router.patch("/order/:id", async (req, res) => {
  try {
    const order = await POS_Order.findById(req.params.id);
    const Status = req.body.Status;
    order.Status = Status;
    await order.save();
    return res.json(order);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

Router.patch("/orderPrice/:id", async (req, res) => {
  try {
    const order = await POS_Order.findById(req.params.id);
    const Grand_Total = parseInt(req.body.Grand_Total);
    const itemPrice = parseInt(req.body.itemPrice);
    console.log(Grand_Total, itemPrice);
    order.Grand_Total = Grand_Total + itemPrice;
    order.Total = Grand_Total + itemPrice;
    await order.save();
    return res.json(order);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
}
);

Router.get('/orderPrice/:id', async (req, res) => {
  try {
    const order = await POS_Order.findById(req.params.id);
    return res.json(order.Grand_Total);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
}
);
exports = module.exports = Router;
