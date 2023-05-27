const express = require('express');
const router = express.Router();
const {getContacts, createContacts, getSingleContact, updateContact, deleteContact} = require('../controllers/contactController');

router.get('/', (req, res) => {
    res.status(200).json({message: 'OK'});
});
router.route("/").get(getContacts);

router.route("/").post(createContacts);

router.route("/:id").get(getSingleContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

module.exports = router;