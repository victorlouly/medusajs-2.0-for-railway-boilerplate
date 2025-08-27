import { Heading, Text, Button } from "@medusajs/ui"
import { ShoppingBag, ArrowRight } from "lucide-react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4" data-testid="empty-cart-message">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-8">
        <ShoppingBag className="w-12 h-12 text-gray-400" />
      </div>
      
      <Heading level="h1" className="text-2xl font-semibold text-gray-900 mb-4">
        Seu carrinho está vazio
      </Heading>
      
      <Text className="text-gray-600 mb-8 max-w-md">
        Parece que você ainda não adicionou nenhum item ao seu carrinho. 
        Que tal explorar nossos produtos incríveis?
      </Text>
      
      <div className="space-y-4">
        <LocalizedClientLink href="/store">
          <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors">
            Explorar Produtos
            <ArrowRight className="w-4 h-4" />
          </Button>
        </LocalizedClientLink>
        
        <LocalizedClientLink href="/" className="block">
          <Button variant="secondary" className="px-8 py-3 rounded-xl font-medium">
            Voltar ao Início
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
