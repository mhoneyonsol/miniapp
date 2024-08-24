'use client';

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
  const [emojiPosition, setEmojiPosition] = useState(0);
  const [emojiSize, setEmojiSize] = useState(20);

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
    const newTokenCount = tokenCount + 1;
    setTokenCount(newTokenCount);

    // Update emoji position and size based on token count
    setEmojiPosition(emojiPosition + 5); // Move up 5px per tap
    setEmojiSize(emojiSize + 1.5); // Increase size

    if (newTokenCount >= 100) {
      // Trigger double confetti when 100 taps are reached
      setIsConfettiActive(true);
      setTimeout(() => setIsConfettiActive(false), 1000); // Reset confetti state after 1 second
    }
  };

  return (
    <main
      style={{
        backgroundImage: "url('https://i.giphy.com/xTiTniuHdUjpOlNo1q.webp')",
        position: 'relative' // Ensure the emoji is positioned relative to this container
      }}
      className="flex min-h-screen flex-col items-center justify-center p-24"
    >
      <h1 className="text-4xl font-bold mb-8">$MHONEY Telegram mini-app 😈 - Earn on $TON</h1>
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-2xl font-semibold">Tokens Earned: {tokenCount}</h2>
      </div>
      <button 
        onClick={handleTapToEarn}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mb-8"
      >
        Tap to Earn 😈
      </button>

      {/* Display the moving and growing emoji */}
      <div
        style={{
          position: 'absolute',
          bottom: `${emojiPosition}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: `${emojiSize}px`,
          transition: 'bottom 0.3s, font-size 0.3s', // Smooth transition for movement and size
        }}
      >
        😈
      </div>

      {/* Confetti trigger */}
      {isConfettiActive && (
        <>
          <Confetti active={isConfettiActive} />
          <Confetti active={isConfettiActive} /> {/* Double confetti */}
        </>
      )}

      <ReferralSystem initData={initData} userId={userId} startParam={startParam} />
    </main>
  );
}
