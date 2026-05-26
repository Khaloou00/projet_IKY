import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { BsFillCloudUploadFill } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import toast from 'react-hot-toast'
import Select from 'react-select'
import { categories, sousCategoriesBijoux, sousCategoriesInformatique, sousCategoriesSoinSante } from '../../utils/constants'
import { resizeFile } from '../../utils/imageUtils'
import SimpleLoader from '../../components/ui/SimpleLoader'
import ConfirmationModal from '../../components/ui/ConfirmationModal'
import { useUpdateProductMutation, useUploadProductImageMutation, useDeleteProductImageMutation } from '../../services/api/productsApi'

const ALL_SOUS_CATEGORIES = [
  ...sousCategoriesBijoux,
  ...sousCategoriesSoinSante,
  ...sousCategoriesInformatique,
]

const EditProduct = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // Persist product across refreshes via localStorage
  const product = (() => {
    try {
      return JSON.parse(localStorage.getItem('produitAModifier')) || location.state?.product || {}
    } catch {
      return location.state?.product || {}
    }
  })()

  useEffect(() => {
    localStorage.setItem('produitAModifier', JSON.stringify(product))
    return () => localStorage.removeItem('produitAModifier')
  }, [])

  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [nom, setNom] = useState(product.name || '')
  const [shortDescription, setShortDescription] = useState(product.shortDescription || '')
  const [longDescription, setLongDescription] = useState(product.longDescription || '')
  const [imagesTab, setImagesTab] = useState(product.images || [])
  const [price, setPrice] = useState(product.price || '')
  const [categorie, setCategorie] = useState(product.category ? { value: product.category, label: product.category } : '')
  const [sousCategorie, setSousCategorie] = useState(product.subCategory ? { value: product.subCategory, label: product.subCategory } : '')
  const [sousCategoriesDeux, setSousCategoriesDeux] = useState(product.subCategoryLevel2 ? { value: product.subCategoryLevel2, label: product.subCategoryLevel2 } : '')

  const [updateProduct] = useUpdateProductMutation()
  const [uploadProductImage] = useUploadProductImageMutation()
  const [deleteProductImage] = useDeleteProductImageMutation()

  const optionsCategorie = categories.map((cat) => ({ value: cat, label: cat }))

  const getSousCategories = () => {
    if (!categorie) return []
    const sourceMap = {
      bijoux: sousCategoriesBijoux,
      'soin & sante': sousCategoriesSoinSante,
      'outils informatiques': sousCategoriesInformatique,
    }
    return (sourceMap[categorie.value] || []).map((obj) => {
      const key = Object.keys(obj)[0]
      return { value: key, label: key }
    })
  }

  const getSousCategoriesDeux = () => {
    if (!sousCategorie) return []
    const found = ALL_SOUS_CATEGORIES.find((obj) => Object.keys(obj)[0] === sousCategorie.value)
    if (!found) return []
    return Object.values(found)[0].map((v) => ({ value: v, label: v }))
  }

  const uploadImages = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length + imagesTab.length > 3) {
      toast.error('Maximum 3 images autorisées.')
      return
    }
    const validTypes = ['image/png', 'image/jpeg', 'image/webp']
    if (files.some((f) => !validTypes.includes(f.type))) {
      toast.error('Seules les images JPEG, PNG et WebP sont acceptées.')
      return
    }
    setLoading(true)
    try {
      const resizedFiles = await Promise.all(files.map(resizeFile))
      for (const file of resizedFiles) {
        const formData = new FormData()
        formData.append('image', file)
        const { data } = await uploadProductImage(formData).unwrap()
        setImagesTab((prev) => [...prev, data.url])
      }
      toast.success(files.length > 1 ? 'Images téléchargées avec succès.' : 'Image téléchargée avec succès.')
    } catch {
      toast.error("Erreur lors du téléchargement de l'image.")
    } finally {
      setLoading(false)
    }
  }

  const deleteImage = async (url) => {
    const toastId = toast.loading('Suppression en cours...')
    try {
      await deleteProductImage({ url }).unwrap()
      setImagesTab((prev) => prev.filter((img) => img !== url))
      toast.dismiss(toastId)
      toast.success('Image supprimée avec succès.')
    } catch {
      toast.dismiss(toastId)
      toast.error("Erreur lors de la suppression de l'image.")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!nom || !shortDescription || !longDescription || !price || !imagesTab.length || !categorie || !sousCategorie || !sousCategoriesDeux) {
      toast.error('Veuillez remplir tous les champs.')
      return
    }
    setShowModal(true)
  }

  const handleConfirm = async () => {
    setShowModal(false)
    const toastId = toast.loading('Modification du produit...')
    try {
      await updateProduct({
        id: product._id,
        name: nom.toLowerCase(),
        shortDescription,
        longDescription,
        category: categorie.label.toLowerCase(),
        subCategory: sousCategorie.value.toLowerCase(),
        subCategoryLevel2: sousCategoriesDeux.value.toLowerCase(),
        price: Number(price),
        images: imagesTab,
      }).unwrap()
      toast.dismiss(toastId)
      toast.success('Produit modifié avec succès 😊')
      setTimeout(() => navigate('/admin/all-products'), 1000)
    } catch (err) {
      toast.dismiss(toastId)
      toast.error(err?.data?.message || 'Erreur lors de la modification, veuillez réessayer.')
    }
  }

  return (
    <div className="xl:max-w-[90%] mx-auto p-3 lg:p-6">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-8">Modifier le produit</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg md:p-8">
        <div className="grid grid-cols-1 lg:divide-x-2 lg:divide-dashed divide-gray-300 lg:grid-cols-[40%_58%] md:gap-8 p-4">
          {/* Left — Image Upload */}
          <div className="basis-1/2 bg-white h-full py-3">
            <div className="cursor-pointer p-6 md:p-0 h-[200px] lg:h-[50%] lg:w-[90%] bg-slate-100 mx-auto rounded-md outline-2 outline-offset-2 outline-dashed outline-slate-300 flex items-center justify-center relative">
              {loading ? (
                <SimpleLoader />
              ) : (
                <div>
                  <label htmlFor="photo" className="cursor-pointer">
                    <div className="flex items-center flex-col justify-center">
                      <BsFillCloudUploadFill className="text-5xl text-gray-400" />
                      <p className="mt-3 text-gray-500 text-center">
                        Cliquez pour télécharger 1 à 3 images
                        <br />
                        <span className="text-sm inline-block">PNG, JPG jusqu'à 10MB</span>
                      </p>
                    </div>
                  </label>
                  <input onChange={uploadImages} type="file" disabled={imagesTab.length === 3} multiple className="hidden" id="photo" />
                </div>
              )}
            </div>
            <div className="lg:p-5 space-y-3">
              {imagesTab.map((url, i) => (
                <div key={i} className="flex items-center gap-1 shadow-sm bg-slate-100 p-2 rounded-md">
                  <img src={url} alt="" className="object-cover rounded-md w-[50px] h-[40px] md:w-[70px] md:h-[60px]" />
                  <p className="text-xs flex-1 truncate px-2">{url.split('/').pop()}</p>
                  <MdDelete onClick={() => deleteImage(url)} className="text-slate-300 hover:text-amber-400 duration-300 cursor-pointer text-4xl" />
                </div>
              ))}
            </div>
          </div>

          {/* Right — Product Details */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="font-semibold text-gray-700 mt-3 md:mt-0">Détails du produit</h3>
            <input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom du Produit" className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 outline-none" required />
            <textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} placeholder="Description Courte du Produit" rows={2} className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 outline-none resize-none" />
            <textarea value={longDescription} onChange={(e) => setLongDescription(e.target.value)} placeholder="Description Longue du Produit" rows={4} className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 outline-none resize-none" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select value={categorie} onChange={(opt) => { setCategorie(opt); setSousCategorie(null) }} options={optionsCategorie} placeholder="Catégorie" classNames={{ control: () => 'border border-gray-300 rounded-lg px-3 text-[16px] md:py-2 hover:border-amber-400' }} />
              <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Prix de référence" type="number" min="0" step="0.01" className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 outline-none" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select value={sousCategorie} onChange={setSousCategorie} options={getSousCategories()} placeholder="Sous-catégorie" isDisabled={!categorie} classNames={{ control: () => 'border border-gray-300 text-[16px] rounded-lg px-3 md:py-2 hover:border-amber-400' }} />
              <Select value={sousCategoriesDeux} onChange={setSousCategoriesDeux} isDisabled={!sousCategorie} options={getSousCategoriesDeux()} placeholder="Sous-Catégorie 2" classNames={{ control: () => 'border border-gray-300 rounded-lg px-3 text-[16px] md:py-2 hover:border-amber-400' }} />
            </div>
            <div className="pt-4">
              <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200">
                Enregistrer les modifications
              </button>
            </div>
          </div>

          <ConfirmationModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleConfirm}
            data={{
              nom: nom.toLowerCase(),
              descriptionCourte: shortDescription,
              descriptionLongue: longDescription,
              price: `${Number(price)}`,
              categorie: String(categorie?.label).toLowerCase(),
              sousCategorie: String(sousCategorie?.label).toLowerCase(),
              sousCategorieDeux: String(sousCategoriesDeux?.label).toLowerCase(),
            }}
          />
        </div>
      </form>
    </div>
  )
}

export default EditProduct
