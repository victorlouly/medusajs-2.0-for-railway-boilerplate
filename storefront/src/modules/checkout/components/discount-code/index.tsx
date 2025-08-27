"use client"

import { Badge, Heading, Input, Label, Text, Button } from "@medusajs/ui"
import { Tag, X, Plus } from "lucide-react"
import React from "react"
import { useFormState } from "react-dom"

import { applyPromotions, submitPromotionForm } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import ErrorMessage from "../error-message"
import { SubmitButton } from "../submit-button"

type DiscountCodeProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const { items = [], promotions = [] } = cart
  const removePromotionCode = async (code: string) => {
    const validPromotions = promotions.filter(
      (promotion) => promotion.code !== code
    )

    await applyPromotions(
      validPromotions.filter((p) => p.code === undefined).map((p) => p.code!)
    )
  }

  const addPromotionCode = async (formData: FormData) => {
    const code = formData.get("code")
    if (!code) {
      return
    }
    const input = document.getElementById("promotion-input") as HTMLInputElement
    const codes = promotions
      .filter((p) => p.code === undefined)
      .map((p) => p.code!)
    codes.push(code.toString())

    await applyPromotions(codes)

    if (input) {
      input.value = ""
    }
  }

  const [message, formAction] = useFormState(submitPromotionForm, null)

  return (
    <div className="w-full">
      <div className="space-y-4">
        <form action={(a) => addPromotionCode(a)} className="w-full">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-gray-500" />
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              data-testid="add-discount-button"
            >
              {isOpen ? 'Cancelar' : 'Adicionar Cupom de Desconto'}
            </button>
            {!isOpen && (
              <Plus className="w-4 h-4 text-gray-500" />
            )}
          </div>

          {isOpen && (
            {/* <Tooltip content="You can add multiple promotion codes">
              <InformationCircleSolid color="var(--fg-muted)" />
            </Tooltip> */}
            <>
              <div className="flex gap-2">
                <Input
                  className="flex-1 h-10 rounded-lg border-gray-200 focus:border-gray-400 focus:ring-0"
                  id="promotion-input"
                  name="code"
                  type="text"
                  placeholder="Digite seu cupom"
                  autoFocus={false}
                  data-testid="discount-input"
                />
                <Button
                  type="submit"
                  className="px-6 h-10 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors"
                  data-testid="discount-apply-button"
                >
                  Aplicar
                </Button>
              </div>

              {message && (
                <div className="text-sm text-red-600 mt-2" data-testid="discount-error-message">
                  {message}
                </div>
              )}
            </>
          )}
        </form>

        {promotions.length > 0 && (
          <div className="space-y-3">
            <Text className="text-sm font-medium text-gray-700">
              Cupons aplicados:
            </Text>

            <div className="space-y-2">
              {promotions.map((promotion) => (
                <div
                  key={promotion.id}
                  className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3"
                  data-testid="discount-row"
                >
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      {promotion.code}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {promotion.application_method?.value !== undefined &&
                        promotion.application_method.currency_code !== undefined && (
                          <>
                            {promotion.application_method.type === "percentage"
                              ? `${promotion.application_method.value}% de desconto`
                              : `${convertToLocale({
                                  amount: promotion.application_method.value,
                                  currency_code: promotion.application_method.currency_code,
                                })} de desconto`}
                          </>
                        )}
                    </span>
                  </div>
                  {!promotion.is_automatic && (
                    <button
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      onClick={() => {
                        if (!promotion.code) return
                        removePromotionCode(promotion.code)
                      }}
                      data-testid="remove-discount-button"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DiscountCode
