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
    <div className="relative flex items-center h-full">
      <ShoppingCart size={24} />
      
      {totalItems > 0 && (
        <span
          className="absolute -top-2 -right-3 bg-white text-black border border-black rounded-full w-5 h-5 flex items-center justify-center text-xs"
          data-testid="cart-count"
        >
          {totalItems}
        </span>
      )}
      
      {/* O CartDropdown ficará invisível aqui, apenas para a funcionalidade de hover */}
      <CartDropdown cart={cart} />
    </div>
  )
}