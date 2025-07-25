'use client';

import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { createReceivingPoint } from '../../../../lib/api/receivingPoints';

const center = { lat: 35.681236, lng: 139.767125 };

const containerStyle = {
  width: '100%',
  height: '400px',
};

const Page = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
  });

  const [error, setError] = useState('');

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const onMapClick = useCallback((e) => {
    if (!e.latLng) return;

    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    console.log('クリックした位置:', lat, lng);

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ location: { lat, lng }, language: 'ja' }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const address = results[0].formatted_address;

        setFormData((prev) => ({
          ...prev,
          latitude: lat,
          longitude: lng,
          address: address,
        }));
      } else {
        console.error('ジオコーディング失敗:', status);
        setFormData((prev) => ({
          ...prev,
          latitude: lat,
          longitude: lng,
          address: '',
        }));
      }
    });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('producerToken');
      console.log('送信データ:', formData);
      console.log('送信トークン:', token);

      const res = await createReceivingPoint(
        {
          name: formData.name,
          address: formData.address,
          latitude: parseFloat(formData.latitude),
          longitude: parseFloat(formData.longitude),
        },
        token,
      );

      console.log('登録成功:', res);
      router.push('/producer/dashboard');
    } catch (err) {
      console.error('作成に失敗しました:', err.response ?? err);
      setError('受け取り所の作成に失敗しました');
    }
  };

  return (
    <>
      <div className="content-area">
        <div className="w-full px-10">
          <h1 className="text-center text-xl font-noto font-bold text-stone-700 mb-4">受け取りポイントの登録</h1>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4 font-noto">
            <div className="flex flex-col font-noto text-stone-700">
              <label>受け取り所名</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border px-3 py-2 rounded w-full"
                required
              />
            </div>

            <div className="flex flex-col font-noto text-stone-700">
              <label>住所</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border px-3 py-2 rounded w-full"
                required
              />
            </div>

            <div className="flex flex-col font-noto text-stone-700">
              <label>緯度</label>
              <input
                type="number"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                step="any"
                className="border px-3 py-2 rounded w-full"
              />
            </div>

            <div className="flex flex-col font-noto text-stone-700">
              <label>経度</label>
              <input
                type="number"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                step="any"
                className="border px-3 py-2 rounded w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full font-noto py-2 bg-purple-300 text-white rounded-lg cursor-pointer hover:bg-purple-500 transition"
            >
              登録する
            </button>
          </form>

          <h2 className="text-center text-xl font-semibold my-3">マップでピンをクリックして位置を選択</h2>
          {isLoaded ? (
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12} onClick={onMapClick}>
              {formData.latitude && formData.longitude && (
                <Marker
                  position={{
                    lat: parseFloat(formData.latitude),
                    lng: parseFloat(formData.longitude),
                  }}
                  icon={{
                    url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                  }}
                />
              )}
            </GoogleMap>
          ) : (
            <p>地図を読み込んでいます...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
