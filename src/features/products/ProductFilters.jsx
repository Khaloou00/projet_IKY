import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  sousCategoriesBijoux,
  sousCategoriesInformatique,
  sousCategoriesSoinSante
} from '../../utils/constants'
import { BiReset, BiChevronDown, BiChevronUp, BiSearch } from 'react-icons/bi'
import { motion, AnimatePresence } from 'framer-motion'

const CATEGORY_MAP = {
  bijoux: sousCategoriesBijoux,
  'soin & sante': sousCategoriesSoinSante,
  'outils informatiques': sousCategoriesInformatique,
}

const ProductFilters = ({ onReset, onFilterChange, initialFilters = {} }) => {
  const { selected: category } = useSelector((state) => state.category)
  const subcategories = CATEGORY_MAP[category] || []

  // État local
  const [selectedFilters, setSelectedFilters] = useState(initialFilters)
  const [openGroups, setOpenGroups] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [isResetting, setIsResetting] = useState(false)

  // Initialiser tous les groupes comme ouverts
  useEffect(() => {
    const initialOpenState = {}
    subcategories.forEach((group, index) => {
      initialOpenState[index] = true
    })
    setOpenGroups(initialOpenState)
  }, [category])

  // Gérer le changement de checkbox
  const handleFilterChange = (groupTitle, value, checked) => {
    const filterKey = `${groupTitle}_${value}`
    let newFilters = { ...selectedFilters }

    if (checked) {
      newFilters[filterKey] = { group: groupTitle, value }
    } else {
      delete newFilters[filterKey]
    }

    setSelectedFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  // Vérifier si un filtre est actif
  const isFilterSelected = (groupTitle, value) => {
    const filterKey = `${groupTitle}_${value}`
    return !!selectedFilters[filterKey]
  }

  // Reset des filtres avec animation
  const handleReset = () => {
    setIsResetting(true)
    setSelectedFilters({})
    onFilterChange?.({})
    onReset?.()

    setTimeout(() => setIsResetting(false), 300)
  }

  // Compter les filtres actifs
  const activeFiltersCount = Object.keys(selectedFilters).length

  // Basculer l'ouverture d'un groupe
  const toggleGroup = (groupIndex) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupIndex]: !prev[groupIndex]
    }))
  }

  // Filtrer les valeurs par recherche
  const filterValuesBySearch = (values) => {
    if (!searchTerm) return values
    return values.filter(value =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header avec compteur */}
      <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-gray-800 text-lg tracking-wide">CATÉGORIES</h3>
          {activeFiltersCount > 0 && (
            <span className="bg-amber-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>

        <motion.button
          onClick={handleReset}
          disabled={activeFiltersCount === 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 ${activeFiltersCount > 0
            ? 'text-amber-600 hover:bg-amber-50 cursor-pointer'
            : 'text-gray-300 cursor-not-allowed'
            }`}
        >
          <BiReset className={`text-xl ${isResetting ? 'animate-spin' : ''}`} />
          <span className="text-sm font-medium">Réinitialiser</span>
        </motion.button>
      </div>

      {/* Barre de recherche (si assez de sous-catégories) */}
      {subcategories.length > 0 && (
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Rechercher une catégorie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm transition-all"
            />
          </div>
        </div>
      )}

      {/* Liste des sous-catégories */}
      <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
        {subcategories.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            Sélectionnez une catégorie pour voir les filtres
          </div>
        ) : (
          subcategories.map((group, groupIndex) => {
            const title = Object.keys(group)[0]
            const values = Object.values(group)[0]
            const filteredValues = filterValuesBySearch(values)
            const isOpen = openGroups[groupIndex]
            const groupActiveCount = Object.values(selectedFilters).filter(
              filter => filter.group === title
            ).length

            if (filteredValues.length === 0 && searchTerm) return null

            return (
              <motion.div
                key={groupIndex}
                className="group"
                initial={false}
              >
                {/* En-tête du groupe cliquable */}
                <button
                  onClick={() => toggleGroup(groupIndex)}
                  className="w-full flex items-center justify-between py-2 hover:bg-gray-50 rounded-lg transition-colors px-2"
                >
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-700 capitalize text-sm tracking-wide">
                      {title}
                    </p>
                    {groupActiveCount > 0 && (
                      <span className="bg-amber-100 text-amber-700 text-xs font-medium px-1.5 py-0.5 rounded">
                        {groupActiveCount}
                      </span>
                    )}
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isOpen ? (
                      <BiChevronUp className="text-gray-400 text-lg" />
                    ) : (
                      <BiChevronDown className="text-gray-400 text-lg" />
                    )}
                  </motion.div>
                </button>

                {/* Liste des options avec animation */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-1.5 pl-4 pt-2 pb-1">
                        {filteredValues.map((value, i) => {
                          const isSelected = isFilterSelected(title, value)

                          return (
                            <motion.label
                              key={i}
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: i * 0.01 }}
                              className={`flex items-center gap-3 cursor-pointer px-2 py-1.5 rounded-lg transition-all duration-200 ${isSelected
                                ? 'bg-amber-50 text-amber-700'
                                : 'hover:bg-gray-50 text-gray-600'
                                }`}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => handleFilterChange(title, value, e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300 text-amber-500 focus:ring-amber-400 focus:ring-offset-0 cursor-pointer"
                              />
                              <span className="text-sm capitalize select-none">
                                {value}
                              </span>
                            </motion.label>
                          )
                        })}

                        {filteredValues.length === 0 && searchTerm && (
                          <p className="text-xs text-gray-400 italic pl-2 py-2">
                            Aucun résultat
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })
        )}
      </div>

      {/* Footer avec résumé des filtres actifs */}
      {activeFiltersCount > 0 && (
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="flex flex-wrap gap-2">
            {Object.values(selectedFilters).map((filter, idx) => (
              <motion.span
                key={idx}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-medium px-2 py-1 rounded-full"
              >
                {filter.value}
                <button
                  onClick={() => handleFilterChange(filter.group, filter.value, false)}
                  className="hover:text-amber-900 ml-1"
                >
                  ×
                </button>
              </motion.span>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default ProductFilters