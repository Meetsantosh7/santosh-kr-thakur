"use client"

import { useEffect, useState } from "react"

interface ClientOnlyProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

// Custom keyframes for animations
const customStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
  .animate-fadeInUp {
    animation: fadeInUp 0.8s ease-out;
  }
  
  .animate-spin-slow {
    animation: spin 3s linear infinite;
  }
  
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 3s ease infinite;
  }
`

export default function ClientOnly({ children, fallback }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    // Add custom styles to document head
    const styleSheet = document.createElement("style")
    styleSheet.type = "text/css"
    styleSheet.innerText = customStyles
    document.head.appendChild(styleSheet)

    // Set mounted after a small delay to show the loader
    const timer = setTimeout(() => {
      setHasMounted(true)
    }, 1500) // Show loader for 1.5 seconds

    return () => {
      clearTimeout(timer)
      // Clean up the style sheet
      document.head.removeChild(styleSheet)
    }
  }, [])

  if (!hasMounted) {
    return fallback || (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center relative overflow-hidden">
        {/* Background animated elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="text-center z-10 animate-fadeInUp">
          {/* Animated logo/icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-t-transparent border-teal-400 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-0 w-20 h-20 border-4 border-r-transparent border-cyan-400 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
              <div className="absolute inset-3 w-14 h-14 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full animate-pulse flex items-center justify-center">
                <span className="text-2xl text-white font-bold">&lt;/&gt;</span>
              </div>
            </div>
          </div>
          
          {/* Name with gradient animation */}
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-teal-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
            Santosh Kumar Thakur
          </h1>
          
          {/* Subtitle with fade animation */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            Full Stack Developer
          </p>
          
          {/* Loading bar with gradient */}
          <div className="w-64 mx-auto mb-6 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-teal-500 via-cyan-500 to-purple-500 rounded-full animate-gradient" style={{ width: '100%' }}></div>
            </div>
          </div>
          
          {/* Loading text */}
          <p className="text-sm text-gray-400 animate-pulse">
            Loading portfolio...
          </p>
          
          {/* Floating dots */}
          <div className="flex justify-center space-x-2 mt-4">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
