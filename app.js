const express = require('express');
const mongoose = require("mongoose");
const UserDetails = require("./userDetails")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const app = express();
const port = 5000;
const JWT_SECRECT = "ewf98we789ew7v897vdcsc()EF*E(^FE"

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

app.post("/login", async(req, res)=>{
    const {email, password} = req.body
    
    try {
        const user = await UserDetails.findOne({email})
        if(!user){
            return res.status(400).send({
                success: false,
                message: 'user not found'
            })
        }
        if(await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({email: user.email}, JWT_SECRECT)
            return res.status(200).send({
                success:true,
                message: "login successfull",
                token,
                user
            })
        } else {
            return res.status(400).send({
                success: false,
                message: "incorrect password"
            })
        }

    } catch (error) {
        return res.status(500).send(error)
    }
})

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

app.post("/get-user", (req, res)=>{
    const {token} = req.body
    try {
        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'JWT token is not provided',
            });
        }
        const user = jwt.verify(token, JWT_SECRECT);
        console.log(user)
        const useremail = user.email;

        UserDetails.findOne({ email: useremail })
            .then((data) => {
                if (!data) {
                    return res.status(404).send({
                        success: false,
                        message: 'User not found',
                    });
                }

                res.send({ success: true, user: data });
            })
            .catch((error) => {
                console.error(error);
                res.status(400).send({
                    success: false,
                    error: error.message,
                });
            });
    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: 'Invalid JWT token',
        });
    }
})

