// app/consumer/signup/page.jsx
'use client';

import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import { registerConsumer } from '../../../lib/api/consumer';

export default function ConsumerSignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  // const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await registerConsumer({ email, password, passwordConfirmation });

      const token = res.headers['authorization'];
      localStorage.setItem('consumerToken', token);

      // router.push('/consumer/home');
    } catch (err) {
      console.error(err);
      setError('登録に失敗しました。入力内容をご確認ください。');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Consumer 新規登録</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSignup} className="space-y-4">
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
          placeholder="パスワード（6文字以上）"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="パスワード確認"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          登録する
        </button>
      </form>
    </div>
  );
}
