'use client'

import { useState, useEffect } from 'react'

export default function BouncingBall() {
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [velocity, setVelocity] = useState({ x: 2, y: 2 })

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        let newX = prev.x + velocity.x
        let newY = prev.y + velocity.y

        if (newX >= 100 || newX <= 0) {
          setVelocity((v) => ({ ...v, x: -v.x }))
          newX = Math.max(0, Math.min(100, newX))
        }
        if (newY >= 100 || newY <= 0) {
          setVelocity((v) => ({ ...v, y: -v.y }))
          newY = Math.max(0, Math.min(100, newY))
        }

        return { x: newX, y: newY }
      })
    }, 16)

    return () => clearInterval(interval)
  }, [velocity])

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="relative w-full max-w-2xl h-96 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div
          className="absolute w-8 h-8 bg-blue-500 rounded-full transition-all duration-75"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
    </div>
  )
}

