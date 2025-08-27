"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

// Seus banners. O link será usado para tornar a imagem clicável.
const banners = [
  {
    id: 1,
    image: "/banner1.png",
    alt: "Banner promocional 1",
    link: "/store"
  },
  {
    id: 2,
    image: "/banner1.png", // Usando a mesma imagem como exemplo
    alt: "Banner promocional 2", 
    link: "/store"
  },
  {
    id: 3,
    image: "/banner1.png", // Usando a mesma imagem como exemplo
    alt: "Banner promocional 3",
    link: "/store"
  }
]

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // A funcionalidade de auto-play foi mantida
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000) // Muda a cada 5 segundos

    return () => clearInterval(interval)
  }, [])

  return (
    // Adicionado um fundo cinza para preencher o espaço vazio caso a imagem não ocupe 100%
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden bg-gray-100">
      {/* Slides */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner, index) => (
          // O slide agora é um link que envolve a imagem
          <a 
            key={banner.id} 
            href={banner.link}
            aria-label={banner.alt}
            className="min-w-full h-full relative block"
          >
            <Image
              src={banner.image}
              alt={banner.alt}
              fill
              // ALTERADO AQUI: de 'object-cover' para 'object-contain'
              className="object-contain"
              priority={index === 0}
              sizes="100vw"
            />
          </a>
        ))}
      </div>
    </div>
  )
}

export default BannerCarousel