const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');

const User = require('../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//route         POST api/users
//description   Register user
//access        Public
router.post('/',
    [
        check('name', 'Please add your Name').not().isEmpty(),
        check('email', 'Please add a valid email ID').isEmail(),
        check('password', 'Please add your password with 5 or more characters').isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); //400:bad request
        }

        const { name, email, password } = req.body;

        try {
            var user = await User.findOne({ email });

            if (user) {
                return res.json({ msg: "User already exists" });
            }

            user = new User({
                name,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            //JWT
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), {

            }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });


        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server error");//500=server failure            
        }

    });


module.exports = router;