"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface LoadingOverlayProps {
  onComplete?: () => void
  children?: React.ReactNode
}

export function LoadingOverlay({ onComplete, children }: LoadingOverlayProps) {
  const [percentage, setPercentage] = useState(0)
  const [isClipping, setIsClipping] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)

  useEffect(() => {
    // Animate percentage from 0 to 100 over 2 seconds
    const duration = 2000
    const startTime = Date.now()

    const animatePercentage = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const currentPercentage = Math.round(progress * 100)

      setPercentage(currentPercentage)

      if (progress < 1) {
        requestAnimationFrame(animatePercentage)
      } else {
        // Start clipping animation after percentage reaches 100%
        setTimeout(() => {
          setIsClipping(true)

          // Show content and call onComplete after clip animation
          setTimeout(() => {
            setShowContent(true)
            onComplete?.()
            
            // Remove transform styles after transition completes (600ms)
            // This prevents the transform from creating a containing block
            // which breaks fixed positioning (e.g. for the site header)
            setTimeout(() => {
              setIsAnimationComplete(true)
            }, 600)
          }, 400)
        }, 100)
      }
    }

    requestAnimationFrame(animatePercentage)
  }, [onComplete])

  return (
    <>
      {/* Loading Overlay */}
      <div
        className="bg-[#FFFBF5] dark:bg-black text-[#0D9488] dark:text-teal-400 font-sans"
        style={{ 
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99999,
          clipPath: isClipping ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)",
          pointerEvents: isClipping ? "none" : "auto",
          transition: "clip-path 0.4s cubic-bezier(0.85, 0, 0.15, 1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {/* Percentage Counter at bottom-right corner */}
        <div
          style={{
            position: "absolute",
            right: "clamp(1.5rem, 4vw, 4rem)",
            bottom: "clamp(1.5rem, 4vw, 4rem)", 
            fontSize: "clamp(3rem, 10vw, 12rem)",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          {percentage}%
        </div>
      </div>

      {/* Page Content */}
      <div
        style={isAnimationComplete ? undefined : {
          opacity: showContent ? 1 : 0,
          transform: showContent ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {children}
      </div>
    </>
  )
}
