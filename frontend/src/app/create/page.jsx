'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { fetchCrops } from '../../lib/api/crops';
import { createCommodityCrop } from '../../lib/api/commodityCrops';

const Page = () => {
  const router = useRouter();
  const handleHome = () => {
    router.push('/');
  };

  // 画像のアップロード
  const [images, setImages] = useState([]);
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files); // 選択したファイルを取得し、配列に変換
    setImages((prev) => [...prev, ...files]); // 既存の画像に新しい画像を追加し表示
  };

  // フォームの入力
  const [formData, setFormData] = useState({
    name: '',
    crop_id: '',
    variety: '',
    origin: '',
    harvestMonth: '',
    harvestDay: '',
    capacity: '',
    price: '',
    description: '',
  });

  // 入力フィールドの変更
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 作物リスト
  const [crops, setCrops] = useState([]);
  // ユニークな作物リスト
  const [cropNames, setCropNames] = useState([]);
  // 選択された作物名
  const [selectedCrop, setSelectedCrop] = useState('');
  // 産地リスト
  const [origins, setOrigins] = useState([]);

  useEffect(() => {
    // 作物リストをAPIから取得
    fetchCrops()
      .then((data) => {
        setCrops(data);

        // 作物名のリストをユニークにする
        const uniqueCropNames = [...new Set(data.map((crop) => crop.name))];
        setCropNames(uniqueCropNames);
      })
      .catch((error) => {
        console.error('作物リストの取得エラー:', error);
      });
  });

  // 出品処理
  const handleSubmit = async () => {
    const formDataToSend = new FormData();

    if (formData.harvestMonth && formData.harvestDay) {
      const today = new Date();
      const formattedHarvestDay = `${today.getFullYear()}-${String(formData.harvestMonth).padStart(2, '0')}-${String(formData.harvestDay).padStart(2, '0')}`;
      formDataToSend.append('commodity_crop[harvest_day]', formattedHarvestDay);
    }

    Object.keys(formData).forEach((key) => {
      if (key !== 'harvestMonth' && key !== 'harvestDay') {
        formDataToSend.append(`commodity_crop[${key}]`, formData[key]);
      }
    });

    images.forEach((image) => {
      formDataToSend.append('commodity_crop[images][]', image);
    });

    try {
      await createCommodityCrop(formDataToSend);
      alert('作物が出品されました！');
    } catch (error) {
      console.error('エラー:', error);
      alert('エラーが発生しました');
    }
  };

  return (
    <>
      <div className="flex justify-center space-x-5 my-5 h-24">
        {/* URL.createObjectURL(img)で画像のプレビューを表示 */}
        {images.map((img, index) => (
          <Image
            key={index}
            src={URL.createObjectURL(img)}
            alt="作物画像"
            width={75}
            height={50}
            className="w-16 h-24"
          />
        ))}
      </div>
      <div className="flex justify-center">
        <div className="flex justify-center pb-10 w-11/12 border-b border-gray-200">
          <label className="block w-44 mt-5 p-2 rounded-lg cursor-pointer text-center text-sprayGreen border border-sprayGreen font-noto">
            商品画像を登録する
            <input type="file" multiple className="hidden" onChange={handleImageUpload} />
          </label>
        </div>
      </div>

      <div className="flex justify-center mt-20">
        <div className="flex flex-col w-96 space-y-8">
          {/* 商品名を入力 */}
          <div className="flex flex-col font-noto text-stone-700">
            <label>商品名</label>
            <input
              type="text"
              name="name"
              placeholder="商品名を入力してください"
              onChange={handleChange}
              className="font-roboto border p-3 rounded-md outline-none"
            />
          </div>
          {/* 作物をAPIから取得 */}
          <div className="flex flex-col font-noto text-stone-700">
            <label>作物名</label>
            <select
              name="crop_name"
              value={selectedCrop}
              onChange={(e) => {
                setSelectedCrop(e.target.value);

                // 選択された作物名に対応する産地リストを取得
                const filteredOrigins = crops
                  .filter((crop) => crop.name === e.target.value)
                  .map((crop) => ({ id: crop.id, producing_area: crop.producing_area }));

                setOrigins(filteredOrigins);
                // 産地リセット
                setFormData({ ...formData, crop_id: '', origin: '' });
              }}
              className="font-roboto text-gray-400 border p-3 rounded-md outline-none"
            >
              <option value="">作物を選択してください</option>
              {cropNames.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          {/* 品種名を入力 */}
          <div className="flex flex-col font-noto text-stone-700">
            <label>品種名</label>
            <input
              type="text"
              name="variety"
              placeholder="品種名を入力してください"
              onChange={handleChange}
              className="font-roboto border p-3 rounded-md outline-none"
            />
          </div>
          {/* 産地をAPIから取得 */}
          <div className="flex flex-col font-noto text-stone-700">
            <label>産地</label>
            <select
              name="crop_id"
              value={formData.crop_id}
              onChange={(e) => {
                const selectedCrop = origins.find((crop) => crop.id === parseInt(e.target.value, 10));
                setFormData({ ...formData, crop_id: e.target.value, origin: selectedCrop?.producing_area || '' });
              }}
              disabled={!selectedCrop}
              className="font-roboto text-gray-400 border p-3 rounded-md outline-none"
            >
              <option value="">産地を選択してください</option>
              {origins.map((crop) => (
                <option key={crop.id} value={crop.id}>
                  {crop.producing_area}
                </option>
              ))}
            </select>
          </div>
          {/* 収穫日 */}
          <div className="flex flex-col font-noto text-stone-700">
            <label>収穫日</label>
            <div className="flex space-x-5">
              <div className="space-x-2">
                <select
                  name="harvestMonth"
                  onChange={handleChange}
                  className="font-roboto text-gray-400 border p-3 rounded-md outline-none"
                >
                  <option>ー</option>
                  {[...Array(12).keys()].map((m) => (
                    <option key={m + 1} value={m + 1}>
                      {m + 1}
                    </option>
                  ))}
                </select>
                <span>月</span>
              </div>
              <div className="space-x-2">
                <select
                  name="harvestDay"
                  onChange={handleChange}
                  className="font-roboto text-gray-400 border p-3 rounded-md outline-none"
                >
                  <option>ー</option>
                  {[...Array(31).keys()].map((d) => (
                    <option key={d + 1} value={d + 1}>
                      {d + 1}
                    </option>
                  ))}
                </select>
                <span>日</span>
              </div>
            </div>
          </div>
          {/* 容量を入力 */}
          <div className="flex flex-col font-noto text-stone-700">
            <label>容量</label>
            <div className="space-x-2">
              <input
                type="number"
                name="capacity"
                placeholder="入力してください"
                onChange={handleChange}
                className="font-roboto border p-3 rounded-md outline-none"
              />
              <span className="font-noto text-stone-700">グラム</span>
            </div>
          </div>
          {/* 金額を入力 */}
          <div className="flex flex-col font-noto text-stone-700">
            <label>価格</label>
            <div className="space-x-2">
              <input
                type="number"
                name="price"
                placeholder="入力してください"
                onChange={handleChange}
                className="font-roboto border p-3 rounded-md outline-none"
              />
              <span className="font-noto text-stone-700">円</span>
            </div>
          </div>
          {/* 説明文の入力 */}
          <div className="flex flex-col font-noto text-stone-700">
            <label>商品の説明</label>
            <textarea
              name="description"
              placeholder="商品の説明を入力してください"
              onChange={handleChange}
              className="font-roboto border p-3 rounded-md outline-none resize-none h-60"
            />
          </div>
        </div>
      </div>

      <div className="h-24"></div>

      <div className="footer-button">
        <div className="flex justify-center py-8">
          <button
            onClick={async () => {
              await handleSubmit();
              handleHome();
            }}
            className="font-noto text-2xl bg-honey text-white px-10 py-3 rounded-lg"
          >
            出品する
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
