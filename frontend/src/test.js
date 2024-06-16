import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom'
export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })

    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      //save the auth toke to local storage and redirect
      localStorage.setItem('userEmail', credentials.email)
      localStorage.setItem('token', json.authToken)
      navigate("/");

    }
    else {
      alert("Enter Valid Credentials")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar />
      </div>
      <div className='container'>
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone.</div>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/signup" className="m-3 mx-1 btn btn-danger">New User</Link>
        </form>

      </div>
    </div>
  )
}


// , 'Accept': 'application/json',
//         'Access-Control-Allow-Origin': 'http://localhost:3000/login', 'Access-Control-Allow-Credentials': 'true',
//         "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS'












import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar';
export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
  let [address, setAddress] = useState("");
  let navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault();
    let navLocation = () => {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    }
    let latlong = await navLocation().then(res => {
      let latitude = res.coords.latitude;
      let longitude = res.coords.longitude;
      return [latitude, longitude]
    })
    // console.log(latlong)
    let [lat, long] = latlong
    console.log(lat, long)
    const response = await fetch("http://localhost:5000/api/auth/getlocation", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ latlong: { lat, long } })

    });
    const { location } = await response.json()
    console.log(location);
    setAddress(location);
    setCredentials({ ...credentials, [e.target.name]: location })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })

    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      //save the auth toke to local storage and redirect
      localStorage.setItem('token', json.authToken)
      navigate("/login")

    }
    else {
      alert("Enter Valid Credentials")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
      <div>
      <Navbar />
      </div>

        <div className='container' >
          <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
            <div className="m-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="m-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="m-3">
              <label htmlFor="address" className="form-label">Address</label>
              <fieldset>
                <input type="text" className="form-control" name='address' placeholder='"Click below for fetching address"' value={address} onChange={(e)=>setAddress(e.target.value)} aria-describedby="emailHelp" />
              </fieldset>
            </div>
            <div className="m-3">
              <button type="button" onClick={handleClick} name="geolocation" className=" btn btn-success">Click for current Location </button>
            </div>
            <div className="m-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
            </div>
            <button type="submit" className="m-3 btn btn-success">Submit</button>
            <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
          </form>
        </div>
      </div>
  )
}      






































const express = require('express')
const User = require('../models/User')
const Order = require('../models/Orders')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const axios = require('axios')
const fetch = require('../middleware/fetchdetails');
const jwtSecret = "HaHa"
// var foodItems= require('../index').foodData;
// require("../index")
//Creating a user and storing data to MongoDB Atlas, No Login Requiered
router.post('/createuser', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }
    // console.log(req.body)
    // let user = await User.findOne({email:req.body.email})
    const salt = await bcrypt.genSalt(10)
    let securePass = await bcrypt.hash(req.body.password, salt);
    try {
        await User.create({
            name: req.body.name,
            // password: req.body.password,  first write this and then use bcryptjs
            password: securePass,
            email: req.body.email,
            location: req.body.location
        }).then(user => {
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            success = true
            res.json({ success, authToken })
        })
            .catch(err => {
                console.log(err);
                res.json({ error: "Please enter a unique value." })
            })
    } catch (error) {
        console.error(error.message)
    }
})

// Authentication a User, No login Requiered
router.post('/login', [
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });  //{email:email} === {email}
        if (!user) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }

        const pwdCompare = await bcrypt.compare(password, user.password); // this return true false.
        if (!pwdCompare) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        success = true;
        const authToken = jwt.sign(data, jwtSecret);
        res.json({ success, authToken })


    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
})

// Get logged in User details, Login Required.
router.post('/getuser', fetch, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password") // -password will not pick password from db.
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})
// Get logged in User details, Login Required.
router.post('/getlocation', async (req, res) => {
    try {
        let lat = req.body.latlong.lat
        let long = req.body.latlong.long
        console.log(lat, long)
        let location = await axios
            .get("https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + long + "&key=74c89b3be64946ac96d777d08b878d43")
            .then(async res => {
                // console.log(`statusCode: ${res.status}`)
                console.log(res.data.results)
                // let response = stringify(res)
                // response = await JSON.parse(response)
                let response = res.data.results[0].components;
                console.log(response)
                let { village, county, state_district, state, postcode } = response
                return String(village + "," + county + "," + state_district + "," + state + "\n" + postcode)
            })
            .catch(error => {
                console.error(error)
            })
        res.send({ location })

    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})
router.post('/foodData', async (req, res) => {
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

router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});

module.exports = router











































