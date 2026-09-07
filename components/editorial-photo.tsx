import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { EditorialImage } from '@/lib/site-config';

export function EditorialPhoto({ image, className = '', priority = false }: { image: EditorialImage; className?: string; priority?: boolean }) {
  return (
    <figure className={`editorial-photo ${className}`.trim()}>
      <div className="editorial-photo-frame">
        <Image src={image.src} width={image.width} height={image.height} alt={image.alt} priority={priority} unoptimized sizes="(max-width: 760px) 92vw, (max-width: 1180px) 48vw, 38vw" style={{ '--photo-focus': image.focalPoint } as CSSProperties} />
      </div>
      <figcaption><span aria-hidden="true" />{image.caption}</figcaption>
    </figure>
  );
}
