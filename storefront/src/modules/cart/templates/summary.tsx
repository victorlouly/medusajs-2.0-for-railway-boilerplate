"use client"

import { Button, Heading } from "@medusajs/ui"
import { ArrowRight, Shield, Truck } from "lucide-react"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)
  const itemCount = cart.items?.reduce((acc, item) => acc + item.quantity, 0) || 0

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <Heading level="h2" className="text-xl font-semibold text-gray-900 mb-6">
        Resumo do Pedido
      </Heading>
      
      <div className="space-y-6">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Itens ({itemCount})</span>
          <span>R$ {((cart.subtotal || 0) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        </div>
        
        <DiscountCode cart={cart} />
        
        <div className="border-t border-gray-100 pt-6">
          <CartTotals totals={cart} />
        </div>
      </div>
      
      <div className="mt-8 space-y-4">
        <LocalizedClientLink href={"/checkout?step=" + step}>
          <Button className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors" data-testid="checkout-button">
            Finalizar Compra
            <ArrowRight className="w-4 h-4" />
          </Button>
        </LocalizedClientLink>
        
        <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span>Compra Segura</span>
          </div>
          <div className="flex items-center gap-1">
            <Truck className="w-3 h-3" />
            <span>Entrega Rápida</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Summary
