const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const db = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('DB Connected!', db.connection.host, db.connection.name);  
    }
        catch (err) {
            console.log(err);
            process.exit(1);
        }
    };

    module.exports = connectDb;