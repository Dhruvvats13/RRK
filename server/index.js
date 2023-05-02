
const { foodData, categoryData } = require('./db');

// Store the data globally
global.foodData = foodData;
global.foodCategory = categoryData;

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('./models/users');
const Order = require('./models/Order');
const cors = require('cors');
const app = express();
const generateAuthToken = require('./jwToken');
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// JWT secret
const jwtSecret = "HaHa";

// Root route
app.get('/', (req, res) => {
  res.send('Hello from server');
});

// User registration API
app.post('/register', async (req, res) => {
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
        id: newUser.id,
      },
    };
    const authToken = jwt.sign(data, jwtSecret);

    res.json({ success: true, authToken });
  } catch (err) {
    console.log(err);
    res.json({ error: 'Please enter a unique value.' });
  }
});

// User login API
app.post('/login', async (req, res) => {
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
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, jwtSecret);

    res.json({ success: true, authToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/getuser', generateAuthToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-pass") // -password will not pick password from db.
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})
app.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
  
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.example.com",
        port: 587,
        secure: false,
        auth: {
          email: "your_email",
          pass: "your_password",
        },
      });
  
      const mailOptions = {
        from: "noreply@example.com",
        to: email,
        subject: "Reset Your Password",
        html: `
          <p>Hi there,</p>
          <p>Please click the following link to reset your password:</p>
          <p><a href="https://yourwebsite.com/reset-password?token=${resetToken}">Reset Password</a></p>
          <p>If you didn't request a password reset, please ignore this email.</p>
        `,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({
        message: `An email with instructions to reset your password has been sent to ${email}.`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred. Please try again later." });
    }
  });
  // app.post('/payment', async (req, res) => {
  //   try {
  //     const { amount, token } = req.body;
  //     const charge = await stripe.charges.create({
  //       amount: amount,
  //       currency: 'USD',
  //       description: 'Payment for Product',
  //       source: token.id,
  //     });
  //     res.status(200).json({ success: true, charge });
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ success: false, error: err });
  //   }
  // });

 

 app.post('/foodData', async (req, res) => {
    try {
        // console.log( JSON.stringify(global.foodData))
        // const userId = req.user.id;
        // await database.listCollections({name:"food_items"}).find({});
        res.send([global.foodData, global.foodCategory])
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})
  
  
  
app.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    console.log("1231242343242354",req.body.email)
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
            res.status(statusCode).send(message)

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

app.post('/myOrder', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});

app.listen(3001,()=>{
    console.log('server running on port no 3001')

})
