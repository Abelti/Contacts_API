const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel')


//@desc Get all contacts
//@route GET /api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

//@desc Create new contact
//@route POST /api/contacts
//@access public

const createContacts = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {name, email, phone} = req.body;
    if (!name || !email || !phone) {
        throw new Error ("All fields are required! For unknown values please enter the character n/N");
    }
    const contact = await Contact.create({
        name: name,
        email: email,
        phone: phone
    });
    res.status(201).json(contact);
});

//@desc Get contact
//@route GET /api/contacts/id
//@access public

const getSingleContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error ("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc Update contact
//@route PUT /api/contacts/id
//@access public

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error ("Contact not found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );
    res.status(200).json(updatedContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/id
//@access public

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error ("Contact not found");
    }
    await Contact.remove();
    res.status(200).json({message: `Delete contact for ${req.params.id}`});
});

module.exports = {getContacts, createContacts, getSingleContact, updateContact, deleteContact};