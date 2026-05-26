import Product from '../models/Product.js'
import { cacheGet, cacheSet, cacheDelete, CACHE_KEYS, CACHE_TTL } from '../services/cache.service.js'
import { v2 as cloudinary } from 'cloudinary'

export async function getProducts(req, res, next) {
  try {
    const { category, search, page = 1, limit = 12, featured, subCategory, subCategoryLevel2 } = req.query
    const pageNum = Math.max(1, parseInt(page))
    const limitNum = Math.min(50, parseInt(limit))

    const subCatParam = subCategory || req.query['subCategory[]']
    const subCatL2Param = subCategoryLevel2 || req.query['subCategoryLevel2[]']

    const hasFilters = search || category || featured || subCatParam || subCatL2Param

    const cacheKey = CACHE_KEYS.productsList(pageNum)
    const cached = await cacheGet(cacheKey)
    if (cached && !hasFilters) return res.json(cached)

    const query = { isActive: true }
    if (category) query.category = category
    if (featured === 'true') query['ratings.average'] = { $gte: 4 }
    if (search) query.$text = { $search: search }

    if (subCatParam) {
      const subCats = Array.isArray(subCatParam) ? subCatParam : [subCatParam]
      query.subCategory = { $in: subCats.map(s => s.toLowerCase().trim()) }
    }
    if (subCatL2Param) {
      const subCatsL2 = Array.isArray(subCatL2Param) ? subCatL2Param : [subCatL2Param]
      query.subCategoryLevel2 = { $in: subCatsL2.map(s => s.toLowerCase().trim()) }
    }

    const [products, total] = await Promise.all([
      Product.find(query)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .populate('seller', 'fullName'),
      Product.countDocuments(query),
    ])

    const result = { data: products, total, page: pageNum, pages: Math.ceil(total / limitNum) }
    if (!hasFilters) await cacheSet(cacheKey, result, CACHE_TTL.productsList)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

export async function getProductById(req, res, next) {
  try {
    const cached = await cacheGet(CACHE_KEYS.productById(req.params.id))
    if (cached) return res.json({ data: cached })

    const product = await Product.findById(req.params.id).populate('seller', 'fullName email')
    if (!product) return res.status(404).json({ message: 'Product not found' })

    await cacheSet(CACHE_KEYS.productById(product._id), product, CACHE_TTL.productById)
    res.json({ data: product })
  } catch (err) {
    next(err)
  }
}

export async function createProduct(req, res, next) {
  try {
    const product = await Product.create({ ...req.body, seller: req.user._id })
    await cacheDelete('products:*')
    res.status(201).json({ data: product })
  } catch (err) {
    next(err)
  }
}

export async function updateProduct(req, res, next) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!product) return res.status(404).json({ message: 'Product not found' })
    await cacheDelete(`products:*`)
    res.json({ data: product })
  } catch (err) {
    next(err)
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })

    for (const url of product.images) {
      const publicId = url.split('/').pop().split('.')[0]
      await cloudinary.uploader.destroy(`superbe/${publicId}`).catch(() => {})
    }

    await product.deleteOne()
    await cacheDelete('products:*')
    res.json({ message: 'Product deleted' })
  } catch (err) {
    next(err)
  }
}

export async function uploadProductImage(req, res, next) {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' })

    const stream = cloudinary.uploader.upload_stream(
      { folder: 'superbe', resource_type: 'image', quality: 'auto', fetch_format: 'auto' },
      (error, result) => {
        if (error) return next(error)
        res.json({ data: { url: result.secure_url } })
      }
    )
    stream.end(req.file.buffer)
  } catch (err) {
    next(err)
  }
}

export async function deleteProductImage(req, res, next) {
  try {
    const { url } = req.body
    if (!url) return res.status(400).json({ message: 'URL required' })
    const publicId = `superbe/${url.split('/').pop().split('.')[0]}`
    await cloudinary.uploader.destroy(publicId)
    res.json({ message: 'Image deleted' })
  } catch (err) {
    next(err)
  }
}

export async function getCategories(req, res, next) {
  try {
    const cached = await cacheGet(CACHE_KEYS.categories)
    if (cached) return res.json({ data: cached })

    const categories = await Product.distinct('category', { isActive: true })
    await cacheSet(CACHE_KEYS.categories, categories, CACHE_TTL.categories)
    res.json({ data: categories })
  } catch (err) {
    next(err)
  }
}
