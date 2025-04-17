'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ja } from 'date-fns/locale';

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
  // 画像の削除処理
  const handleRemoveImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // フォームの入力
  const [formData, setFormData] = useState({
    name: '',
    crop_id: '',
    variety: '',
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
  }, []);

  // 収穫日用のカレンダー
  const [harvestDate, setHarvestDate] = useState(null);

  // バリデーションの追加
  const [errors, setErrors] = useState({});

  // 出品処理
  const handleSubmit = async () => {
    // バリデーションを追加
    const newErrors = {};

    // 画像のバリデーション
    if (images.length === 0) {
      newErrors.images = '画像を登録してください';
    }

    // 商品名のバリデーション
    if (!formData.name.trim()) {
      newErrors.name = '商品名を入力してください';
    }

    // 作物のバリデーション
    if (!formData.crop_id) {
      newErrors.crop_id = '作物名を選択後、産地名を選択してください';
    }

    // 品種のバリデーション
    if (!formData.variety) {
      newErrors.variety = '品種名を入力してください';
    }

    // 収穫日のバリデーション
    if (!harvestDate) {
      newErrors.harvest_day = '収穫日を入力してください';
    }

    // 容量のバリデーション
    if (!formData.capacity || Number(formData.capacity) <= 0) {
      newErrors.capacity = '容量は1以上の数字で入力してください';
    }

    // 価格のバリデーション
    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = '価格は1円以上で入力してください';
    }

    // 説明のバリデーション
    if (!formData.description.trim()) {
      newErrors.description = '商品の説明を入力してください';
    }

    // エラーがあれば表示&送信中止
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    // バリデーションを通過 → エラークリア
    setErrors({});

    const formDataToSend = new FormData();

    if (harvestDate) {
      const formatted = harvestDate.toISOString().split('T')[0];
      formDataToSend.append('commodity_crop[harvest_day]', formatted);
    }

    Object.keys(formData).forEach((key) => {
      if (key !== 'harvestMonth' && key !== 'harvestDay' && key !== 'origin') {
        formDataToSend.append(`commodity_crop[${key}]`, formData[key]);
      }
    });

    images.forEach((image) => {
      formDataToSend.append('commodity_crop[images][]', image);
    });

    try {
      await createCommodityCrop(formDataToSend);
      alert('作物が出品されました！');
      return true;
    } catch (error) {
      console.error('エラー:', error);
      alert('エラーが発生しました');
      return false;
    }
  };

  return (
    <>
      <div className="w-full px-10 pt-5">
        <h2 className="text-center font-noto font-bold text-stone-700 mb-4">商品画像一覧</h2>
        <div className="flex overflow-x-auto whitespace-nowrap gap-4 px-4 py-2 border rounded-lg bg-white shadow-sm min-h-[100px]">
          {/* URL.createObjectURL(img)で画像のプレビューを表示 */}
          {images.length > 0 ? (
            images.map((img, index) => (
              <div key={index} className="relative w-20 h-20 shrink-0">
                {/* プレビュー画像 */}
                <Image
                  src={URL.createObjectURL(img)}
                  alt={`作物画像${index + 1}`}
                  fill
                  className="object-cover rounded-md border"
                />
                {/* 削除ボタン */}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="font-roboto absolute top-[-6px] right-[-6px] bg-red-500 text-white rounded-full w-5 h-5 text-xs items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center w-full">
              <p className="text-stone-400">画像がまだ選択されていません</p>
            </div>
          )}
        </div>
      </div>
      {/* 画像のエラーメッセージを表示 */}
      {errors && <p className="text-red-500 text-center mt-2">{errors.images}</p>}
      <div className="flex justify-center">
        <div className="flex justify-center pb-10 w-11/12 border-b border-gray-200">
          <label className="block w-44 mt-5 p-2 rounded-lg cursor-pointer text-center text-sprayGreen border border-sprayGreen font-noto hover:bg-sprayGreen hover:text-white transition">
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
            {/* 商品名のエラーメッセージを表示 */}
            {errors && <p className="text-red-500 text-center mt-2">{errors.name}</p>}
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
            {/* 作物のエラーメッセージを表示 */}
            {errors && <p className="text-red-500 text-center mt-2">{errors.crop_id}</p>}
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
            {/* 品種名のエラーメッセージを表示 */}
            {errors && <p className="text-red-500 text-center mt-2">{errors.variety}</p>}
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
            {/* 産地名のエラーメッセージを表示 */}
            {errors && <p className="text-red-500 text-center mt-2">{errors.crop_id}</p>}
          </div>
          {/* 収穫日 */}
          <div className="flex flex-col font-noto text-stone-700">
            <label>収穫日</label>
            <DatePicker
              selected={harvestDate}
              onChange={(data) => setHarvestDate(data)}
              dateFormat="yyyy-MM-dd"
              placeholderText="月/日"
              locale={ja}
              className="font-roboto border p-3 rounded-md outline-none"
            />
            {/* 収穫日のエラーメッセージを表示 */}
            {errors && <p className="text-red-500 text-center mt-2">{errors.harvest_day}</p>}
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
              <span className="font-noto text-stone-700">kg</span>
            </div>
            {/* 容量のエラーメッセージを表示 */}
            {errors && <p className="text-red-500 text-center mt-2">{errors.capacity}</p>}
          </div>
          {/* 価格を入力 */}
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
            {/* 価格のエラーメッセージを表示 */}
            {errors && <p className="text-red-500 text-center mt-2">{errors.price}</p>}
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
            {/* 商品説明のエラーメッセージを表示 */}
            {errors && <p className="text-red-500 text-center mt-2">{errors.description}</p>}
          </div>
        </div>
      </div>

      <div className="h-24"></div>

      <div className="footer-button">
        <div className="flex justify-center py-8">
          <button
            onClick={async () => {
              const isSuccess = await handleSubmit();
              // 成功時のみ遷移
              if (isSuccess) {
                handleHome();
              }
            }}
            className="font-noto text-2xl bg-honey text-white px-10 py-3 rounded-lg hover:opacity-65"
          >
            出品する
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
