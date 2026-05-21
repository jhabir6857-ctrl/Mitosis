import React from 'react';

interface ParallaxBannerProps {
  title?: string;
  subtitle?: string;
  imageSrc: string;
  heightClass?: string;
  children?: React.ReactNode;
  overlayClass?: string;
}

export default function ParallaxBanner({
  title,
  subtitle,
  imageSrc,
  heightClass = 'h-[40vh]',
  children,
  overlayClass = 'bg-gradient-to-b from-blue-950/90 to-blue-900/70',
}: ParallaxBannerProps) {
  return (
    <div
      className={`relative w-full bg-fixed bg-cover bg-center bg-no-repeat ${heightClass}`}
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayClass}`}></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center" style={{ paddingTop: "80px" }}>
        {title && (
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4" 
            style={{ 
              color: "#ffffff",
              textShadow: "0 2px 10px rgba(0,0,0,0.4), 0 10px 30px rgba(0,0,0,0.3)"
            }}
          >
            {title}
          </h1>
        )}
        {subtitle && (
          <p 
            className="text-base md:text-lg lg:text-xl font-medium max-w-3xl mb-6 leading-relaxed" 
            style={{ 
              color: "#f8fafc",
              textShadow: "0 2px 8px rgba(0,0,0,0.5)"
            }}
          >
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
