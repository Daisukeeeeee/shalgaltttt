const express = require('express');
const router = express.Router();
const { createCategory, getData, getDataId, updateData, deleteData } = require('../controller/categoryController');

router.route('/')
router.post('/',createCategory).get(getData);

router.route('/:id')
  .get(getDataId)
  .put(updateData)
  .delete(deleteData);

module.exports = router;



// exports.createCategory =  async (req, res, next) => {
//   try {
//     if (!req.user || req.user.role !== "admin") {
//       return res.status(403).json({ error: 'Only admins can create a category' });
//     }
//     const name = req.body.category;
//     const newCategory = await Category.create({ category: name });

//     res.status(200).json({
//       success: true,
//       newCategory: newCategory,
//     });
//   } catch (error) {
//     console.error(error);

//     if (error instanceof MyError) {
//       return res.status(400).json({ success: false, error: error.message });
//     }
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// };
