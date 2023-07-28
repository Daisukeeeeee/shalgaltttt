const jwt = require('jsonwebtoken');
const User = require('../model/user');

exports.protect = async (req, res,next)=>{
    const testToken = req.headers.authorization;
    let token;
    if(!testToken){
        res.status(400).json({
            success:false,
        });
    }
    token = testToken.split("")[1];
    const verifeToken = jwt.verify(token,process.env.JWT_SECRET);
    console.log(verifeToken)
    const user = await User.findByPk(verifeToken.id)
    req.user = user
    next();
};