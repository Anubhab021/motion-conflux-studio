"use client";

import { useEffect, useRef } from "react";
import { TbX, TbChevronLeft, TbChevronRight } from "react-icons/tb";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  media: {
    src: string;
    alt: string;
    type: "image" | "video";
  };
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

export default function Lightbox({
  isOpen,
  onClose,
  media,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}: LightboxProps) {
  const lightboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      lightboxRef.current?.focus();
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return;
      
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          if (hasPrevious) onPrevious?.();
          break;
        case "ArrowRight":
          if (hasNext) onNext?.();
          break;
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onPrevious, onNext, hasPrevious, hasNext]);

  if (!isOpen) return null;

  return (
    <div
      ref={lightboxRef}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Media lightbox"
      tabIndex={-1}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
          aria-label="Close lightbox"
        >
          <TbX size={24} />
        </button>

        {/* Navigation buttons */}
        {hasPrevious && (
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            aria-label="Previous media"
          >
            <TbChevronLeft size={24} />
          </button>
        )}

        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            aria-label="Next media"
          >
            <TbChevronRight size={24} />
          </button>
        )}

        {/* Media content */}
        <div className="flex items-center justify-center h-full">
          {media.type === "image" ? (
            <img
              src={media.src}
              alt={media.alt}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <video
              src={media.src}
              controls
              className="max-w-full max-h-full"
              aria-label={media.alt}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </div>
  );
}
