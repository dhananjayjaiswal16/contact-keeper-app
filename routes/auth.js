const express = require('express');
const router = express.Router();

const User = require('../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { check, validationResult } = require('express-validator');
const config = require('config');
const auth = require('../middleware/auth');


//route         GET api/auth
//description   Get logged in user
//access        Pvt
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");//500=server failure
    }
});

//route         POST api/auth
//description   Auth user and get token
//access        Public 
router.post('/',

    [
        check('email', 'Please add a valid email ID').isEmail(),
        check('password', 'Please enter a password').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); //400:bad request
        }
        const { email, password } = req.body;

        try {
            var user = await User.findOne({ email });

            if (!user) {
                return res.json({ msg: "User not found" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.json({ msg: "Invalid email or password" });
            }

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