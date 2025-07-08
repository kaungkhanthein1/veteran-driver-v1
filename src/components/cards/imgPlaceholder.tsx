import { useEffect, useRef, useState } from "react";
import "./card.css";

type ImageWithPlaceholderProps = {
  src: string;
  alt: string;
  className: string;
  width: any;
  height: any;
};

const ImageWithPlaceholder = ({
  src,
  alt,
  className,
  width,
  height,
  ...props
}: ImageWithPlaceholderProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [decryptedSrc, setDecryptedSrc] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            try {
              if (imgRef.current) {
                imgRef.current.onload = () => {
                  URL.revokeObjectURL(src); // revoke after image is loaded
                };
              }
              setDecryptedSrc(src);
            } catch (error) {
              console.error("Error decrypting image:", error);
            }
            observer.disconnect();
          }
        }
      },
      {
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      className={`image-container_exp bg-gray-100 relative ${className}`}
      style={{ width, height }}
    >
      <img
        ref={imgRef}
        src={decryptedSrc || ""}
        alt={alt}
        className={`${className} image-placeholder`}
        {...props}
        style={{
          opacity: decryptedSrc ? "1" : "0",
          transition: "opacity 0.3s ease-in-out",
        }}
      />
    </div>
  );
};

export default ImageWithPlaceholder;
