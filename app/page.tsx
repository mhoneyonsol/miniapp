'use client';

import { useEffect, useState } from 'react';
import './styles.css';

export default function Home() {
  const [tokenCount, setTokenCount] = useState<number>(0);

  useEffect(() => {
    const initWebApp = async () => {
      if (typeof window !== 'undefined') {
        const WebApp = (await import('@twa-dev/sdk')).default;
        WebApp.ready();

        // Retrieve token count from cloud storage
        const savedTokenCount = await getFromCloudStorage('tokenCount');
        if (savedTokenCount !== undefined) {
          setTokenCount(Number(savedTokenCount));
        }
      }
    };

    initWebApp();
  }, []);

  const handleTapToEarn = () => {
    const newTokenCount = tokenCount + 1;
    setTokenCount(newTokenCount);
    saveToCloudStorage('tokenCount', newTokenCount.toString());
  };

  

  const saveToCloudStorage = async (key: string, value: any): Promise<void> => {
  try {
    const WebApp = (await import('@twa-dev/sdk')).default;
    await WebApp.storage.set({ [key]: value });
  } catch (error) {
    console.error('Failed to save to cloud storage:', error);
  }
};


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Tap to Earn Tokens</h1>
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-2xl font-semibold">Tokens Earned: {tokenCount}</h2>
      </div>
      <button onClick={handleTapToEarn} className="button">
        Tap to Earn
      </button>
    </main>
  );
}
