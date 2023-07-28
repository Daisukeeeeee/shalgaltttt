const userModel = require("../model/user");
const UserSchema = require("../model/user");
const jwt = require("jsonwebtoken");


exports.register = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (role && role !== "admin" && role !== "ordinary") {
      return res.status(400).json({ success: false, error: "Invalid role" });
    }

    const newUser = await UserSchema.create({
      email,
      password,
      role: role || "ordinary",
    });

    res.status(200).json({
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};


exports.Login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserSchema.findOne({ email: email });
  try {
    if (!user) {
      return res.status(404).json({
        success: false,
        error: `нууц үг болон э-мэйлээ шалгана уу `,
      });
    }
    const check = await user.CheckPassword(password);
    if (!check) {
      return res.status(404).json({
        success: false,
        error: `нууц үг болон э-мэйлээ шалгана уу `,
      });
    }
    
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    
    let isAdmin = user.role === "admin";
    res.status(200).json({
      success: true,
      user,
      isAdmin,
      token,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;
  const email = req.userEmail;
  try {
    const addList = await userModel.findOneAndUpdate(
      { email: email },
      { $addToSet: { wishlist: productId } }
    );

    res.status(200).json({
      success: true,
      addList,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};
exports.getWishList = async (req, res) => {
  try {
    console.log(req.userEmail);
    const List = await userModel
      .findById(req.userId)
      .select("wishlist")
      .populate("wishlist")
      .exec();
    res.status(200).json({
      success: true,
      List,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

exports.deleteWishList = async (req, res) => {
  try {
    console.log(req.userEmail);

    const user = await userModel.findByIdAndUpdate(
      req.userId,
      { wishlist: [] },
      { new: true }
    )
      .select("wishlist")
      .populate("wishlist")
      .exec();

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Cannot find the user',
      });
    }

    if (!user.wishlist || user.wishlist.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'Wishlist is empty',
        List: [],
      });
    }

    res.status(200).json({
      success: true,
      List: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};
