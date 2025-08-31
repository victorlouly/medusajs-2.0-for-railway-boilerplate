"use client"

import { useState, useEffect } from "react"
import { Menu, X, ChevronRight, ChevronDown, Search } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import { HttpTypes } from "@medusajs/types"

type MobileMenuProps = {
  regions: HttpTypes.StoreRegion[]
  categories: any[]
}

const MobileMenu = ({ regions, categories }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  // Fechar menu ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Bloquear scroll quando menu estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  const closeMenu = () => {
    setIsOpen(false)
    setExpandedCategory(null)
  }

  return (
    <>
      {/* Botão hamburger */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
        aria-label="Abrir menu"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={closeMenu}
        />
      )}

      {/* Menu lateral */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header do menu */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Image
            src="/logo.png"
            alt="x4 Logo"
            width={120}
            height={35}
          />
          <button
            onClick={closeMenu}
            className="p-2 text-gray-500 hover:text-gray-700"
            aria-label="Fechar menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Conteúdo do menu */}
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Barra de busca mobile */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="O que você procura?"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <LocalizedClientLink href="/search" onClick={closeMenu}>
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600">
                  <Search size={20} />
                </button>
              </LocalizedClientLink>
            </div>
          </div>

          {/* Links principais */}
          <div className="p-4 space-y-4">
            <LocalizedClientLink 
              href="/assistencia" 
              onClick={closeMenu}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-blue-600 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Assistência Técnica</span>
            </LocalizedClientLink>

            <LocalizedClientLink 
              href="/wishlist" 
              onClick={closeMenu}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>Lista de Desejos</span>
            </LocalizedClientLink>
          </div>

          {/* Categorias */}
          <div className="border-t border-gray-200">
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Categorias</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id}>
                    <div className="flex items-center justify-between">
                      <LocalizedClientLink
                        href={`/categories/${category.handle}`}
                        onClick={closeMenu}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 flex-1"
                      >
                        <div className="w-6 h-6 flex items-center justify-center text-gray-600">
                          {getCategoryIcon(category.name)}
                        </div>
                        <span className="font-medium text-gray-900">{category.name}</span>
                      </LocalizedClientLink>
                      
                      {category.products && category.products.length > 0 && (
                        <button
                          onClick={() => toggleCategory(category.id)}
                          className="p-2 text-gray-400 hover:text-gray-600"
                        >
                          {expandedCategory === category.id ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Produtos da categoria expandida */}
                    {expandedCategory === category.id && category.products && (
                      <div className="ml-6 mt-2 space-y-2 border-l border-gray-200 pl-4">
                        {category.products.slice(0, 4).map((product) => (
                          <LocalizedClientLink
                            key={product.id}
                            href={`/products/${product.handle}`}
                            onClick={closeMenu}
                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                          >
                            <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                              {product.thumbnail ? (
                                <Image
                                  src={product.thumbnail}
                                  alt={product.title}
                                  width={40}
                                  height={40}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-gray-400 text-xs">?</span>
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-900 truncate">
                                {product.title}
                              </h4>
                              {product.variants && product.variants[0]?.calculated_price && (
                                <p className="text-xs text-blue-600 font-semibold">
                                  R$ {(product.variants[0].calculated_price.calculated_amount / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </p>
                              )}
                            </div>
                          </LocalizedClientLink>
                        ))}
                        <LocalizedClientLink
                          href={`/categories/${category.handle}`}
                          onClick={closeMenu}
                          className="block text-center text-blue-600 hover:text-blue-800 font-medium text-sm p-2"
                        >
                          Ver todos →
                        </LocalizedClientLink>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Links do rodapé */}
          <div className="mt-auto border-t border-gray-200 p-4 space-y-3">
            <LocalizedClientLink 
              href="/store" 
              onClick={closeMenu}
              className="block p-3 text-center bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Ver Todos os Produtos
            </LocalizedClientLink>
            
            <LocalizedClientLink 
              href="/account" 
              onClick={closeMenu}
              className="block p-3 text-center border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Minha Conta
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </>
  )
}

// Função auxiliar para ícones (duplicada aqui para evitar dependências)
const getCategoryIcon = (categoryName: string) => {
  const iconMap: Record<string, JSX.Element> = {
    'Produtos Apple': <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>,
    'Notebooks': <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    'Celulares': <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
    'Lotes': <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
    'Outros Produtos': <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
  }
  
  return iconMap[categoryName] || <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
}

export default MobileMenu