'use client'

import ReferralSystem from '@/components/ReferralSystem'
import { useEffect, useState } from 'react'
import './styles.css';

export default function Home() {
  const [initData, setInitData] = useState('')
  const [userId, setUserId] = useState('')
  const [startParam, setStartParam] = useState('')

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
  }, [])

  return (
 <main


    style="background-image:url(https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXB6ODQ0bW85MGJmOXFjYmpoZTY1Y2Ftd2Z1czhtbGI2ZzFiejE5aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/S8MvAa57UlmQZIhI1D/giphy.webp)"



    className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">$MHONEY TELEGRAM MINI APP - EARN ON $TON</h1>
      <ReferralSystem initData={initData} userId={userId} startParam={startParam} />
    </main>
  )
}