'use client'

import { useEffect, useState, useRef } from 'react'

const SenjaWidget = ({ widgetId }: { widgetId: string }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [totalSlides, setTotalSlides] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = `https://widget.senja.io/widget/${widgetId}/platform.js`
    script.async = true
    document.body.appendChild(script)

    const handleSlideChange = (event: CustomEvent) => {
      setCurrentSlide(event.detail.currentSlide)
      setTotalSlides(event.detail.totalSlides)
    }

    window.addEventListener('senja:slideChange', handleSlideChange as EventListener)

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const senjaPagination = containerRef.current?.querySelector('.senja-pagination')
          if (senjaPagination) {
            (senjaPagination as HTMLElement).style.display = 'none'
          }
        }
      })
    })

    if (containerRef.current) {
      observer.observe(containerRef.current, { childList: true, subtree: true })
    }

    return () => {
      document.body.removeChild(script)
      window.removeEventListener('senja:slideChange', handleSlideChange as EventListener)
      observer.disconnect()
    }
  }, [widgetId])

  const handleDotClick = (index: number) => {
    const senjaEmbed = containerRef.current?.querySelector('.senja-embed') as HTMLElement
    if (senjaEmbed) {
      senjaEmbed.dispatchEvent(new CustomEvent('senja:goToSlide', { detail: { index } }))
    }
  }

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center">
      <div 
        className="senja-embed w-[90%]" 
        data-id={widgetId} 
        data-mode="shadow" 
        data-lazyload="false" 
        style={{ display: 'block' }}
      ></div>
      <div className="custom-pagination">
        {[...Array(totalSlides)].map((_, index) => (
          <span
            key={index}
            className={`custom-pagination-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  )
}

export default SenjaWidget
