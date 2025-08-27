"use client"

import { convertToLocale } from "@lib/util/money"
import { Info } from "lucide-react"
import React from "react"

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    shipping_total?: number | null
    discount_total?: number | null
    gift_card_total?: number | null
    currency_code: string
  }
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const {
    currency_code,
    total,
    subtotal,
    tax_total,
    shipping_total,
    discount_total,
    gift_card_total,
  } = totals

  return (
    <div>
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between text-gray-600">
          <span className="flex items-center gap-2">
            Subtotal
            <Info className="w-3 h-3 text-gray-400" />
          </span>
          <span className="font-medium" data-testid="cart-subtotal" data-value={subtotal || 0}>
            {convertToLocale({ amount: subtotal ?? 0, currency_code })}
          </span>
        </div>
        
        {!!discount_total && (
          <div className="flex items-center justify-between text-green-600">
            <span>Desconto aplicado</span>
            <span
              className="font-medium"
              data-testid="cart-discount"
              data-value={discount_total || 0}
            >
              -
              {convertToLocale({ amount: discount_total ?? 0, currency_code })}
            </span>
          </div>
        )}
        
        <div className="flex items-center justify-between text-gray-600">
          <span>Frete</span>
          <span className="font-medium" data-testid="cart-shipping" data-value={shipping_total || 0}>
            {shipping_total === 0 ? 'Grátis' : convertToLocale({ amount: shipping_total ?? 0, currency_code })}
          </span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>Impostos inclusos</span>
          <span className="font-medium" data-testid="cart-taxes" data-value={tax_total || 0}>
            {convertToLocale({ amount: tax_total ?? 0, currency_code })}
          </span>
        </div>
        
        {!!gift_card_total && (
          <div className="flex items-center justify-between text-purple-600">
            <span>Cartão presente</span>
            <span
              className="font-medium"
              data-testid="cart-gift-card-amount"
              data-value={gift_card_total || 0}
            >
              -
              {convertToLocale({ amount: gift_card_total ?? 0, currency_code })}
            </span>
          </div>
        )}
      </div>
      
      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">Total</span>
        <span
            className="text-xl font-bold text-gray-900"
          data-testid="cart-total"
          data-value={total || 0}
        >
          {convertToLocale({ amount: total ?? 0, currency_code })}
        </span>
        </div>
      </div>
    </div>
  )
}

export default CartTotals
