import { defineWidgetConfig } from "@medusajs/admin-shared"
import { useEffect } from "react"

// Widget specifically for replacing page titles and document title
const TitleReplacerWidget = () => {
  useEffect(() => {
    // Replace document title
    const updateDocumentTitle = () => {
      if (document.title.includes('Medusa')) {
        document.title = document.title.replace(/Medusa/g, 'Orbit')
      }
    }

    // Initial title update
    updateDocumentTitle()

    // Monitor title changes
    const titleObserver = new MutationObserver(() => {
      updateDocumentTitle()
    })

    const titleElement = document.querySelector('title')
    if (titleElement) {
      titleObserver.observe(titleElement, {
        childList: true,
        characterData: true
      })
    }

    // Replace text content in headings and titles
    const replaceHeadings = () => {
      const headingSelectors = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', '[role="heading"]']
      
      headingSelectors.forEach(selector => {
        const headings = document.querySelectorAll(selector)
        headings.forEach(heading => {
          if (heading.textContent?.includes('Medusa')) {
            heading.textContent = heading.textContent.replace(/Medusa/g, 'Orbit')
          }
        })
      })
    }

    // Initial heading replacement
    replaceHeadings()

    // Set up observer for dynamic headings
    const headingObserver = new MutationObserver(() => {
      replaceHeadings()
    })

    headingObserver.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    })

    return () => {
      titleObserver.disconnect()
      headingObserver.disconnect()
    }
  }, [])

  return null
}

export const config = defineWidgetConfig({
  zone: "product.list.before",
})

export default TitleReplacerWidget