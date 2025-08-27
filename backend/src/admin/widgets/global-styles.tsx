import { defineWidgetConfig } from "@medusajs/admin-shared"
import { useEffect } from "react"

// Widget to inject global styles for Orbit branding
const GlobalStylesWidget = () => {
  useEffect(() => {
    const globalStyles = document.createElement('style')
    globalStyles.id = 'orbit-global-styles'
    globalStyles.textContent = `
      /* Orbit Global Branding Styles */
      
      /* Logo styling */
      .orbit-logo,
      img[src*="ad1a6871-7620-480e-9bf6-2c3cb23c0b13.png"] {
        max-height: 40px !important;
        width: auto !important;
        object-fit: contain !important;
      }
      
      /* Hide Medusa logos */
      img[src*="medusa"],
      img[alt*="Medusa"]:not([src*="ad1a6871-7620-480e-9bf6-2c3cb23c0b13.png"]) {
        display: none !important;
      }
      
      /* Orbit branding container */
      .orbit-branding {
        display: flex !important;
        align-items: center !important;
        gap: 12px !important;
      }
      
      /* Orbit title styling */
      .orbit-title {
        font-size: 20px !important;
        font-weight: 600 !important;
        color: #1f2937 !important;
        margin: 0 !important;
        line-height: 1.2 !important;
      }
      
      /* Navigation and header adjustments */
      nav .orbit-branding,
      header .orbit-branding {
        padding: 8px 0 !important;
      }
      
      /* Sidebar branding */
      aside .orbit-branding {
        padding: 16px !important;
        border-bottom: 1px solid #e5e7eb !important;
        margin-bottom: 16px !important;
      }
      
      /* Login page branding */
      .login-container .orbit-branding,
      [data-testid="login"] .orbit-branding {
        justify-content: center !important;
        margin-bottom: 24px !important;
      }
      
      .login-container .orbit-title,
      [data-testid="login"] .orbit-title {
        font-size: 28px !important;
      }
    `
    
    // Remove existing styles if they exist
    const existingStyles = document.getElementById('orbit-global-styles')
    if (existingStyles) {
      existingStyles.remove()
    }
    
    document.head.appendChild(globalStyles)

    return () => {
      const styles = document.getElementById('orbit-global-styles')
      if (styles) {
        styles.remove()
      }
    }
  }, [])

  return null
}

export const config = defineWidgetConfig({
  zone: "product.list.before",
})

export default GlobalStylesWidget