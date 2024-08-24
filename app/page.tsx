'use client';

import ReferralSystem from '@/components/ReferralSystem';
import { useEffect, useState } from 'react';
import Confetti from 'react-dom-confetti';
import './styles.css';

export default function Home() {
  const [initData, setInitData] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [startParam, setStartParam] = useState<string>('');
  const [tokenCount, setTokenCount] = useState<number>(0);
  const [isConfettiActive, setIsConfettiActive] = useState<boolean>(false);
  const [emojiPosition, setEmojiPosition] = useState<number>(0);
  const [emojiSize, setEmojiSize] = useState<number>(20);
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);

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

    // Trigger button click effect
    setButtonClicked(true);
    setTimeout(() => setButtonClicked(false), 500); // Match duration of animation

    // Check if the emoji has reached the top of the page
    if (emojiPosition >= window.innerHeight - 100) {
      // Trigger explosion (confetti) when emoji reaches the top
      setIsConfettiActive(true);

      // Scale up the emoji to cover nearly the entire screen
      setEmojiSize(200); // Adjust size as needed
      setEmojiPosition(0); // Set position to top

      // Hide confetti after some time
      setTimeout(() => setIsConfettiActive(false), 500); // Adjust duration if needed
    } else {
      // Move emoji up and increase its size
      setEmojiPosition(emojiPosition + 10); // Move up 10px per tap
      setEmojiSize(emojiSize + 2); // Increase size
    }
  };

  return (
    <main
      style={{
        backgroundImage: "url('https://i.giphy.com/xTiTniuHdUjpOlNo1q.webp')",
        position: 'relative' // Make the main container relative
      }}
      className="flex min-h-screen flex-col items-center justify-center p-24"
    >
      <h1 className="text-4xl font-bold mb-8 z-10"> {/* Ensure the title is above the emoji */}
        $MHONEY Telegram mini-app 😈 - Earn on $TON
      </h1>
      <div className="flex items-center justify-center mb-4 z-10"> {/* Ensure this div is also above the emoji */}
        <h2 className="text-2xl font-semibold">Tokens Earned: {tokenCount}</h2>
      </div>
      <button 
        onClick={handleTapToEarn}
        className={`bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mb-8 ${buttonClicked ? 'button-click' : ''}`}
      >
        Tap to Earn 😈
      </button>

      {/* Display the moving and growing emoji */}
      <div
        className="emoji-large"
        style={{
          fontSize: `${emojiSize}px`,
          transform: `translateX(-50%) scale(${emojiSize / 20})`, // Adjust scaling based on emoji size
        }}
      >
        😈
      </div>

      {/* Confetti trigger */}
      <Confetti active={isConfettiActive} />
      <Confetti active={isConfettiActive} /> {/* Double confetti */}

      <ReferralSystem initData={initData} userId={userId} startParam={startParam} />
    </main>
  );
}
