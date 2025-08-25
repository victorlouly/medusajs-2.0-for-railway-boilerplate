import { notFound } from "next/navigation"
import { ShoppingCart } from "lucide-react"
import CartDropdown from "../cart-dropdown"
import { enrichLineItems, retrieveCart } from "@lib/data/cart"

const fetchCart = async () => {
  const cart = await retrieveCart()

  if (!cart) {
    return null
  }

  if (cart?.items?.length) {
    const enrichedItems = await enrichLineItems(cart.items, cart.region_id!)
    cart.items = enrichedItems
  }

  return cart
}

export default async function CartButton() {
  const cart = await fetchCart()
  
  const totalItems = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0

  return (
    <div className="relative">
      <div className="flex items-center text-orange-500">
        <ShoppingCart size={24} />
        <span className="ml-1 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
          {totalItems}
        </span>
      </div>
      <CartDropdown cart={cart} />
    </div>
  )
}
