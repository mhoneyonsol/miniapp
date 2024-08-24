'use client';

import { useEffect, useState } from 'react';
import { TonConnect } from '@tonconnect/sdk';
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
  const [walletAddress, setWalletAddress] = useState<string>(''); // State for wallet address
  const [walletConnected, setWalletConnected] = useState<boolean>(false); // State to track wallet connection

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

    // Trigger button click effect
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

  const handleConnectWallet = async () => {
    try {
      // Initialize TON Connect
      const tonConnect = new TonConnect({
        // Define your configuration here
        bridgeUrl: 'https://bridge.ton.org', // Example bridge URL
      });

      // Request wallet connection
      const result = await tonConnect.request({
        method: 'ton_requestAccounts', // Request accounts method
      });

      // Check if connection was successful
      if (result && result.accounts && result.accounts.length > 0) {
        const walletAddress = result.accounts[0].address;
        setWalletAddress(walletAddress);
        setWalletConnected(true);
      } else {
        console.error('Failed to retrieve wallet address.');
      }
    } catch (error) {
      console.error('Failed to connect to TON wallet:', error);
    }
  };

  return (
    <main
      style={{
        background
