// const User = require('../model/user');

// const checkAdmin = async (req, res, next) => {
//   if (req.user.role === "admin") {
//     next();
//   } else {
//     res.status(403).json({
//       success: false,
//       error: "Access denied. Only admin users can create a category.",
//     });
//   }
// };

// module.exports = checkAdmin;


const checkAdminRole = (req,res,next) =>{
  if(req.user.role === "admin"){
  }else{
    res.status(404).json({
      success: false,
      error:"only admins can create category"
    })
  }
}