"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { clx } from "@medusajs/ui"

const banners = [
  {
    id: 1,
    image: "/banner1.png",
    alt: "Banner promocional 1",
    title: "Ofertas Especiais",
    subtitle: "Até 50% de desconto em produtos selecionados",
    link: "/store"
  },
  {
    id: 2,
    image: "/banner1.png", // Usando a mesma imagem como exemplo
    alt: "Banner promocional 2", 
    title: "Novidades",
    subtitle: "Confira os últimos lançamentos",
    link: "/store"
  },
  {
    id: 3,
    image: "/banner1.png", // Usando a mesma imagem como exemplo
    alt: "Banner promocional 3",
    title: "Frete Grátis",
    subtitle: "Em compras acima de R$ 199",
    link: "/store"
  }
]

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000) // Muda a cada 5 segundos

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  const handleMouseEnter = () => {
    setIsAutoPlaying(false)
  }

  const handleMouseLeave = () => {
    setIsAutoPlaying(true)
  }

  return (
    <div 
      className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden bg-gray-100"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div key={banner.id} className="min-w-full h-full relative">
            <Image
              src={banner.image}
              alt={banner.alt}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
            
            {/* Overlay com gradiente */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
            
            {/* Conteúdo do banner */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-6 lg:px-8">
                <div className="max-w-lg text-white">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    {banner.title}
                  </h2>
                  <p className="text-lg md:text-xl mb-6 opacity-90">
                    {banner.subtitle}
                  </p>
                  <a
                    href={banner.link}
                    className="inline-block bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
                  >
                    Ver Ofertas
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botões de navegação */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
        aria-label="Banner anterior"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
        aria-label="Próximo banner"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={clx(
              "w-3 h-3 rounded-full transition-all duration-200",
              {
                "bg-white": index === currentSlide,
                "bg-white/50 hover:bg-white/70": index !== currentSlide,
              }
            )}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Indicador de progresso */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div 
          className="h-full bg-white transition-all duration-100 ease-linear"
          style={{ 
            width: isAutoPlaying ? `${((currentSlide + 1) / banners.length) * 100}%` : '0%'
          }}
        />
      </div>
    </div>
  )
}

export default BannerCarousel