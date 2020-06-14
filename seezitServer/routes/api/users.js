var express = require('express')
var router = express.Router();
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken')
var bcrpyt = require('bcryptjs');
const keys = require('../../config/keys')
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");
const User = require('../../models/users');
const { countDocuments } = require('../../models/users');



router.post('/register', (req, res, next) =>{

    //Form Validation

    const {errors, isValid} = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    
    //see if user already exists 

    User.findOne({email: req.body.email} )
    .then((user) => {
        if(user) {
            return res.status(400).res.json('User already exists');
        }
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });


        //encrpyt the password

        bcrpyt.genSalt(10, (err, salt) => {
            bcrpyt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                .then((user) => {
                    res.json(user)
                })
                .catch((err) => console.log(err));
            }); 
        });
    });
});


router.post('/login', (req, res, next) => {

    const { errors, isValid} = validateLoginInput(req.body);

    if(!isValid){
        res.statusCode = 400;
        res.json(errors);
        return ;
    }
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
    .then((user) => {
        if(!user) { 
        return res.status(404).json({ emailnotfound: "Email not found"})
        }
        bcrpyt.compare(password, user.password)
        .then((isMatch) => {
            if(isMatch) {
                const payload = {
                    id: user.id,
                    email: user.email,
                    name: user.name
                };

                jwt.sign(
                    payload,
                    keys.secretOrKey, 
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer" + token
                        });
                    }
                );
            }
            else {
                return res.status(400).json({passwordincorrect: "Password incorrect"});
            }
        })
    })
})

router.post('/address', (req, res, next) => {
    User.findOne({email: req.body.email})
    .then((user) => {
        if(!user) {
            return res.status(400).json('User doesnot exists');
        }
        console.log(req.body);
        console.log(user.address);
        user.address.push(req.body);
        user.save()
        .then((user) =>{
            res.statusCode = 200;
            // res.setHeader('Content-Type' , 'application/json')
            res.json(user)
        }, err => next(err));
    })
    .catch((err) => console.log(err))
})

router.get('/getaddress', (req, res, next) => {
    console.log(req)
    User.findOne({email: req.query.email})
    .then((user) => {
        if(!user){
            return res.status(400).json({err: "user dosemnt exixts"})
        }
        res.statusCode = 200;
        res.setHeader('Content-type','application/json')
        res.json(user.address);       
    })
    .catch((err) => console.log(err));
})

module.exports = router;