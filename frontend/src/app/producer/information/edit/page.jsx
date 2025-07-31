'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createProducerInformation } from '../../../../lib/api/producerInformations';

const Page = () => {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', comment: '' });
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') setImage(files?.[0] || null);
    else setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('producer_information[name]', form.name);
      fd.append('producer_information[comment]', form.comment);
      if (image) fd.append('producer_information[image]', image);
      await createProducerInformation(fd);
      router.push('/producer/information');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="content-area">
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <h1 className="text-xl font-bold">生産者情報の登録</h1>
          <div>
            <label className="block mb-1">画像</label>
            <input type="file" name="image" accept="image/*" onChange={onChange} />
          </div>
          <div>
            <label className="block mb-1">名前</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">コメント</label>
            <textarea name="comment" value={form.comment} onChange={onChange} className="w-full border p-2 rounded" />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          >
            {submitting ? '送信中...' : '保存する'}
          </button>
        </form>
      </div>
    </>
  );
};

export default Page;
