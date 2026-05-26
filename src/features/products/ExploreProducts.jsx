import { useState } from 'react'
import ProductFilters from './ProductFilters'
import ProductGrid from './ProductGrid'
import { BiFilterAlt } from 'react-icons/bi'

const ExploreProducts = ({ className = '' }) => {
  const [filters, setFilters] = useState({})
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  const activeFiltersCount = Object.keys(filters).length

  return (
    <div className={`bg-gray-50 min-h-screen ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Mobile Header with Filter Button */}
        <div className="md:hidden flex justify-between items-center mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="font-bold text-gray-800 text-base">Nos Produits</span>
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md shadow-amber-500/10 cursor-pointer"
          >
            <BiFilterAlt className="text-lg" />
            Filtres {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </button>
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar (Floating & Sticky) */}
          <aside className="w-72 shrink-0 hidden md:block sticky top-28 self-start bg-transparent">
            <ProductFilters onFilterChange={setFilters} initialFilters={filters} />
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <ProductGrid filters={filters} />
          </main>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`fixed inset-0 bg-black/45 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300 ${
          isMobileFilterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileFilterOpen(false)}
      />

      {/* Mobile Drawer Body */}
      <div
        className={`fixed inset-y-0 left-0 w-80 bg-white z-50 md:hidden flex flex-col transform transition-transform duration-300 shadow-2xl ${
          isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <h3 className="font-bold text-gray-800 text-lg tracking-wide">Filtres</h3>
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
          <ProductFilters onFilterChange={setFilters} initialFilters={filters} />
        </div>

        {/* Drawer Footer CTA */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-amber-500/10 transition-all cursor-pointer"
          >
            Voir les résultats
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExploreProducts
