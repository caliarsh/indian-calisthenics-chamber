'use client';

import { useEffect } from 'react';
import { captureFirstTouch } from '@/lib/crm-client';

export function AttributionTracker() {
  useEffect(() => captureFirstTouch(), []);
  return null;
}

