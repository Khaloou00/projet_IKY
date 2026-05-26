import { Router } from 'express'
import {
  getProducts, getProductById, createProduct, updateProduct,
  deleteProduct, uploadProductImage, deleteProductImage, getCategories,
} from '../../controllers/product.controller.js'
import { protect, sellerOrAdmin } from '../../middlewares/auth.middleware.js'
import { cacheMiddleware } from '../../middlewares/cache.middleware.js'
import multer from 'multer'

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } })
const router = Router()

router.get('/', cacheMiddleware(300), getProducts)
router.get('/categories', cacheMiddleware(1800), getCategories)
router.get('/:id', cacheMiddleware(600), getProductById)

router.use(protect, sellerOrAdmin)
router.post('/', createProduct)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProduct)
router.post('/upload-image', upload.single('image'), uploadProductImage)
router.delete('/delete-image', deleteProductImage)

export default router
