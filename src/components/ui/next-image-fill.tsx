/* eslint-disable react/display-name */
import * as React from 'react';
import Image, { ImageProps } from 'next/image';

export const NextImageFill = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      quality = 75,
      placeholder = 'empty',
      loading = 'lazy',
      alt = 'alt-img',
      ...props
    },
    ref,
  ) => {
    return (
      <Image
        alt={alt}
        ref={ref}
        quality={quality}
        placeholder={placeholder}
        loading={loading}
        style={{ backgroundPosition: 'center', objectFit: 'cover' }}
        sizes="(max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        33vw"
        fill
        {...props}
      />
    );
  },
);
