import { useSelector } from 'react-redux'

const Cart = () => {
  const items = useSelector((state) => state.cart.items)

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mon Panier</h1>
      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Votre panier est vide — à implémenter (Phase 2)</p>
      ) : (
        <p className="text-gray-500">{items.length} article(s) — à implémenter (Phase 2)</p>
      )}
    </div>
  )
}

export default Cart
