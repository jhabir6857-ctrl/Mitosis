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
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        {title && (
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl drop-shadow mb-6">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
