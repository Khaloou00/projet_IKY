import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import Product from '../models/Product.js'
import Order from '../models/Order.js'
import Notification from '../models/Notification.js'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/superbe'

// ─── Users ────────────────────────────────────────────────────────────────────
const rawUsers = [
  {
    fullName: 'Admin SuperBe',
    email: 'admin@superbe.store',
    password: 'Admin@1234',
    phone: '+242 06 000 0001',
    role: 'admin',
    isEmailVerified: true,
  },
  {
    fullName: 'Amina Kouyaté',
    email: 'amina@superbe.store',
    password: 'Seller@1234',
    phone: '+242 06 000 0002',
    role: 'seller',
    isEmailVerified: true,
  },
  {
    fullName: 'Jean-Baptiste Mwamba',
    email: 'delivery@superbe.store',
    password: 'Delivery@1234',
    phone: '+242 06 000 0003',
    role: 'delivery',
    isEmailVerified: true,
  },
  {
    fullName: 'Sophie Loemba',
    email: 'sophie@superbe.store',
    password: 'User@1234',
    phone: '+242 06 000 0004',
    address: 'Bacongo, Brazzaville',
    role: 'user',
    isEmailVerified: true,
  },
  {
    fullName: 'Patrick Nzinga',
    email: 'patrick@superbe.store',
    password: 'User@1234',
    phone: '+242 06 000 0005',
    address: 'Poto-Poto, Brazzaville',
    role: 'user',
    isEmailVerified: true,
  },
]

// ─── Products ─────────────────────────────────────────────────────────────────
const rawProducts = [
  // ── Bijoux ──
  {
    name: 'collier perles dorées',
    shortDescription: 'Collier élégant en perles dorées fait main',
    longDescription:
      'Ce magnifique collier en perles dorées est confectionné à la main par des artisanes locales. Parfait pour les tenues de soirée ou les mariages traditionnels. Longueur ajustable de 40 à 50 cm.',
    price: 8500,
    category: 'bijoux',
    subCategory: 'colliers',
    subCategoryLevel2: 'perles',
    stock: 25,
    images: ['https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600'],
    ratings: { average: 4.7, count: 34 },
  },
  {
    name: 'bracelet cuivre africain',
    shortDescription: 'Bracelet traditionnel en cuivre gravé à la main',
    longDescription:
      'Bracelet en cuivre massif avec motifs géométriques africains gravés à la main. Chaque pièce est unique. Taille universelle avec ouverture réglable.',
    price: 5500,
    category: 'bijoux',
    subCategory: 'bracelets',
    subCategoryLevel2: 'cuivre',
    stock: 40,
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600'],
    ratings: { average: 4.5, count: 21 },
  },
  {
    name: 'boucles oreilles cowries',
    shortDescription: 'Boucles d\'oreilles en coquillages cowrie et fil doré',
    longDescription:
      'Boucles d\'oreilles légères et élégantes combinant des coquillages cowrie naturels avec du fil de laiton doré. Fermoir en acier inoxydable. Longueur : 6 cm.',
    price: 3500,
    category: 'bijoux',
    subCategory: 'boucles oreilles',
    subCategoryLevel2: 'coquillages',
    stock: 60,
    images: ['https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600'],
    ratings: { average: 4.8, count: 56 },
  },
  {
    name: 'bague argent ciselée',
    shortDescription: 'Bague en argent 925 avec ciselage traditionnel',
    longDescription:
      'Bague en argent sterling 925 ciselée à la main avec des motifs floraux inspirés de l\'art africain. Disponible en différentes tailles (indiquez la vôtre dans les notes de commande).',
    price: 12000,
    category: 'bijoux',
    subCategory: 'bagues',
    subCategoryLevel2: 'argent',
    stock: 15,
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600'],
    ratings: { average: 4.6, count: 18 },
  },
  {
    name: 'parure complète wax doré',
    shortDescription: 'Collier + bracelet + boucles en perles wax',
    longDescription:
      'Magnifique parure 3 pièces composée d\'un collier, deux bracelets et des boucles d\'oreilles en perles de verre colorées inspirées du tissu wax africain. Coffret cadeau inclus.',
    price: 18500,
    category: 'bijoux',
    subCategory: 'parures',
    subCategoryLevel2: 'sets complets',
    stock: 10,
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600'],
    ratings: { average: 4.9, count: 12 },
  },

  // ── Soin & Santé ──
  {
    name: 'huile de karité pure 500ml',
    shortDescription: 'Beurre de karité pur non raffiné 100% naturel',
    longDescription:
      'Beurre de karité brut extrait à froid, sans aucun additif chimique. Hydrate intensément la peau et les cheveux. Idéal pour les peaux sèches, les vergetures et les cheveux crépus. Conditionné en pot de verre réutilisable.',
    price: 4500,
    category: 'soin & sante',
    subCategory: 'soins corps',
    subCategoryLevel2: 'huiles naturelles',
    stock: 80,
    images: ['https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600'],
    ratings: { average: 4.9, count: 103 },
  },
  {
    name: 'savon noir africain 250g',
    shortDescription: 'Savon noir authentique à l\'huile de palme et cendres',
    longDescription:
      'Savon noir traditionnel africain fabriqué à partir d\'huile de palme, de beurre de cacao et de cendres végétales. Purifie et exfolie en douceur. Convient à tous les types de peau. Sans conservateurs.',
    price: 2500,
    category: 'soin & sante',
    subCategory: 'soins visage',
    subCategoryLevel2: 'savons naturels',
    stock: 120,
    images: ['https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=600'],
    ratings: { average: 4.7, count: 87 },
  },
  {
    name: 'huile essentielle ylang ylang 30ml',
    shortDescription: 'Huile essentielle pure d\'ylang ylang de Madagascar',
    longDescription:
      'Huile essentielle 100% pure et naturelle d\'ylang ylang distillée à la vapeur. Propriétés apaisantes et aphrodisiaques. Utilisable en diffusion, massage (diluée) ou bain. Flacon en verre ambré avec compte-gouttes.',
    price: 6500,
    category: 'soin & sante',
    subCategory: 'aromathérapie',
    subCategoryLevel2: 'huiles essentielles',
    stock: 45,
    images: ['https://images.unsplash.com/photo-1617696618632-5a5a1b03ff52?w=600'],
    ratings: { average: 4.6, count: 29 },
  },
  {
    name: 'tisane moringa bio 100g',
    shortDescription: 'Feuilles de moringa séchées biologiques en vrac',
    longDescription:
      'Feuilles de moringa oleifera biologiques séchées à l\'air. Riches en vitamines A, C, K et en minéraux. À infuser 5 minutes dans l\'eau chaude. Goût légèrement herbacé. Certification bio disponible sur demande.',
    price: 3000,
    category: 'soin & sante',
    subCategory: 'bien-être',
    subCategoryLevel2: 'plantes médicinales',
    stock: 65,
    images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600'],
    ratings: { average: 4.8, count: 44 },
  },
  {
    name: 'gel aloe vera pur 200ml',
    shortDescription: 'Gel d\'aloé vera frais sans additifs',
    longDescription:
      'Gel d\'aloe vera extrait de feuilles fraîches cultivées sans pesticides. Sans alcool, sans colorants. Apaise les coups de soleil, hydrate et régénère la peau. Conservez au réfrigérateur après ouverture.',
    price: 3500,
    category: 'soin & sante',
    subCategory: 'soins corps',
    subCategoryLevel2: 'gels naturels',
    stock: 55,
    images: ['https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600'],
    ratings: { average: 4.5, count: 38 },
  },

  // ── Outils informatiques ──
  {
    name: 'clé usb 64go ultra speed',
    shortDescription: 'Clé USB 3.1 64Go avec vitesse de lecture 150 Mo/s',
    longDescription:
      'Clé USB 3.1 Gen 1 d\'une capacité de 64 Go. Vitesse de lecture jusqu\'à 150 Mo/s, écriture jusqu\'à 60 Mo/s. Compatible Windows, macOS et Linux. Corps en métal renforcé avec capuchon de protection.',
    price: 9500,
    category: 'outils informatiques',
    subCategory: 'stockage',
    subCategoryLevel2: 'clés usb',
    stock: 35,
    images: ['https://images.unsplash.com/photo-1625948515291-869b850eb56f?w=600'],
    ratings: { average: 4.4, count: 22 },
  },
  {
    name: 'souris sans fil ergonomique',
    shortDescription: 'Souris optique sans fil 2.4GHz 1600 DPI',
    longDescription:
      'Souris sans fil avec récepteur USB nano. Résolution 1600 DPI ajustable. Autonomie jusqu\'à 18 mois avec 1 pile AA. Conception ergonomique adaptée aux droitiers. Compatible avec la plupart des OS.',
    price: 14500,
    category: 'outils informatiques',
    subCategory: 'périphériques',
    subCategoryLevel2: 'souris',
    stock: 28,
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600'],
    ratings: { average: 4.3, count: 17 },
  },
  {
    name: 'câble hdmi 2m 4k',
    shortDescription: 'Câble HDMI 2.0 haute vitesse 4K 60Hz 2 mètres',
    longDescription:
      'Câble HDMI 2.0 prenant en charge la résolution 4K à 60Hz, le HDR et l\'audio Dolby Atmos. Tressage nylon renforcé, connecteurs plaqués or. Compatible TV, moniteur, projecteur, PS5, Xbox.',
    price: 5500,
    category: 'outils informatiques',
    subCategory: 'câbles',
    subCategoryLevel2: 'hdmi',
    stock: 70,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'],
    ratings: { average: 4.6, count: 41 },
  },
  {
    name: 'hub usb-c 7 en 1',
    shortDescription: 'Adaptateur multiport USB-C avec HDMI, USB 3.0, SD',
    longDescription:
      'Hub USB-C 7 ports : 1x HDMI 4K, 3x USB 3.0, 1x USB-C PD 100W, 1x lecteur SD, 1x lecteur MicroSD. Compatible MacBook, iPad Pro et tous PC avec port USB-C. Plug & Play sans installation.',
    price: 22500,
    category: 'outils informatiques',
    subCategory: 'adaptateurs',
    subCategoryLevel2: 'hubs usb-c',
    stock: 18,
    images: ['https://images.unsplash.com/photo-1625948515291-869b850eb56f?w=600'],
    ratings: { average: 4.7, count: 31 },
  },
  {
    name: 'tapis de souris xxl gaming',
    shortDescription: 'Grand tapis de souris 90x40cm surface lisse',
    longDescription:
      'Tapis de souris extra-large 90x40cm recouvrant tout le bureau. Surface en tissu micro-texture pour une précision optimale. Base antidérapante en caoutchouc. Bords cousus pour éviter l\'effilochage. Lavable à la main.',
    price: 8000,
    category: 'outils informatiques',
    subCategory: 'accessoires bureau',
    subCategoryLevel2: 'tapis de souris',
    stock: 42,
    images: ['https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600'],
    ratings: { average: 4.5, count: 26 },
  },
]

// ─── Seed ─────────────────────────────────────────────────────────────────────
async function seed() {
  await mongoose.connect(MONGO_URI)
  console.log('Connected to MongoDB:', MONGO_URI)

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Product.deleteMany({}),
    Order.deleteMany({}),
    Notification.deleteMany({}),
  ])
  console.log('Collections cleared')

  // Create users (password hashed via pre-save hook)
  const users = await User.create(rawUsers)
  const admin = users.find((u) => u.role === 'admin')
  const seller = users.find((u) => u.role === 'seller')
  const customer1 = users.find((u) => u.email === 'sophie@superbe.store')
  const customer2 = users.find((u) => u.email === 'patrick@superbe.store')
  console.log(`Users created: ${users.length}`)

  // Create products (seller is Amina)
  const products = await Product.create(
    rawProducts.map((p) => ({ ...p, seller: seller._id }))
  )
  console.log(`Products created: ${products.length}`)

  // Create sample orders
  const bijou = products.find((p) => p.category === 'bijoux')
  const soin = products.find((p) => p.category === 'soin & sante')
  const outil = products.find((p) => p.category === 'outils informatiques')

  const orders = await Order.create([
    {
      customer: customer1._id,
      items: [
        { product: bijou._id, name: bijou.name, price: bijou.price, quantity: 1, image: bijou.images[0] },
        { product: soin._id, name: soin.name, price: soin.price, quantity: 2, image: soin.images[0] },
      ],
      totalAmount: bijou.price + soin.price * 2,
      status: 'delivered',
      paymentStatus: 'paid',
      deliveryAddress: { city: 'Brazzaville', area: 'Bacongo', details: 'Rue Matsoua, porte bleue' },
      deliveryFee: 1500,
    },
    {
      customer: customer2._id,
      items: [
        { product: outil._id, name: outil.name, price: outil.price, quantity: 1, image: outil.images[0] },
      ],
      totalAmount: outil.price,
      status: 'shipped',
      paymentStatus: 'paid',
      deliveryAddress: { city: 'Brazzaville', area: 'Poto-Poto', details: 'Avenue des Martyrs' },
      deliveryFee: 1500,
    },
    {
      customer: customer1._id,
      items: [
        { product: bijou._id, name: bijou.name, price: bijou.price, quantity: 2, image: bijou.images[0] },
      ],
      totalAmount: bijou.price * 2,
      status: 'processing',
      paymentStatus: 'pending',
      deliveryAddress: { city: 'Brazzaville', area: 'Bacongo', details: 'Rue Matsoua, porte bleue' },
      deliveryFee: 1500,
    },
  ])
  console.log(`Orders created: ${orders.length}`)

  // Create welcome notifications
  await Notification.create([
    {
      recipient: customer1._id,
      title: 'Bienvenue sur SuperBe !',
      body: 'Découvrez nos bijoux, soins et outils informatiques. Livraison partout à Brazzaville.',
      type: 'ACCOUNT_VERIFIED',
      isRead: true,
      deliveryStatus: 'sent',
    },
    {
      recipient: customer1._id,
      title: 'Commande livrée ✅',
      body: 'Votre commande a été livrée avec succès. Merci pour votre confiance !',
      type: 'ORDER_DELIVERED',
      isRead: false,
      deliveryStatus: 'sent',
    },
    {
      recipient: customer2._id,
      title: 'Bienvenue sur SuperBe !',
      body: 'Découvrez nos bijoux, soins et outils informatiques. Livraison partout à Brazzaville.',
      type: 'ACCOUNT_VERIFIED',
      isRead: false,
      deliveryStatus: 'sent',
    },
    {
      recipient: customer2._id,
      title: 'Commande en route 🚚',
      body: 'Votre commande est en cours de livraison. Restez disponible !',
      type: 'ORDER_STATUS_CHANGED',
      isRead: false,
      deliveryStatus: 'sent',
    },
  ])
  console.log('Notifications created: 4')

  // ─── Summary ───────────────────────────────────────────────────────────────
  console.log('\n──────────────────────────────────────────')
  console.log('         SEED COMPLETED SUCCESSFULLY')
  console.log('──────────────────────────────────────────')
  console.log('COMPTES DE TEST :')
  console.log('  Admin    → admin@superbe.store      / Admin@1234')
  console.log('  Seller   → amina@superbe.store      / Seller@1234')
  console.log('  Delivery → delivery@superbe.store   / Delivery@1234')
  console.log('  User 1   → sophie@superbe.store     / User@1234')
  console.log('  User 2   → patrick@superbe.store    / User@1234')
  console.log('──────────────────────────────────────────')
  console.log(`Produits : ${products.length} (5 bijoux · 5 soins · 5 outils)`)
  console.log(`Commandes : ${orders.length} (1 livrée · 1 expédiée · 1 en traitement)`)
  console.log('──────────────────────────────────────────\n')

  await mongoose.disconnect()
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
