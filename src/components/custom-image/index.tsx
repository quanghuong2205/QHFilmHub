'use client';

import Image from 'next/legacy/image';
import { useState } from 'react';

interface CustomImageProps {
  src: string;
  alt: string;
  loading?: 'eager' | 'lazy';
  priority?: boolean;
  className?: string;
  objectFit?: 'cover' | 'contain';
  objectPosition?: 'center' | 'top' | 'bottom';
}

function CustomImage({
  src,
  alt,
  loading,
  priority,
  className,
  objectFit,
  objectPosition,
}: CustomImageProps) {
  const [finalSrc, setFinalSrc] = useState(src);

  const handleError = () => {
    setFinalSrc('/img/fail-to-load.png');
  };

  return (
    <Image
      src={finalSrc}
      alt={alt}
      layout='fill'
      placeholder='blur'
      blurDataURL='/img/card-a.jpeg'
      onError={handleError}
      loading={loading}
      priority={priority}
      className={className}
      objectFit={objectFit ?? 'cover'}
      objectPosition={objectPosition ?? 'center'}
    />
  );
}

export default CustomImage;
