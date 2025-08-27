"use client"

import { Text, clx } from "@medusajs/ui"

import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"
import { Minus, Plus, Trash2 } from "lucide-react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
}

const Item = ({ item, type = "full" }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { handle } = item.variant?.product ?? {}

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    const message = await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  // TODO: Update this to grab the actual max inventory
  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-sm transition-shadow" data-testid="product-row">
      <div className="flex gap-4">
        {/* Imagem do produto */}
        <LocalizedClientLink
          href={`/products/${handle}`}
          className={clx("flex-shrink-0", {
            "w-16 h-16": type === "preview",
            "w-20 h-20 md:w-24 md:h-24": type === "full",
          })}
        >
          <Thumbnail
            thumbnail={item.variant?.product?.thumbnail}
            images={item.variant?.product?.images}
            size="square"
            className="rounded-lg overflow-hidden"
          />
        </LocalizedClientLink>
      </Table.Cell>

        {/* Informações do produto */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <LocalizedClientLink href={`/products/${handle}`}>
                <Text
                  className="font-medium text-gray-900 hover:text-gray-700 transition-colors"
                  data-testid="product-title"
                >
                  {item.product_title}
                </Text>
              </LocalizedClientLink>
              <div className="mt-1">
                <LineItemOptions variant={item.variant} data-testid="product-variant" />
              </div>
            </div>
            
            {/* Preço */}
            <div className="text-right ml-4">
              {type === "preview" && (
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <span>{item.quantity}x</span>
                  <LineItemUnitPrice item={item} style="tight" />
                </div>
              )}
              <div className="font-semibold text-gray-900">
                <LineItemPrice item={item} style="tight" />
              </div>
            </div>
          </div>

          {type === "full" && (
            <div className="flex items-center justify-between mt-4">
              {/* Controles de quantidade */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => changeQuantity(Math.max(1, item.quantity - 1))}
                    className="p-2 hover:bg-gray-50 transition-colors"
                    disabled={updating || item.quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 py-2 min-w-[3rem] text-center font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => changeQuantity(item.quantity + 1)}
                    className="p-2 hover:bg-gray-50 transition-colors"
                    disabled={updating || item.quantity >= maxQuantity}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {updating && <Spinner className="w-4 h-4" />}
              </div>

              {/* Botão remover */}
              <button
                onClick={() => handleDelete(item.id)}
                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors"
                data-testid="product-delete-button"
              >
                <Trash2 className="w-4 h-4" />
                <span>Remover</span>
              </button>
            </div>
          )}
          
          {error && (
            <div className="mt-2 text-sm text-red-600" data-testid="product-error-message">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Item
