// import express module
const express = require('express');

// importing path module
const path = require('path');

// importing mongodb module with mongo client
const dbclient = require('mongodb').MongoClient;

// configure dotenv file
require('dotenv').config();

//importing jsonwebtoken module
const jwt = require('jsonwebtoken');

// importing bcrypt module
const bcrypt = require('bcrypt');

const atob = require('atob');

// importing momentjs module
const moment = require('moment');

//nodemailer
const nodemailer = require('nodemailer');

// mail-gun
// const mailgun = require("mailgun-js");
// const DOMAIN = 'sandboxf87d1d546ea14651886a9462b87ffcf8.mailgun.org';
// const mg = mailgun({ apiKey: process.env.API_KEY, domain: DOMAIN });

// import shortid
const shortid = require('shortid');


// creating express app
const app = express();

//body parser
app.use(express.json());

app.use(express.static(path.join(__dirname, './dist/shortlinks')));

// assigning port
app.listen(process.env.PORT, () => {
    console.log('server started...');
})


//==== database connection ====//

var dbo;
dbclient.connect(process.env.MONGO_URL, { useUnifiedTopology: true }, (err, ClientObj) => {
    if (err) {
        return console.log('error in connect', err)
    }
    else {
        dbo = ClientObj.db('user-db');
        console.log('connected to db...');
    }
})


// ================ request Handlers ===================//

// ==== default handler ==== //
app.get('/', (req, res) => {
    res.render('index.html')
})

// ===== get all users req handler ===== //

app.get('/getusers', (req, res) => {
    dbo.collection('users').find().toArray((err, resp) => {
        res.status(200).send({ message: resp });
    })
})

// ======= user register handler ======= //

app.post('/register-user', (req, res) => {
    dbo.collection('users').findOne({ userEmail: req.body.userEmail }, (err, userMatched) => {
        if (!userMatched) {
            bcrypt.hash(req.body.userPwd, 8, (err, hashedPass) => {
                if (hashedPass) {
                    req.body.userPwd = hashedPass
                    //generating token
                    jwt.sign({
                        userName: req.body.userName,
                        userEmail: req.body.userEmail,
                        userPwd: req.body.userPwd
                    }, process.env.TOKEN_KEY, { expiresIn: 600000 }, (err, signedToken) => {
                        console.log(signedToken);
                        if (signedToken) {
                            // send activation link to user
                            // step 1
                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: process.env.EMAIL_ACC,
                                    pass: process.env.EMAIL_PASS
                                }
                            });
                            // Step 2
                            let mailOptions = {
                                from: 'donotreply@sample.com',
                                to: req.body.userEmail,
                                subject: 'Account Activation Request',
                                html: `<h2>Hi ${req.body.userName},</h2> <br> 
                                        <p>Click on the Activation link to acivate your account</p> <br>
                                        <a href="http://localhost:1001/#/authenticate/${signedToken}">http://localhost:1001/#/authenticate/${signedToken}</a> `
                            };
                            // Step 3
                            transporter.sendMail(mailOptions, (err, data) => {
                                if (err) {
                                    return console.log('Error occurs', err);
                                }
                                else {
                                    console.log('Email sent!!!');
                                    return res.status(200).send({ message: 'success' })
                                }
                            });
                        }
                        else {
                            console.log('err in token generation', err)
                            return res.status(400).send({ message: 'err in token generation', err })
                        }
                    })
                }
                else {
                    res.status(400).send({ message: 'something went wrong', error: err });
                }
            })
        }
        else if (userMatched) {
            return res.send({ message: 'Email already in use' })
        }
        else {
            console.log("error in find", err);
            return res.status(400).send({ message: 'something went worng', err })
        }
    })
})


// ===== account activation req handler =====//

app.post('/activate/:tkn', (req, res) => {
    const tokenUsr = req.params.tkn
    const today = moment().format('lll');
    const userData = { userName: '', userEmail: '', userPwd: '', createdOn: '' };
    jwt.verify(tokenUsr, process.env.TOKEN_KEY, (err, result) => {
        console.log(result);
        if (result) {
            userData.userName = result.userName;
            userData.userEmail = result.userEmail;
            userData.userPwd = result.userPwd;
            userData.createdOn = today;
            dbo.collection('users').insertOne(userData, (err, response) => {
                if (response) {
                    return res.status(200).send({ message: 'verified and signup success' })
                }
                else {
                    console.log('err in insert', err);
                    return res.status(422).send({ message: 'something went wrong', err })
                }
            })
        }
        else {
            console.log('err in insert', err);
            res.status(401).send({ message: 'error in verifying', error: err })
        }
    })

})


// ========= signin handler ============//

app.post('/signin-user', (req, res) => {
    const decrypt = atob(req.body.userPwd);
    req.body.userPwd = decrypt
    dbo.collection('users').findOne({ userEmail: req.body.userEmail }, (err, resp1) => {
        if (err) {
            return console.log('err in find', err);
        }
        else if (resp1 == null) {
            return res.status(400).send({ message: 'invalid emailId' })
        }
        else {
            dbo.collection('users').findOne({ userEmail: req.body.userEmail }, (err, userObj) => {
                //hasing passowrd
                bcrypt.compare(req.body.userPwd, resp1.userPwd, (err, isMatched) => {
                    if (err) {
                        return console.log('err in compare', err);
                    }
                    else if (isMatched == false) {
                        return res.status(400).send({ message: 'invalid password' })
                    }
                    else {
                        // generating token
                        jwt.sign({ userName: resp1.userName }, process.env.TOKEN_SIGNIN, { expiresIn: 120000 }, (err, signedToken) => {
                            if (err) {
                                console.log('err in token generation', err);
                            }
                            else {
                                // delete resp1.userPwd;
                                res.status(200).send({ message: 'signin success', userToken: signedToken, userName: userObj.userName })
                            }
                        })
                    }
                })
            })
        }
    })
})


//==== url shortener handler ====//

app.post('/shortener', (req, res) => {
    const today = moment().format('lll');
    req.body.createdOn = today
    if (req.body.userName == null || !req.body.userName) {
        var name = "RandomUser"
        req.body.userName = name;
    }
    dbo.collection('urlcollection').findOne({ fullUrl: req.body.fullUrl }, (err, obj1) => {
        if (err) {
            console.log('err in find', err);
            return res.status(400).send('error in insert', err);
        }
        else if (!obj1) {
            var defaultnumber = 0;
            const newId = shortid.generate();
            const shortUrl = process.env.BASE_URL + '/' + newId;
            req.body.shortUrl = shortUrl;
            req.body.shortcode = newId;
            req.body.clicks = defaultnumber;
            dbo.collection('urlcollection').insertOne(req.body, (err, result) => {
                if (err) {
                    console.log('error in insert', err);
                    return res.status(400).send('error in insert', err);
                }
                else {
                    return res.status(200).send({ message: 'link shortened', shortenedUrl: result.ops[0].shortUrl })
                }
            })
        }
        else {
            return res.status(200).send({ shortenedUrl: obj1.shortUrl })
        }
    })
})


//==== redirecting route ====//

app.get('/:code', (req, res) => {
    dbo.collection('urlcollection').findOne({ shortcode: req.params.code }, (err, urlObj) => {
        if (err) {
            return console.log('err in find', err);
        }
        else if (urlObj) {
            dbo.collection('urlcollection').updateOne({ shortcode: req.params.code }, { $inc: { clicks: 1 } }, (err, resp2) => {
                if (err) {
                    return console.log('err in update', err);
                }
            })
            return res.redirect(urlObj.fullUrl);
        }
    })
})


app.get('/getUrlsById/:id', (req, res) => {
    dbo.collection('urlcollection').find({ userName: req.params.id }).toArray((err, userObj1) => {
        if (err) {
            return console.log('err in find', err);
        }
        else {
            return res.status(200).send({ data: userObj1 });
        }
    })
})

app.get('/getUser/:id', (req, res) => {
    dbo.collection('users').findOne({ userName: req.params.id }, (err, user) => {
        if (err) {
            return console.log('err in find', err);
        }
        else {
            delete user.userPwd;
            return res.status(200).send({ data: user });
        }
    })
})


// send reset link
app.post('/resetlink/:email', (req, res) => {
    // console.log(req.params.email);
    dbo.collection('users').findOne({ userEmail: req.params.email }, (err, result) => {
        if (result) {
            //generating token
            jwt.sign({ userName: result.userName }, process.env.PWD_TOKEN_KEY, { expiresIn: 600000 }, (err, signedToken1) => {
                // console.log(signedToken1);
                if (signedToken1) {
                    // send activation link to user
                    // step 1
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: process.env.EMAIL_ACC,
                            pass: process.env.EMAIL_PASS
                        }
                    });
                    // Step 2
                    let mailOptions = {
                        from: 'donotreply@sample.com',
                        to: req.params.email,
                        subject: 'Password Reset Request',
                        html: `<h2>Hi ${result.userName},</h2> <br> 
                                <p>Click on the Activation link to Reset your account password</p> <br>
                                <a href="http://localhost:1001/#/resetpassword/${signedToken1}">http://localhost:1001/#/resetpassword/${signedToken1}</a> <br>
                                <p> this link will be valid for 5 minutes</p>
                                <P>- team shortlinks</P>`
                    };
                    // Step 3
                    transporter.sendMail(mailOptions, (err, data) => {
                        if (err) {
                            return console.log('Error occurs', err);
                        }
                        else {
                            console.log('Email sent!!!');
                            return res.status(200).send({ message: 'success' })
                        }
                    });
                }
                else {
                    console.log('err in token generation', err)
                    return res.status(400).send({ message: 'err in token generation', err })
                }
            })
        }
        else if (err) {
            return console.log('err in find', err);
        }
        else {
            res.status(404).send({ message: 'invalid email address' })
        }
    })
})


app.post('/forgotpwd/:token', (req, res) => {
    const pwdtoken = req.params.token;
    jwt.verify(pwdtoken, process.env.PWD_TOKEN_KEY, (err, verified) => {
        if (verified) {
            bcrypt.hash(req.body.userPwd, 8, (err, hashedPass1) => {
                if (hashedPass1) {
                    req.body.userPwd = hashedPass1;
                    dbo.collection('users').updateOne({ userName: req.body.userName }, { $set: { userPwd: req.body.userPwd } }, (err, updated) => {
                        if (updated) {
                            return res.send({ message: 'success' })
                        }
                        else {
                            return console.log('err in update', err);
                        }
                    })
                }
                else{
                    return console.log('err in hash',err);
                }
            })
        }
        else if (!verified) {
            return res.send({ message: 'link expired' })
        }
        else {
            return console.log('err in verifing', err);
        }
    })

})