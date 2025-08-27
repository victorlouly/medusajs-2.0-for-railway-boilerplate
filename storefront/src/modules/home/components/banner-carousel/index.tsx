"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

// ALTERAÇÃO: Adicione a largura (width) e altura (height) da sua imagem de banner.
// Substitua 1600 e 600 pelas dimensões reais da sua imagem.
const banners = [
  {
    id: 1,
    image: "/banner1.png",
    alt: "Banner promocional 1",
    link: "/store",
    width: 1600, 
    height: 600,
  },
  {
    id: 2,
    image: "/banner1.png",
    alt: "Banner promocional 2", 
    link: "/store",
    width: 1600,
    height: 600,
  },
  {
    id: 3,
    image: "/banner1.png",
    alt: "Banner promocional 3",
    link: "/store",
    width: 1600,
    height: 600,
  }
]

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    // ALTERAÇÃO: Removida a altura fixa (h-[...]) e o fundo (bg-gray-100).
    <div className="relative w-full overflow-hidden">
      <div 
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <a 
            key={banner.id} 
            href={banner.link}
            aria-label={banner.alt}
            // ALTERAÇÃO: Apenas min-w-full para a estrutura do carrossel.
            className="min-w-full relative block"
          >
            <Image
              src={banner.image}
              alt={banner.alt}
              // ALTERAÇÃO: Removido o 'fill' e adicionado 'width' e 'height' dinâmicos.
              width={banner.width}
              height={banner.height}
              // ALTERAÇÃO: className para garantir responsividade correta.
              className="w-full h-auto"
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