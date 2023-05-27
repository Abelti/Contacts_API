const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: {
        type: 'string',
        required: [true, "Please add the contact name"],
    },
    email: {
        type: 'string',
        required: [true, "Please add the contact email"],
    },
    phone: {
        type: 'string',
        required: [true, "Please add the contact phone number"],
    },
    
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("conacts", contactSchema);