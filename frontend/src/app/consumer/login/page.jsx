// app/consumer/login/page.jsx
'use client';

import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import { loginConsumer } from '../../../lib/api/consumer';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await loginConsumer({ email, password });
      const token = res.headers['authorization'];
      localStorage.setItem('consumerToken', token);

      // router.push('/consumer/home');
    } catch (err) {
      setError('ログインに失敗しました。');
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Consumer ログイン</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
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
  );
};

export default Page;
