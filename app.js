const express = require('express');
const assert = require('assert');
const mongoose = require("mongoose");
const UserDetails = require("./userDetails")
const bcrypt = require("bcrypt")
const cors = require("cors")
const app = express();
const port = 5000;

app.use(express.json())
app.use(cors())
app.listen(port, () => console.log('\x1b[37m\x1b[42m%s\x1b[0m', `Server Started ${port}!`))

const mongoURL = "mongodb+srv://test:test@cluster0.tialhlo.mongodb.net/codesense"
mongoose.connect(mongoURL);

mongoose.connection.on('connected', () => console.log('\x1b[37m\x1b[43m%s\x1b[0m', 'Database Connected'));
mongoose.connection.on('open', () => console.log('open'));
mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('reconnected', () => console.log('reconnected'));
mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
mongoose.connection.on('close', () => console.log('close'));

app.post("/register", async(req, res)=>{
    const {fname, lname, email, password} = req.body
    try {
        const user = await UserDetails.findOne({email})
        if(user){
            return res.status(400).send({
                success: false,
                message: "user already exist"
            })
        }
        const encryptedPassword = await bcrypt.hash(password, 10)
        const newUser = new UserDetails({
            fname,
            lname,
            email,
            password: encryptedPassword
        })
        await newUser.save()
        res.status(200).send({
            sucsess: true,
            message: "registration successfull"
        })
    } catch (error) {
        res.status(500).send({
            sucsess: false,
            error: error,
            message: error.message
        })
    }
})

