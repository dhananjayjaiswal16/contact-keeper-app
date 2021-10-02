const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');
//route         GET api/contact
//description   Get user's contact
//access        Pvt
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1, });
        res.json(contacts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");//500=server failure
    }
});

//route         POST api/contact
//description   Add a contact
//access        Pvt
router.post('/',
    [
        auth,
        [
            check('name', "Name is required").not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); //400:bad request
        }
        const { name, email, phone, type } = req.body;

        try {
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id
            })
            const contact = await newContact.save();

            res.json(contact);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server error");//500=server failure
        }
    });

//route         PUT api/contact/:id
//description   Update contact
//access        Pvt
router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, type } = req.body;

    // Build contact object
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        var contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.json({ msg: "Contact not found" });
        }

        if (contact.user.toString() !== req.user.id) {
            return res.json({ msg: "Not authorised" })
        }
        contact = await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactFields }, { new: true });

        res.json(contact);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");//500=server failure
    }
});


//route         DELETE api/contact/:id
//description   Delete contact
//access        Pvt
router.delete('/:id', auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        // Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.json({ msg: 'Not authorised' });
        }

        await Contact.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Contact removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');//500=server failure
    }
});

module.exports = router;