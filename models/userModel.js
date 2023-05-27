const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    userName: {
        type: 'string',
        required: [true, "Please add a username"]
    },
    email: {
        type: 'string',
        required: [true, "Please add an email address"],
        unique: [true, "Email address already in use"]
    },
    password: {
        type: 'string',
        required: [true, "Please add a password"],
    },
},
{
    timeStamp: true,
}
);

module.exports = mongoose.model('user', userSchema);