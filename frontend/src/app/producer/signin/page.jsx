'use client';

import { useState } from 'react';
import { signInProducer } from '../../../lib/api/producer';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await signInProducer({ email, password });
      const authHeader = res.headers['authorization'];
      const raw = authHeader?.replace(/^Bearer\s+/i, '');
      if (!raw) {
        throw new Error('トークン取得失敗');
      }
      localStorage.setItem('producerToken', raw);

      router.push('/producer/dashboard');
    } catch (err) {
      setError('ログインに失敗しました');
      console.error(err);
    }
  };

  return (
    <>
      <div className="p-4 max-w-md max-auto">
        <h1 className="text-xl font-bold mb-4">Producer ログイン</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSignIn} className="space-y-4">
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            ログイン
          </button>
        </form>
      </div>
    </>
  );
};

export default Page;
