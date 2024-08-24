'use client'

import ReferralSystem from '@/components/ReferralSystem';
import { useEffect, useState } from 'react';
import Confetti from 'react-dom-confetti';
import './styles.css';

export default function Home() {
  const [initData, setInitData] = useState('');
  const [userId, setUserId] = useState('');
  const [startParam, setStartParam] = useState('');
  const [tokenCount, setTokenCount] = useState(0);
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  useEffect(() => {
    const initWebApp = async () => {
      if (typeof window !== 'undefined') {
        const WebApp = (await import('@twa-dev/sdk')).default;
        WebApp.ready();
        setInitData(WebApp.initData);
        setUserId(WebApp.initDataUnsafe.user?.id.toString() || '');
        setStartParam(WebApp.initDataUnsafe.start_param || '');
      }
    };

    initWebApp();
  }, []);

  const handleTapToEarn = () => {
    setTokenCount(tokenCount + 1); // Increase token count by 1
    setIsConfettiActive(true); // Trigger confetti

    // Reset confetti state to allow repeated activations
    setTimeout(() => setIsConfettiActive(false), 500);
  };

  return (
    <main
      style={{
        backgroundImage: "url('https://i.giphy.com/xTiTniuHdUjpOlNo1q.webp')"
      }}
      className="flex min-h-screen flex-col items-center justify-center p-24"
    >
      <h1 className="text-4xl font-bold mb-8">$MHONEY TELEGRAM MINI APP - EARN ON $TON</h1>
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-2xl font-semibold">Tokens Earned: {tokenCount}</h2>
      </div>
      <button 
        onClick={handleTapToEarn}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mb-8"
      >
        Tap to Earn
      </button>
      {/* Confetti trigger */}
      <Confetti active={isConfettiActive} />
      <ReferralSystem initData={initData} userId={userId} startParam={startParam} />
    </main>
  );
}
