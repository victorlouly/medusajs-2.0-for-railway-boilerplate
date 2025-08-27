import { getCategoriesList } from "@lib/data/categories"
import { getCollectionsList } from "@lib/data/collections"
import { Text } from "@medusajs/ui"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

// Ícones simples para formas de pagamento (exemplo)
const PaymentMethods = () => (
  <div className="flex items-center gap-x-4">
    <div className="h-8 w-12 bg-gray-200 rounded-md flex items-center justify-center text-xs font-semibold text-gray-800">Visa</div>
    <div className="h-8 w-12 bg-gray-200 rounded-md flex items-center justify-center text-xs font-semibold text-gray-800">Master</div>
    <div className="h-8 w-12 bg-gray-200 rounded-md flex items-center justify-center text-xs font-semibold text-gray-800">Pix</div>
  </div>
)

export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)

  return (
    // ALTERADO: Fundo branco e borda superior preta
    <footer className="bg-white text-gray-800 border-t border-black">
      <div className="content-container flex flex-col w-full">
        {/* Seção Principal do Rodapé */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-10 md:gap-y-16 py-16">
          
          {/* Coluna 1: Logo e Redes Sociais */}
          <div className="flex flex-col gap-y-6 lg:col-span-2">
            <LocalizedClientLink href="/" className="w-fit">
              {/* ALTERADO: Removido 'brightness-0 invert' para a logo aparecer em sua cor original */}
              <Image
                src="/logo.png" 
                alt="OTH Produtos Logo"
                width={160}
                height={45}
              />
            </LocalizedClientLink>
            <p className="text-sm text-gray-600 max-w-sm">
              Sua fonte confiável para produtos de alta qualidade, oferecendo as melhores marcas com entrega rápida e segura em todo o Brasil.
            </p>
            <div className="flex gap-x-4 items-center">
              {/* ALTERADO: Cores dos ícones para preto/hover */}
              <a href="#" aria-label="Facebook" className="text-gray-600 hover:text-black transition-colors"><Facebook size={20} /></a>
              <a href="#" aria-label="Instagram" className="text-gray-600 hover:text-black transition-colors"><Instagram size={20} /></a>
              <a href="#" aria-label="Twitter" className="text-gray-600 hover:text-black transition-colors"><Twitter size={20} /></a>
              <a href="#" aria-label="YouTube" className="text-gray-600 hover:text-black transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Coluna 2: Categorias */}
          {product_categories && product_categories?.length > 0 && (
            <div className="flex flex-col gap-y-4">
              <span className="font-semibold text-gray-900 uppercase tracking-wider">
                Categorias
              </span>
              <ul className="flex flex-col gap-y-2 text-sm">
                {product_categories?.slice(0, 6).map((c) => {
                  if (c.parent_category) {
                    return null
                  }
                  return (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="text-gray-600 hover:text-black transition-colors"
                        href={`/categories/${c.handle}`}
                      >
                        {c.name}
                      </LocalizedClientLink>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {/* Coluna 3: Coleções */}
          {collections && collections.length > 0 && (
            <div className="flex flex-col gap-y-4">
              <span className="font-semibold text-gray-900 uppercase tracking-wider">
                Coleções
              </span>
              <ul className="flex flex-col gap-y-2 text-sm">
                {collections?.slice(0, 6).map((c) => (
                  <li key={c.id}>
                    <LocalizedClientLink
                      className="text-gray-600 hover:text-black transition-colors"
                      href={`/collections/${c.handle}`}
                    >
                      {c.title}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Coluna 4: Atendimento */}
          <div className="flex flex-col gap-y-4">
            <span className="font-semibold text-gray-900 uppercase tracking-wider">Atendimento</span>
            <ul className="flex flex-col gap-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Fale Conosco</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Política de Devolução</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Rastrear Pedido</a></li>
            </ul>
          </div>
        </div>

        {/* Barra Inferior: Copyright e Pagamentos */}
        <div className="flex flex-col md:flex-row w-full py-8 justify-between items-center gap-8 border-t border-gray-200">
          <Text className="text-sm text-gray-500">
            © {new Date().getFullYear()} OTH Produtos. Todos os direitos reservados.
          </Text>
          {/* ALTERADO: Cores dos ícones de pagamento para combinar com o fundo branco */}
          <PaymentMethods />
        </div>
      </div>
    </footer>
  )
}