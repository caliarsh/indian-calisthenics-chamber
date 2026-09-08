import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { ImageBrief } from '@/lib/site-config';

export interface EditorialImageProps {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  focalPosition?: string;
  className?: string;
  sizes?: string;
}

export function EditorialImage({ src, alt, caption, width, height, focalPosition = '50% 50%', className = '', sizes = '(max-width: 900px) 100vw, 50vw' }: EditorialImageProps) {
  return (
    <figure className={`editorial-photo ${className}`.trim()} style={{ '--photo-focus': focalPosition } as CSSProperties}>
      <div className="editorial-photo-frame">
        <Image src={src} alt={alt} width={width} height={height} sizes={sizes} unoptimized />
      </div>
      <figcaption><span aria-hidden="true" />{caption}</figcaption>
    </figure>
  );
}

export function ImagePlaceholder({ brief, className = '' }: { brief: ImageBrief; className?: string }) {
  return (
    <figure className={`editorial-photo image-placeholder ${className}`.trim()}>
      <div className="editorial-photo-frame">
        <span className="image-placeholder-index" aria-hidden="true">PHOTO</span>
        <ImageIcon aria-hidden="true" />
        <div><strong>{brief.label}</strong><p>{brief.description}</p><small>{brief.orientation}</small></div>
      </div>
      <figcaption><span aria-hidden="true" />Image to be supplied</figcaption>
    </figure>
  );
}
