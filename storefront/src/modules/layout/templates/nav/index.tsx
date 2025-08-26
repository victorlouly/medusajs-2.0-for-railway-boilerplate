import { Suspense } from "react"
import { 
  revalidateTag,
  Search, 
  User, 
  ShoppingCart, 
  Phone, 
  MapPin, 
  ChevronDown,
  Shirt,
  Smartphone,
  Home,
  Gamepad2,
  Book,
  Car,
  Apple,
  Laptop,
  Package,
  ShoppingBag,
  Monitor,
  Utensils,
  Baby,
  Dumbbell,
  Palette,
  Briefcase,
  Gift,
  Zap,
  Heart // Ícone de favoritos
} from "lucide-react"

import { listRegions } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"
import { getProductsList } from "@lib/data/products"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Image from "next/image"

// Mapeamento de ícones para categorias (sem cor explícita para herdar do pai)
const getCategoryIcon = (categoryName: string) => {
  // Mapeamento específico baseado nos nomes exatos das categorias do admin
  const iconMap: Record<string, JSX.Element> = {
    'Produtos Apple': <Apple className="w-4 h-4" />,
    'Notebooks': <Laptop className="w-4 h-4" />,
    'Celulares': <Smartphone className="w-4 h-4" />,
    'Lotes': <Package className="w-4 h-4" />,
    'Outros Produtos': <ShoppingBag className="w-4 h-4" />,
  }
  
  // Retorna o ícone específico ou um ícone padrão
  return iconMap[categoryName] || <ShoppingCart className="w-4 h-4" />
}

// Função para revalidar o cache das categorias
const revalidateCategories = async () => {
  try {
    await fetch('/api/revalidate?tag=categories', { method: 'POST' })
  } catch (error) {
    console.error('Erro ao revalidar categorias:', error)
  }
}
  
// Tradução de categorias para português (caso venham em inglês)
const translateCategory = (categoryName: string) => {
  const translations: Record<string, string> = {
    'clothing': 'Roupas e Moda',
    'electronics': 'Eletrônicos',
    'home': 'Casa e Decoração',
    'books': 'Livros e Educação',
    'sports': 'Esportes e Fitness',
    'beauty': 'Saúde e Beleza',
    'toys': 'Brinquedos e Games',
    'automotive': 'Automotivo',
    'food': 'Alimentação',
    'baby': 'Bebês e Crianças',
    'office': 'Escritório e Negócios',
    'art': 'Arte e Artesanato',
    'gifts': 'Presentes e Lembranças'
  }
  
  const lowerName = categoryName.toLowerCase()
  for (const [key, value] of Object.entries(translations)) {
    if (lowerName.includes(key)) {
      return value
    }
  }
  
  // Retorna o nome original se não encontrar tradução
  return categoryName
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
          limit: 6 // Limitar a 6 produtos por categoria
        },
        countryCode: 'us' // Usar um país padrão
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
      <div className="bg-blue-900 text-white text-center py-2 text-sm">
        PAGANDO COM PIX VOCÊ GANHA 10% EM DESCONTO
      </div>

      {/* Header principal */}
      <header className="relative bg-white border-b duration-200 border-ui-border-base">
        <div className="content-container">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <LocalizedClientLink href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="OTH Produtos Logo"
                  width={160}
                  height={45}
                  priority
                />
              </LocalizedClientLink>
            </div>

            {/* Barra de busca central */}
            <div className="flex-1 max-w-xl mx-4 md:mx-8">
              <div className="relative">
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

            {/* Ícones de Ação (Favoritos, Login, Carrinho) */}
            <div className="flex items-center space-x-4 md:space-x-6">
              {/* Favoritos */}
              <LocalizedClientLink href="/wishlist" className="flex flex-col items-center text-blue-400 hover:text-blue-600">
                <Heart size={24} />
                <span className="hidden sm:block text-xs mt-1">Favoritos</span>
              </LocalizedClientLink>

              {/* Login/Cadastro */}
              <LocalizedClientLink href="/account" className="flex flex-col items-center text-blue-400 hover:text-blue-600">
                <User size={24} />
                <span className="hidden sm:block text-xs mt-1">Login</span>
              </LocalizedClientLink>

              {/* Carrinho */}
              <div className="relative text-blue-400 hover:text-blue-600">
                <Suspense
                  fallback={
                    <LocalizedClientLink
                      className="flex flex-col items-center"
                      href="/cart"
                      data-testid="nav-cart-link"
                    >
                      <ShoppingCart size={24} />
                       <span className="hidden sm:block text-xs mt-1">Carrinho</span>
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

        {/* Navegação por categorias (revertido ao estado anterior) */}
        <div className="bg-white text-black border-b border-t">
          <div className="content-container">
            <nav className="flex items-center justify-between py-3">
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
                        <ChevronDown className="w-4 h-4" />
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