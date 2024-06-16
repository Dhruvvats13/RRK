const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/users');
const Order = require('../models/Order');
const cors = require('cors');
const app = express();
const router = express.Router();
const generateAuthToken = require('../jwToken');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51N6EfUSCtNBWgQI1he8keBsR0dxXEJnMDl6TJk8Se8l66VgglVVqCAzsifpu62MkLwJi5l0wm5J9Ii226S4Up2Wl007eKfuvB4');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// JWT secret
const jwtSecret = "HaHa";

// var foodItems= require('../index').foodData;
// require("../index")
//Creating a user and storing data to MongoDB Atlas, No Login Requiered
router.post('/register', async (req, res) => {
    const { fName, lName, email, pass } = req.body;
  
    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send('User is already registered in our database');
    }
  
    // Hash password
    const hashedPass = await bcrypt.hash(pass, 10);
  
    // Save user to database
    const newUser = new User({
      fName,
      lName,
      email,
      pass: hashedPass,
    });
  
    try {
      await newUser.save();
  
      // Generate JWT token
      const data = {
        user: {
          id: newUser._id,
        },
      };
      const authToken = jwt.sign(data, jwtSecret);
  
      res.json({ success: true, authToken });
    } catch (err) {
      console.log(err);
      res.json({ error: 'Please enter a unique value.' });
    }
  });
// Authentication a User, No login Requiered

router.post('/login', async (req, res) => {
  const userInfo=req.body
    console.log(userInfo,"ppp")
    var user
  try {
    // Find user by email
    user = await User.findOne({email:userInfo.email});

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password', success: false });
    }

    // Check password
    const validPass = await bcrypt.compare(userInfo.pass, user.pass);
    if (!validPass) {
      return res.status(401).json({ message: 'Invalid email or password', success: false });
    }

    // Generate JWT token
    const data = {
      user: {
        id: user._id,
      },
    };
    const authToken = jwt.sign(data, jwtSecret);

    res.json({ success: true, authToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.post('/admin', async (req, res) => {
  const userInfo=req.body
    console.log(userInfo,"ppp")
    var user
  try {
    // Find user by email
    user = await User.findOne({email:userInfo.email});

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password', success: false });
    }

    // Check password
    const validPass = await bcrypt.compare(userInfo.pass, user.pass);
    if (!validPass) {
      return res.status(401).json({ message: 'Invalid email or password', success: false });
    }

    // Generate JWT token
    const data = {
      user: {
        id: user._id,
      },
    };
    const authToken = jwt.sign(data, jwtSecret);

    res.json({ success: true, authToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Get logged in User details, Login Required.
router.post('/getuser', generateAuthToken, async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select("-password") // -password will not pick password from db.
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})
// Get logged in User details, Login Required.

  router.post('/foodData', async (req, res) => {
    try {
        // console.log( JSON.stringify(global.foodData))
        // const userId = req.user._id;
        // await database.listCollections({name:"food_items"}).find({});
        res.send([global.foodData, global.foodCategory])
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    console.log("1231242343242354",req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })    
    console.log(eId)
    if (eId===null) {
        try {
            console.log(data)
            console.log("1231242343242354",req.body.email)
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})

router.post('/myOrder', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});
router.post("/payment", (req, res) => {
  console.log(req.body);

  const response = {
    status: "success",
    message: "Payment has been processed.",
  };

  res.send(response);
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    const userNames = users.map((user) => `${user.fName} ${user.lName}`);
    res.json({ userNames });
  } catch (error) {
    console.error('Error retrieving user names:', error);
    res.sendStatus(500);
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    const userNames = users.map((user) => user.name);
    res.json({ userNames });
  } catch (error) {
    console.error('Error retrieving user names:', error);
    res.sendStatus(500);
  }
});

router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    const orderDetails = orders.map((order) => {
      return {
        email: order.email,
        orders: order.order_data.map((item) => ({
          Order_date: item[0].Order_date,
          id: item[1].id,
          name: item[1].name,

        }))
      };
    });
    res.json({ orderDetails });
  } catch (error) {
    console.error('Error retrieving order details:', error);
    res.sendStatus(500);
  }
});
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a password reset token
    const resetToken = generateResetToken();

    // Save the reset token and its expiration in the user document
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send the password reset link to the user's email
    const transporter = nodemailer.createTransport({
      // Configure your email provider here
      // Example for Gmail:
      service: 'Gmail',
      auth: {
        user: 'your_email@gmail.com',
        pass: 'your_password',
      },
    });

    const mailOptions = {
      from: 'your_email@gmail.com',
      to: email,
      subject: 'Reset Your Password',
      text: `Please click the following link to reset your password: http://your_website/reset-password/${resetToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending reset link' });
      } else {
        console.log('Reset link sent: ' + info.response);
        res.status(200).json({ message: 'Reset link sent' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router