import { ImageIcon } from 'lucide-react';
import type { ImageBrief } from '@/lib/site-config';

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
