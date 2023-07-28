const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const user = Schema({
    userName:{
        type:String,
        require:[true, "hereglegchiin ner oruul"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/[^\s@]+@[^\s@]+\.[^\s@]+/gi, "э-мэйл буруу байна"],
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type: String, enum:["admin","ordinary"], default: "ordinary"
    },  
    wishlist:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"product"
    }
});
user.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
user.methods.CheckPassword = function(password){
    const check = bcrypt.compare(password,this.password);
    return check;
};

module.exports = mongoose.model("user",user);