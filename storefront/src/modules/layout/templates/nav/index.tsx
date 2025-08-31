import { Suspense } from "react"
import { 
  Search, 
  User, 
  ShoppingCart, 
  Heart,
  BadgePercent,
  Menu,
  X
} from "lucide-react"

import { listRegions } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"
import { getProductsList } from "@lib/data/products"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Image from "next/image"
import MobileMenu from "@modules/layout/components/mobile-menu"

// Mapeamento de ícones para categorias
const getCategoryIcon = (categoryName: string) => {
  const iconMap: Record<string, JSX.Element> = {
    'Produtos Apple': <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>,
    'Notebooks': <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    'Celulares': <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
    'Lotes': <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
    'Outros Produtos': <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
  }
  
  return iconMap[categoryName] || <ShoppingCart className="w-4 h-4" />
}

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const categories = await listCategories()

  // Filtrar apenas categorias principais (sem parent)
  const mainCategories = categories?.filter(category => !category.parent_category) || []

  // Buscar produtos para cada categoria principal
  const categoriesWithProducts = await Promise.all(
    mainCategories.map(async (category) => {
      const { response } = await getProductsList({
        queryParams: { 
          category_id: [category.id],
          limit: 6
        },
        countryCode: 'us'
      })
      
      return {
        ...category,
        products: response.products
      }
    })
  )

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      {/* Barra promocional */}
      <div className="bg-gray-900 text-white py-2 text-sm font-medium tracking-wider flex items-center justify-center gap-x-3">
        <BadgePercent className="h-5 w-5" aria-hidden="true" />
        <span className="text-center">PAGANDO COM PIX VOCÊ GANHA 10% EM DESCONTO</span>
      </div>

      {/* Header principal */}
      <header className="relative bg-white border-b duration-200 border-ui-border-base">
        <div className="content-container">
          <div className="flex items-center justify-between py-4">
            {/* Menu hamburger mobile */}
            <div className="lg:hidden">
              <MobileMenu regions={regions} categories={categoriesWithProducts} />
            </div>

            {/* Logo */}
            <div className="flex-shrink-0">
              <LocalizedClientLink href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="x4 Logo"
                  width={160}
                  height={45}
                  priority
                  className="h-8 w-auto lg:h-11"
                />
              </LocalizedClientLink>
            </div>

            {/* Barra de busca central - oculta no mobile */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="O que você procura?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <LocalizedClientLink href="/search">
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600">
                    <Search size={20} />
                  </button>
                </LocalizedClientLink>
              </div>
            </div>

            {/* Ícones de Ação */}
            <div className="flex items-center space-x-3 lg:space-x-6">
              {/* Busca mobile */}
              <LocalizedClientLink href="/search" className="lg:hidden text-black hover:text-gray-700">
                <Search size={24} />
              </LocalizedClientLink>

              {/* Favoritos - oculto no mobile */}
              <LocalizedClientLink href="/wishlist" className="hidden lg:block text-black hover:text-gray-700">
                <Heart size={24} />
              </LocalizedClientLink>

              {/* Login/Cadastro */}
              <LocalizedClientLink href="/account" className="text-black hover:text-gray-700">
                <User size={24} />
              </LocalizedClientLink>

              {/* Carrinho */}
              <div className="relative text-black hover:text-gray-700">
                <Suspense
                  fallback={
                    <LocalizedClientLink
                      className="flex items-center"
                      href="/cart"
                      data-testid="nav-cart-link"
                    >
                      <ShoppingCart size={24} />
                      <span className="absolute -top-1 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
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

        {/* Navegação por categorias - apenas desktop */}
        <div className="hidden lg:block bg-white text-black border-b border-t">
          <div className="content-container">
            <nav className="flex items-center space-x-6 py-3">
              {/* Link para Assistência Técnica */}
              <LocalizedClientLink 
                href="/assistencia" 
                className="flex items-center space-x-2 hover:bg-gray-100 px-3 py-2 rounded cursor-pointer text-blue-600 hover:text-blue-800 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Assistência Técnica</span>
              </LocalizedClientLink>
              
              <div className="flex items-center space-x-4">
                {categoriesWithProducts.length > 0 ? (
                  categoriesWithProducts.map((category) => (
                    <div key={category.id} className="relative group">
                      <LocalizedClientLink
                        href={`/categories/${category.handle}`}
                        className="flex items-center space-x-2 hover:bg-gray-100 px-3 py-2 rounded cursor-pointer"
                      >
                        <div className="w-6 h-6 flex items-center justify-center">
                          {getCategoryIcon(category.name)}
                        </div>
                        <span className="font-medium">{category.name}</span>
                        {(category.category_children && category.category_children.length > 0 || category.products && category.products.length > 0) && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </LocalizedClientLink>
                      
                      {/* Submenu */}
                      {((category.products && category.products.length > 0) || (category.category_children && category.category_children.length > 0)) && (
                        <div className="absolute top-full left-0 bg-white text-gray-800 shadow-xl rounded-lg py-4 min-w-96 max-w-4xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                          <div className="px-4 pb-3 border-b border-gray-200">
                            <h3 className="font-semibold text-lg text-gray-900">{category.name}</h3>
                            {category.products && category.products.length > 0 && (
                              <p className="text-sm text-gray-600">Confira nossos produtos em destaque</p>
                            )}
                          </div>
                          
                          {category.products && category.products.length > 0 ? (
                            <div className="p-4">
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                {category.products.slice(0, 6).map((product) => (
                                  <LocalizedClientLink
                                    key={product.id}
                                    href={`/products/${product.handle}`}
                                    className="group/item flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                  >
                                    <div className="w-20 h-20 mb-2 bg-gray-100 rounded-lg overflow-hidden">
                                      {product.thumbnail ? (
                                        <Image
                                          src={product.thumbnail}
                                          alt={product.title}
                                          width={80}
                                          height={80}
                                          className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-200"
                                        />
                                      ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                          <span className="text-gray-400 text-xs">Sem imagem</span>
                                        </div>
                                      )}
                                    </div>
                                    <h4 className="text-xs font-medium text-center text-gray-900 line-clamp-2 group-hover/item:text-blue-600">
                                      {product.title}
                                    </h4>
                                    {product.variants && product.variants[0]?.calculated_price && (
                                      <p className="text-xs text-blue-600 font-semibold mt-1">
                                        R$ {(product.variants[0].calculated_price.calculated_amount / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                      </p>
                                    )}
                                  </LocalizedClientLink>
                                ))}
                              </div>
                              <div className="border-t border-gray-200 pt-3">
                                <LocalizedClientLink
                                  href={`/categories/${category.handle}`}
                                  className="block text-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                                >
                                  Ver todos os produtos de {category.name} →
                                </LocalizedClientLink>
                              </div>
                            </div>
                          ) : (
                            <div className="py-2">
                              {category.category_children?.map((subCategory) => (
                                <LocalizedClientLink
                                  key={subCategory.id}
                                  href={`/categories/${subCategory.handle}`}
                                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                                >
                                  {subCategory.name}
                                </LocalizedClientLink>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <LocalizedClientLink href="/store" className="font-medium hover:text-blue-600">
                    Todos os Produtos
                  </LocalizedClientLink>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>
    </div>
  )
}