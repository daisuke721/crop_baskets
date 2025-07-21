'use client';

import { useParams, useRouter } from 'next/navigation';
import { fetchCommodityCropById, updateCommodityCrop } from '../../../../../lib/api/commodityCrops';
import { useEffect, useState } from 'react';
import { fetchCrops } from '../../../../../lib/api/crops';
import DatePicker from 'react-datepicker';
import { ja } from 'date-fns/locale';
import { EditModalContent } from '../../../../../components/EditModalContent';

const Page = () => {
  const router = useRouter();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    crop_id: '',
    variety: '',
    capacity: '',
    price: '',
    description: '',
  });

  const [harvestDate, setHarvestDate] = useState(null);
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [crops, setCrops] = useState([]);
  const [cropNames, setCropNames] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [origins, setOrigins] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const crop = await fetchCommodityCropById(id);
        setFormData({
          name: crop.name,
          crop_id: crop.crop_id,
          variety: crop.variety,
          capacity: crop.capacity,
          price: crop.price,
          description: crop.description,
        });
        setHarvestDate(new Date(crop.harvest_day));
        setExistingImages(crop.commodity_crop_images);
        setSelectedCrop(crop.crop.name);

        const cropList = await fetchCrops();
        setCrops(cropList);
        const names = [...new Set(cropList.map((c) => c.name))].sort((a, b) => a.localeCompare(b, 'ja'));
        setCropNames(names);

        const filteredOrigins = cropList
          .filter((c) => c.name === crop.crop.name)
          .map((c) => ({ id: c.id, producing_area: c.producing_area }))
          .sort((a, b) => a.producing_area.localeCompare(b.producing_area, 'ja'));
        setOrigins(filteredOrigins);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // モーダルの表示
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 更新処理
  const handleSubmit = async () => {
    // バリデーションを追加
    const newErrors = {};

    // 画像のバリデーション
    if (images.length === 0 && existingImages.length === 0) {
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
      console.log('バリデーションエラー:', newErrors);
      setErrors(newErrors);
      return false;
    }

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      fd.append(`commodity_crop[${key}]`, value);
    });
    if (harvestDate) {
      fd.append('commodity_crop[harvest_day]', harvestDate.toISOString().split('T')[0]);
    }
    images.forEach((img) => {
      fd.append('commodity_crop[images][]', img);
    });

    try {
      await updateCommodityCrop(id, fd);
      return true;
    } catch (err) {
      console.error('更新失敗:', err);
      if (err.response) {
        console.error('ステータス:', err.response.status);
        console.error('レスポンス:', err.response.data);
      }
      alert('更新に失敗しました');
      return false;
    }
  };

  return (
    <>
      <div className="content-area">
        <div className="w-full px-10 pt-5">
          <h2 className="text-center font-noto font-bold text-stone-700 mb-4">商品作物の編集</h2>
          <div className="border rounded-lg bg-white shadow-sm min-h-[100px]">
            <h3 className="text-sm font-noto pt-2 text-center">画像一覧</h3>
            <div className="flex overflow-x-auto whitespace-nowrap gap-4 px-4 py-2">
              {existingImages.map((img, i) => (
                <div key={i} className="relative w-20 h-20 shrink-0">
                  {img.image_url ? (
                    <img src={img.image_url} alt="img" className="object-cover w-20 h-20 rounded-md border" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 text-xs text-center flex items-center justify-center">
                      画像なし
                    </div>
                  )}
                </div>
              ))}
              {images.map((img, i) => (
                <div key={i} className="relative w-20 h-20">
                  <img src={URL.createObjectURL(img)} alt="preview" className="object-cover rounded-md border" />
                  <button
                    onClick={() => handleRemoveImage(i)}
                    className="font-roboto absolute top-[-6px] right-[-6px] bg-red-500 text-white rounded-full w-5 h-5 text-xs items-center justify-center hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 画像のエラーメッセージを表示 */}
          {errors && <p className="text-red-500 text-center mt-2">{errors.images}</p>}

          <div className="flex justify-center">
            <div className="flex justify-center pb-10 w-11/12 border-b border-gray-200">
              <label className="block w-44 mt-5 px-4 py-2 rounded-lg cursor-pointer text-center text-white bg-sprayGreen font-noto hover:bg-emerald-500 transition">
                商品画像を追加
                <input type="file" multiple className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
          </div>

          <div className="flex justify-center mt-20">
            <div className="flex flex-col w-96 space-y-8">
              <div className="flex flex-col font-noto text-stone-700">
                <label>商品名</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="商品名"
                  className="border p-2 w-full"
                />
                {/* 商品名のエラーメッセージを表示 */}
                {errors && <p className="text-red-500 text-center mt-2">{errors.name}</p>}
              </div>

              <div className="flex flex-col font-noto text-stone-700">
                <label>作物名</label>
                <select
                  value={selectedCrop}
                  onChange={(e) => {
                    setSelectedCrop(e.target.value);
                    const filtered = crops
                      .filter((crop) => crop.name === e.target.value)
                      .map((crop) => ({ id: crop.id, producing_area: crop.producing_area }));
                    setOrigins(filtered);
                    setFormData({ ...formData, crop_id: '', origin: '' });
                  }}
                  className="border p-2 w-full"
                >
                  <option value="">作物名を選択</option>
                  {cropNames.map((name, i) => (
                    <option key={i} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                {/* 作物のエラーメッセージを表示 */}
                {errors && <p className="text-red-500 text-center mt-2">{errors.crop_id}</p>}
              </div>

              <div className="flex flex-col font-noto text-stone-700">
                <label>品種名</label>
                <input
                  name="variety"
                  value={formData.variety}
                  onChange={handleChange}
                  placeholder="品種"
                  className="border p-2 w-full"
                />
                {/* 品種名のエラーメッセージを表示 */}
                {errors && <p className="text-red-500 text-center mt-2">{errors.variety}</p>}
              </div>

              <div className="flex flex-col font-noto text-stone-700">
                <div>産地</div>
                <select
                  name="crop_id"
                  value={formData.crop_id}
                  onChange={(e) => {
                    const selected = origins.find((crop) => crop.id === parseInt(e.target.value));
                    setFormData({ ...formData, crop_id: e.target.value, origin: selected?.producing_area || '' });
                  }}
                  className="border p-2 w-full"
                >
                  <option value="">産地を選択</option>
                  {origins.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.producing_area}
                    </option>
                  ))}
                </select>
                {/* 産地名のエラーメッセージを表示 */}
                {errors && <p className="text-red-500 text-center mt-2">{errors.crop_id}</p>}
              </div>

              <div className="flex flex-col font-noto text-stone-700">
                <label>収穫日</label>
                <DatePicker
                  selected={harvestDate}
                  onChange={(date) => setHarvestDate(date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="月/日"
                  locale={ja}
                  className="font-roboto border p-3 rounded-md outline-none"
                />
                {/* 収穫日のエラーメッセージを表示 */}
                {errors && <p className="text-red-500 text-center mt-2">{errors.harvest_day}</p>}
              </div>

              <div className="flex flex-col font-noto text-stone-700">
                <label>容量</label>
                <div className="space-x-2">
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    min={0}
                    placeholder="入力してください"
                    onChange={handleChange}
                    className="font-roboto border p-3 rounded-md outline-none"
                  />
                  <span className="font-noto text-stone-700">kg</span>
                </div>
                {/* 容量のエラーメッセージを表示 */}
                {errors && <p className="text-red-500 text-center mt-2">{errors.capacity}</p>}
              </div>

              <div className="flex flex-col font-noto text-stone-700">
                <label>価格</label>
                <div className="space-x-2">
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    min={0}
                    placeholder="入力してください"
                    onChange={handleChange}
                    className="font-roboto border p-3 rounded-md outline-none"
                  />
                  <span className="font-noto text-stone-700">円</span>
                </div>
                {/* 価格のエラーメッセージを表示 */}
                {errors && <p className="text-red-500 text-center mt-2">{errors.price}</p>}
              </div>

              <div className="flex flex-col font-noto text-stone-700">
                <label>商品の説明</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="商品の説明を入力してください"
                  className="font-roboto border p-3 rounded-md outline-none resize-none h-60"
                />
                {/* 商品説明のエラーメッセージを表示 */}
                {errors && <p className="text-red-500 text-center mt-2">{errors.description}</p>}
              </div>

              <button
                onClick={async () => {
                  const isSuccess = await handleSubmit();
                  if (isSuccess) {
                    setIsEditModalOpen(true);
                  }
                }}
                className="font-noto text-lg leading-tight bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
              >
                更新する
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* モーダルを表示 */}
      <EditModalContent
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
        }}
        onGoDashboard={() => router.push('/producer/commodity_crop')}
      />
    </>
  );
};

export default Page;
