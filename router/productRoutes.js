const express = require('express');
const router = express.Router();
const {PostData, getData, getDataId, UpdateData, deleteData,} = require("../controller/productController")
const { Upload } = require('../middlewares/upload')

router.route('/').post(Upload.single('image'), PostData).get(getData);
router.route('/:id').get(getDataId).put(UpdateData).delete(deleteData)

module.exports = router;