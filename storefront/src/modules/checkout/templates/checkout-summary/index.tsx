import { Heading } from "@medusajs/ui"
import { ShoppingBag } from "lucide-react"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="sticky top-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-4 h-4 text-gray-600" />
        </div>
        <Heading level="h2" className="text-xl font-semibold text-gray-900">
          Resumo
        </Heading>
      </div>
      
      <div className="space-y-6">
        <div className="border border-gray-100 rounded-xl p-4">
          <ItemsPreviewTemplate items={cart?.items} />
        </div>
        
        <div className="space-y-4">
          <CartTotals totals={cart} />
        </div>
        
        <div>
          <DiscountCode cart={cart} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
