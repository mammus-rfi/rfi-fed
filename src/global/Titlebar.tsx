'use client';

import { JSX, useEffect, useState } from 'react';
import Image from 'next/image';
import { getCurrentWindow, type Window } from '@tauri-apps/api/window';

export default function Titlebar(): JSX.Element {
  const [window, setWindow] = useState<Window | null>(null);

  useEffect(() => {
    if (!window) {
      setWindow(getCurrentWindow());
    }

    if (window) {
      document
        .getElementById('titlebar-minimize')
        ?.addEventListener('click', () => window.minimize());
      document
        .getElementById('titlebar-maximize')
        ?.addEventListener('click', () => window.toggleMaximize());
      document
        .getElementById('titlebar-close')
        ?.addEventListener('click', () => window.close());
    }
  }, [window]);

  return (
    <div
      data-tauri-drag-region
      className='h-8 bg-primary select-none flex justify-end fixed top-0 left-0 right-0 '
    >
      <div
        className='titlebar-button transition-all duration-200'
        id='titlebar-minimize'
      >
        <Image
          src='https://api.iconify.design/mdi:window-minimize.svg'
          width={30}
          height={30}
          alt='minimize'
        />
      </div>
      <div
        className='titlebar-button transition-all duration-200'
        id='titlebar-maximize'
      >
        <Image
          src='https://api.iconify.design/mdi:window-maximize.svg'
          width={30}
          height={30}
          alt='maximize'
        />
      </div>
      <div
        className='titlebar-button transition-all duration-200'
        id='titlebar-close'
      >
        <Image
          src='https://api.iconify.design/mdi:close.svg'
          width={30}
          height={30}
          alt='close'
        />
      </div>
    </div>
  );
}
