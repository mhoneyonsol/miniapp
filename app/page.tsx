'use client';

import { useEffect, useState } from 'react';
import ReferralSystem from '@/components/ReferralSystem';
import Confetti from 'react-dom-confetti';
import './styles.css';

export default function Home() {
  const [initData, setInitData] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [username, setUsername] = useState<string>('');
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
        setUsername(WebApp.initDataUnsafe.user?.username || '');
      }
    };

    initWebApp();
  }, []);

  const handleTapToEarn = () => {
    const newTokenCount = tokenCount + 1;
    setTokenCount(newTokenCount);
    setButtonClicked(true);
    setTimeout(() => setButtonClicked(false), 500);

    if (emojiPosition >= window.innerHeight - 100) {
      setIsConfettiActive(true);
      setEmojiPosition(0);
      setEmojiSize(20);
    } else {
      setEmojiPosition(emojiPosition + 10);
      setEmojiSize(emojiSize + 4);
    }
  };

  return (
    <main
      style={{
        backgroundImage: "url('https://i.giphy.com/xTiTniuHdUjpOlNo1q.webp')",
        position: 'relative'
      }}
      className="flex min-h-screen flex-col items-center justify-center p-24"
    >
    <div id="ton-connect"></div>

After this tag add a script for tonConnectUI in <body> part of application page:

<script>
    const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: 'https://<YOUR_APP_URL>/tonconnect-manifest.json',
        buttonRootId: 'ton-connect'
    });
</script>
      <div className="absolute top-4 left-4 text-white text-xl font-bold">
        {username ? `Welcome ${username}` : 'Welcome!'}
      </div>

      <div className="token-count">
        {tokenCount}
      </div>

      <h1 className="text-4xl font-bold mb-8">$MHONEY Telegram mini-app 😈 - Earn on $TON</h1>
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-2xl font-semibold">Tokens Earned: {tokenCount}</h2>
      </div>

      <div>
        <button 
          onClick={handleTapToEarn}
          className={`button ${buttonClicked ? 'button-click' : ''}`}
        >
          <svg
            viewBox="0 0 16 16"
            className="bi bi-lightning-charge-fill"
            fill="currentColor"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"
            ></path>
          </svg>
          Tap to Earn 😈
        </button>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: `${emojiPosition}px`,
          left: '90%',
          transform: 'translateX(-50%)',
          fontSize: `${emojiSize}px`,
          transition: 'bottom 0.3s, font-size 0.3s',
        }}
      >
        😈
      </div>

      <Confetti active={isConfettiActive} />
      <Confetti active={isConfettiActive} />

      <ReferralSystem initData={initData} userId={userId} startParam={startParam} />
    </main>
  );
}
