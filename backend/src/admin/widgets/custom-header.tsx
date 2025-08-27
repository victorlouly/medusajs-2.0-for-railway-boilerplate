import { defineWidgetConfig } from "@medusajs/admin-shared"
import { useEffect } from "react"

// Custom header widget to inject Orbit branding
const CustomHeaderWidget = () => {
  useEffect(() => {
    // Add custom CSS for branding
    const style = document.createElement('style')
    style.textContent = `
      /* Custom Orbit branding styles */
      .orbit-logo {
        max-height: 40px !important;
        width: auto !important;
      }
      
      /* Hide original Medusa branding when possible */
      [alt*="Medusa"]:not(.orbit-logo) {
        display: none !important;
      }
      
      /* Custom header styling */
      .orbit-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 0;
      }
      
      .orbit-title {
        font-size: 24px;
        font-weight: bold;
        color: #1f2937;
        margin: 0;
      }
    `
    document.head.appendChild(style)

    // Function to inject Orbit branding
    const injectOrbitBranding = () => {
      // Look for header areas and navigation
      const headerSelectors = [
        'header',
        '[role="banner"]',
        'nav',
        '.medusa-header',
        '[data-testid="header"]'
      ]

      headerSelectors.forEach(selector => {
        const headers = document.querySelectorAll(selector)
        headers.forEach(header => {
          // Check if we already added Orbit branding
          if (header.querySelector('.orbit-branding')) return

          // Create Orbit branding element
          const orbitBranding = document.createElement('div')
          orbitBranding.className = 'orbit-branding orbit-header'
          orbitBranding.innerHTML = `
            <img src="/ad1a6871-7620-480e-9bf6-2c3cb23c0b13.png" alt="Orbit" class="orbit-logo" />
            <h1 class="orbit-title">Orbit</h1>
          `

          // Try to replace existing logo/title or prepend
          const existingLogo = header.querySelector('img, svg')
          if (existingLogo) {
            existingLogo.parentNode?.replaceChild(orbitBranding, existingLogo)
          } else {
            header.prepend(orbitBranding)
          }
        })
      })
    }

    // Initial injection
    setTimeout(injectOrbitBranding, 100)

    // Set up observer for dynamic content
    const observer = new MutationObserver(() => {
      injectOrbitBranding()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return null
}

export const config = defineWidgetConfig({
  zone: "product.list.before",
})

export default CustomHeaderWidget