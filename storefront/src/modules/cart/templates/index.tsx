import ItemsTemplate from "./items"
import Summary from "./summary"
import { ShoppingBag, Lock, Truck } from "lucide-react"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Header da página */}
      <div className="bg-white border-b border-gray-100">
        <div className="content-container py-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Seu Carrinho</h1>
              <p className="text-sm text-gray-500">
                {cart?.items?.length ? `${cart.items.length} ${cart.items.length === 1 ? 'item' : 'itens'}` : 'Carrinho vazio'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="content-container py-12" data-testid="cart-container">
        {cart?.items?.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
            <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 p-8 gap-y-8">
              {!customer && (
                <>
                  <SignInPrompt />
                  <div className="h-px bg-gray-100" />
                </>
              )}
              <ItemsTemplate items={cart?.items} />
              
              {/* Benefícios */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="w-4 h-4" />
                  <span>Frete grátis acima de R$ 299</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Lock className="w-4 h-4" />
                  <span>Compra 100% segura</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Troca grátis em 30 dias</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="sticky top-8">
                {cart && cart.region && <Summary cart={cart as any} />}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
