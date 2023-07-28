const Product = require('../model/product');
const asyncHandler = require('../middlewares/asyncHandler')


exports.PostData = async (req, res, next) => {
  console.log(req.body)
  try {
    const newProduct = await Product.create(req.body);
    const filename = req.file.filename;
    res.status(200).json({
      success: true,
      newProduct,
      image: filename,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

exports.getData = asyncHandler(async (req, res) => {
  try {
    const getAllProduct = await Product.find();
    res.status(200).json({
      success: true,
      getAllProduct
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error
    });
  }
});

exports.getDataId = asyncHandler(async (req, res) => {
  try {
    const getIdProduct = await Product.findById(req.params.id);
    res.status(200).json({
      success: true,
      getIdProduct
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error
    });
  }
});

exports.UpdateData = asyncHandler(async (req, res) => {
  try {
    const putProduct = await Product.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      success: true,
      putProduct
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error
    });
  }
});

exports.deleteData = asyncHandler(async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      deleteProduct
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error
    });
  }
});
