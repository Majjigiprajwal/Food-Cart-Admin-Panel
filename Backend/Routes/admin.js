const express = require('express');
const router = express.Router()
const adminController = require('../Controller/admin');
const { protectAdmin } = require('../Middleware/auth');
const { uploadSingleImage, uploadMultipleImages } = require('../Middleware/imageUpload')


router.post('/categories',protectAdmin,uploadSingleImage, adminController.createCategory);
router.get('/categories',protectAdmin, adminController.getCategories);
router.put('/categories/:id',protectAdmin,uploadSingleImage, adminController.updateCategory);
router.delete('/categories/:id',protectAdmin, adminController.deleteCategory);

router.post('/recipes',protectAdmin,uploadMultipleImages, adminController.createRecipe);
router.get('/recipes',protectAdmin, adminController.getRecipes);
router.put('/recipes/:id',protectAdmin,uploadMultipleImages, adminController.updateRecipe);
router.delete('/recipes/:id', adminController.deleteRecipe);


router.get('/orders',protectAdmin, adminController.getOrders);
router.put('/orders/:id/status',protectAdmin, adminController.updateOrderStatus);

module.exports = router;