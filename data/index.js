const mongoose = require('mongoose');

const connetDB = async()=>{
    const connet = await mongoose.connect(process.env.mongodb_uri);
    return connet
}

module.exports = connetDB