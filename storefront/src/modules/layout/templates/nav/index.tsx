import { Suspense } from "react"
import { 
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
  Heart,
  Utensils,
  Baby,
  Dumbbell,
  Palette,
  Briefcase,
  Gift,
  Zap
} from "lucide-react"

import { listRegions } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"
import { getProductsList } from "@lib/data/products"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Image from "next/image"

// Mapeamento de ícones para categorias
const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase()
  
  if (name.includes('roupa') || name.includes('vestuário') || name.includes('moda')) {
    return <Shirt className="w-4 h-4 text-white" />
  }
  if (name.includes('eletrônico') || name.includes('tecnologia') || name.includes('celular')) {
    return <Smartphone className="w-4 h-4 text-white" />
  }
  if (name.includes('casa') || name.includes('lar') || name.includes('decoração')) {
    return <Home className="w-4 h-4 text-white" />
  }
  if (name.includes('game') || name.includes('jogo') || name.includes('brinquedo')) {
    return <Gamepad2 className="w-4 h-4 text-white" />
  }
  if (name.includes('livro') || name.includes('educação') || name.includes('papelaria')) {
    return <Book className="w-4 h-4 text-white" />
  }
  if (name.includes('auto') || name.includes('carro') || name.includes('veículo')) {
    return <Car className="w-4 h-4 text-white" />
  }
  if (name.includes('saúde') || name.includes('beleza') || name.includes('cosmético')) {
    return <Heart className="w-4 h-4 text-white" />
  }
  if (name.includes('alimentação') || name.includes('comida') || name.includes('bebida')) {
    return <Utensils className="w-4 h-4 text-white" />
  }
  if (name.includes('bebê') || name.includes('infantil') || name.includes('criança')) {
    return <Baby className="w-4 h-4 text-white" />
  }
  if (name.includes('esporte') || name.includes('fitness') || name.includes('academia')) {
    return <Dumbbell className="w-4 h-4 text-white" />
  }
  if (name.includes('arte') || name.includes('artesanato') || name.includes('hobby')) {
    return <Palette className="w-4 h-4 text-white" />
  }
  if (name.includes('escritório') || name.includes('negócio') || name.includes('profissional')) {
    return <Briefcase className="w-4 h-4 text-white" />
  }
  if (name.includes('presente') || name.includes('gift') || name.includes('lembrança')) {
    return <Gift className="w-4 h-4 text-white" />
  }
  
  // Ícone padrão
  return <Zap className="w-4 h-4 text-white" />
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
                <LocalizedClientLink href="/search">
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600">
                    <Search size={20} />
                  </button>
                </LocalizedClientLink>
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
              {categoriesWithProducts.length > 0 ? (
                categoriesWithProducts.map((category) => (
                  <div key={category.id} className="relative group">
                    <LocalizedClientLink
                      href={`/categories/${category.handle}`}
                      className="flex items-center space-x-2 hover:bg-blue-500 px-3 py-2 rounded cursor-pointer"
                    >
                      <div className="w-6 h-6 bg-blue-600 rounded-sm flex items-center justify-center">
                        {getCategoryIcon(category.name)}
                      </div>
                      <span className="font-medium">{translateCategory(category.name)}</span>
                      {category.category_children && category.category_children.length > 0 && (
                        <ChevronDown className="w-4 h-4" />
                      )}
                      {category.products && category.products.length > 0 && (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </LocalizedClientLink>
                    
                    {/* Submenu com produtos */}
                    {category.products && category.products.length > 0 && (
                      <div className="absolute top-full left-0 bg-white text-gray-800 shadow-xl rounded-lg py-4 min-w-96 max-w-4xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <div className="px-4 pb-3 border-b border-gray-200">
                          <h3 className="font-semibold text-lg text-gray-900">{translateCategory(category.name)}</h3>
                          <p className="text-sm text-gray-600">Confira nossos produtos em destaque desta categoria</p>
                        </div>
                        
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
                              Ver todos os produtos de {translateCategory(category.name)} →
                              {translateCategory(subCategory.name)}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Submenu para subcategorias (mantido como estava) */}
                    {category.category_children && category.category_children.length > 0 && !category.products?.length && (
                      <div className="absolute top-full left-0 bg-white text-gray-800 shadow-lg rounded-md py-2 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        {category.category_children.map((subCategory) => (
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
                ))
              ) : (
                // Fallback para quando não há categorias
                <>
                  <div className="flex items-center space-x-3 hover:bg-blue-500 px-3 py-2 rounded cursor-pointer">
                    <div className="w-6 h-6 bg-blue-600 rounded-sm flex items-center justify-center">
                      <ShoppingCart className="w-4 h-4 text-white" />
                    </div>
                    <LocalizedClientLink href="/store" className="font-medium">
                      Todos os Produtos
                    </LocalizedClientLink>
                  </div>
                </>
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