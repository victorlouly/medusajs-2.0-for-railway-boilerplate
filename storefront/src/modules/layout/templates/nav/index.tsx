import { Suspense } from "react"
import { Search, User, ShoppingCart, Phone, MapPin } from "lucide-react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      {/* Barra promocional */}
      <div className="bg-blue-900 text-white text-center py-2 text-sm">
        PAGANDO COM PIX VOCÊ GANHA 10% EM DESCONTO
      </div>

      {/* Header principal */}
      <header className="relative bg-white border-b duration-200 border-ui-border-base">
        <div className="content-container">
          {/* Primeira linha - Logo, Busca, Atendimento, Login, Carrinho */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center">
              <LocalizedClientLink href="/" className="flex items-center">
                <div className="bg-blue-600 text-white px-3 py-2 rounded mr-2">
                  <span className="font-bold text-lg">OTH</span>
                </div>
                <span className="text-blue-600 font-semibold text-lg">PRODUTOS</span>
              </LocalizedClientLink>
            </div>

            {/* Barra de busca central */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="O que deseja procurar?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600">
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* Ações do usuário */}
            <div className="flex items-center space-x-6">
              {/* Central de Atendimento */}
              <div className="flex items-center text-sm text-gray-600">
                <Phone size={20} className="text-red-500 mr-2" />
                <div>
                  <div className="font-medium">Central de</div>
                  <div>Atendimento</div>
                </div>
              </div>

              {/* Login/Cadastro */}
              <LocalizedClientLink href="/account" className="flex items-center text-sm text-gray-600 hover:text-blue-600">
                <User size={20} className="mr-2" />
                <div>
                  <div>Olá, bem-vindo(a)</div>
                  <div className="font-medium">Entrar / Cadastrar</div>
                </div>
              </LocalizedClientLink>

              {/* Carrinho */}
              <div className="relative">
                <Suspense
                  fallback={
                    <LocalizedClientLink
                      className="flex items-center text-orange-500"
                      href="/cart"
                      data-testid="nav-cart-link"
                    >
                      <ShoppingCart size={24} />
                      <span className="ml-1 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                        0
                      </span>
                    </LocalizedClientLink>
                  }
                >
                  <CartButton />
                </Suspense>
              </div>
            </div>
          </div>
        </div>

        {/* Navegação por categorias */}
        <div className="bg-blue-400 text-white">
          <div className="content-container">
            <nav className="flex items-center space-x-8 py-3">
              <div className="flex items-center space-x-2 hover:bg-blue-500 px-3 py-2 rounded cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-400"></div>
                </div>
                <span className="font-medium">Notebooks</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <div className="flex items-center space-x-2 hover:bg-blue-500 px-3 py-2 rounded cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-400"></div>
                </div>
                <span className="font-medium">Produtos Apple</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <div className="flex items-center space-x-2 hover:bg-blue-500 px-3 py-2 rounded cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-400"></div>
                </div>
                <span className="font-medium">CPUs & Monitores</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <div className="flex items-center space-x-2 hover:bg-blue-500 px-3 py-2 rounded cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-400"></div>
                </div>
                <span className="font-medium">Lotes</span>
              </div>

              <div className="flex items-center space-x-2 hover:bg-blue-500 px-3 py-2 rounded cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-400"></div>
                </div>
                <span className="font-medium">Outros produtos</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </nav>
          </div>
        </div>

        {/* Menu mobile */}
        <div className="lg:hidden absolute top-4 left-4">
          <SideMenu regions={regions} />
        </div>
      </header>
    </div>
  )
}