import { defineWidgetConfig } from "@medusajs/admin-shared"
import { useEffect } from "react"

// Widget to customize admin branding
const BrandingWidget = () => {
  useEffect(() => {
    // Replace Medusa text with Orbit throughout the admin
    const replaceText = () => {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null
      )

      const textNodes: Text[] = []
      let node: Text | null

      while (node = walker.nextNode() as Text) {
        if (node.textContent?.includes('Medusa')) {
          textNodes.push(node)
        }
      }

      textNodes.forEach(textNode => {
        if (textNode.textContent) {
          textNode.textContent = textNode.textContent.replace(/Medusa/g, 'Orbit')
        }
      })
    }

    // Replace text on initial load
    replaceText()

    // Set up observer to replace text when new content is added
    const observer = new MutationObserver(() => {
      replaceText()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    // Replace logo images
    const replaceLogo = () => {
      const logoImages = document.querySelectorAll('img[alt*="Medusa"], img[src*="medusa"]')
      logoImages.forEach((img: Element) => {
        const imgElement = img as HTMLImageElement
        imgElement.src = '/ad1a6871-7620-480e-9bf6-2c3cb23c0b13.png'
        imgElement.alt = 'Orbit'
        imgElement.style.maxHeight = '40px'
        imgElement.style.width = 'auto'
      })
    }

    // Replace logos on initial load
    replaceLogo()

    // Set up observer for logo replacement
    const logoObserver = new MutationObserver(() => {
      replaceLogo()
    })

    logoObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src']
    })

    return () => {
      observer.disconnect()
      logoObserver.disconnect()
    }
  }, [])

  return null // This widget doesn't render anything visible
}

// Widget configuration - inject into the header area
export const config = defineWidgetConfig({
  zone: "product.list.before", // This will load early in the admin
})

export default BrandingWidget