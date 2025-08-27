"use client"

import { Heading, Text, useToggleState } from "@medusajs/ui"
import { CheckCircle, MapPin, Edit } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"

import { setAddresses } from "@lib/data/cart"
import compareAddresses from "@lib/util/compare-addresses"
import { HttpTypes } from "@medusajs/types"
import { useFormState } from "react-dom"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"
import { clx } from "@medusajs/ui"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useFormState(setAddresses, null)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className={clx("w-10 h-10 rounded-full flex items-center justify-center", {
            "bg-green-100": !isOpen && cart?.shipping_address,
            "bg-gray-100": isOpen || !cart?.shipping_address
          })}>
            <MapPin className={clx("w-5 h-5", {
              "text-green-600": !isOpen && cart?.shipping_address,
              "text-gray-600": isOpen || !cart?.shipping_address
            })} />
          </div>
          <Heading level="h2" className="text-xl font-semibold text-gray-900">
            Endereço de Entrega
          </Heading>
          {!isOpen && cart?.shipping_address && <CheckCircle className="w-5 h-5 text-green-600" />}
        </div>
        {!isOpen && cart?.shipping_address && (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              data-testid="edit-address-button"
            >
              <Edit className="w-4 h-4" />
              Editar
            </button>
        )}
      </div>
      
      {isOpen ? (
        <form action={formAction}>
          <div className="space-y-8">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-gray-600" />
                  </div>
                  <Heading level="h3" className="text-lg font-semibold text-gray-900">
                    Endereço de Cobrança
                  </Heading>
                </div>
                
                </Heading>

                <BillingAddress cart={cart} />
              </div>
            )}
            <SubmitButton className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-colors" data-testid="submit-address-button">
              Continuar para Entrega
            </SubmitButton>
            {message && (
              <div className="text-sm text-red-600 mt-4" data-testid="address-error-message">
                {message}
              </div>
            )}
          </div>
        </form>
      ) : (
        <div>
            {cart && cart.shipping_address ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                    className="bg-gray-50 rounded-xl p-4"
                    data-testid="shipping-address-summary"
                  >
                    <Text className="font-medium text-gray-900 mb-2">
                      Endereço de Entrega
                    </Text>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>
                      {cart.shipping_address.first_name}{" "}
                      {cart.shipping_address.last_name}
                      </div>
                      <div>
                      {cart.shipping_address.address_1}{" "}
                      {cart.shipping_address.address_2}
                      </div>
                      <div>
                      {cart.shipping_address.postal_code},{" "}
                      {cart.shipping_address.city}
                      </div>
                      <div>
                      {cart.shipping_address.country_code?.toUpperCase()}
                      </div>
                    </div>
                  </div>

                <div
                    className="bg-gray-50 rounded-xl p-4"
                    data-testid="shipping-contact-summary"
                  >
                    <Text className="font-medium text-gray-900 mb-2">
                      Contato
                    </Text>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>
                      {cart.shipping_address.phone}
                      </div>
                      <div>
                      {cart.email}
                      </div>
                    </div>
                  </div>

                <div
                    className="bg-gray-50 rounded-xl p-4"
                    data-testid="billing-address-summary"
                  >
                    <Text className="font-medium text-gray-900 mb-2">
                      Endereço de Cobrança
                    </Text>

                    {sameAsBilling ? (
                      <div className="text-sm text-gray-600">
                        Mesmo endereço de entrega
                      </div>
                    ) : (
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>
                          {cart.billing_address?.first_name}{" "}
                          {cart.billing_address?.last_name}
                        </div>
                        <div>
                          {cart.billing_address?.address_1}{" "}
                          {cart.billing_address?.address_2}
                        </div>
                        <div>
                          {cart.billing_address?.postal_code},{" "}
                          {cart.billing_address?.city}
                        </div>
                        <div>
                          {cart.billing_address?.country_code?.toUpperCase()}
                        </div>
                      </div>
                    )}
                  </div>
              </div>
            ) : (
              <div className="flex items-center justify-center py-8">
                <Spinner />
              </div>
            )}
        </div>
      )}
    </div>
  )
}

export default Addresses
