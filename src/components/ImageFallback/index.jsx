import React, { useState } from 'react';

const ImageWithFallback = ({ src, alt, className, fallbackSrc }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  return (
    <>
      <img
        className={className}
        src={src}
        alt={alt}
        onError={handleError}
        style={{ display: hasError ? 'none' : 'block' }}
      />
      {
        hasError && fallbackSrc && (
          <img src={fallbackSrc}  className={className} alt={alt} />
        )
      }
    </>
  );
};

export default ImageWithFallback;
