const asyncHandler = require('../middlewares/asyncHandler');
const { Category } = require('../model/category');
const MyError = require('../utis/myError');
const authMiddleware = require('../middlewares/authMiddleware');
const { checkAdminRole } = require('../middlewares/checkAdminRole');

exports.createCategory = asyncHandler(checkAdminRole, authMiddleware, async (req, res) => {
  const name = req.body.category;
  try {
    const newCategory = await Category.create({
      category: name,
    });
    res.status(200).json({
      success: true,
      newCategory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
});



exports.getData = asyncHandler(async (req, res) => {
  try {
    const getAllCategory= await Category.find();
    res.status(200).json({
      success: true,
      getAllCategory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
});

exports.getDataId = asyncHandler(async (req, res) => {
  try {
    const getIdCategory = await Category.findById(req.params.id);
    res.status(200).json({
      success: true,  
      getIdCategory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
});

exports.updateData = asyncHandler(async (req, res) => {
  try {
    const putCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
      success: true,
      putCategory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
});

exports.deleteData = asyncHandler(async (req, res) => {
  try {
    const deleteCategory = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      deleteCategory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
});
