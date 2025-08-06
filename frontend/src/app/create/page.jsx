'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ja } from 'date-fns/locale';

import { fetchCrops } from '../../lib/api/crops';
import { createCommodityCrop } from '../../lib/api/commodityCrops';
import { simpleListing } from '../../lib/api/simpleListings';

import { CreateModalContent } from '../../components/CreateModalContent';
import { BottomNavigationBar } from '../../Layout/BottomNavigationBar';
import { AnalyzingModal } from '../../components/AnalyzingModal';
import { fetchMyReceivingPoints } from '../../lib/api/receivingPoints';

const Page = () => {
  const router = useRouter();
  const handleDashboard = () => {
    router.push('/producer/dashboard');
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
    grade: '',
    condition: '',
    description: '',
  });

  // 画像やフォームをクリア
  const resetForm = () => {
    setImages([]);
    setFormData({
      name: '',
      crop_id: '',
      variety: '',
      capacity: '',
      price: '',
      grade: '',
      condition: '',
      description: '',
    });
    setHarvestDate(null);
    setSelectedCrop('');
    setOrigins([]);
    setErrors({});
    setVarietyCandidates([]);
    setSelectedReceivingPointId([]);
  };

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
  // 品種候補のステート
  const [varietyCandidates, setVarietyCandidates] = useState([]);

  useEffect(() => {
    // 作物リストをAPIから取得
    fetchCrops()
      .then((data) => {
        setCrops(data);

        // 作物名のリストをユニークにする、五十音順にする
        const uniqueCropNames = [...new Set(data.map((crop) => crop.name))].sort((a, b) => a.localeCompare(b, 'ja'));
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

  // モーダルの表示
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // 受け取り所をリスト
  const [receivingPoints, setReceivingPoints] = useState([]);
  // 選択された受け取り所名
  const [selectedReceivingPointId, setSelectedReceivingPointId] = useState('');

  // 受け取り所のAPIを呼び出し
  useEffect(() => {
    const token = localStorage.getItem('producerToken');
    fetchMyReceivingPoints(token)
      .then((data) => setReceivingPoints(data))
      .catch((error) => console.error('受け取り所をの取得に失敗しました', error));
  }, []);

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

    // 等級のバリデーション
    if (formData.grade !== 'A' && formData.grade !== 'B') {
      newErrors.grade = 'AまたはBで入力してください';
    }

    // 状態のバリデーション
    if (!formData.condition) {
      newErrors.condition = '状態を入力してください';
    }

    // 受け取り所のバリデーション
    if (!selectedReceivingPointId) {
      newErrors.receiving_point_id = '受け取り所を選択してください';
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
    // フォームのデータを作る
    const formDataToSend = new FormData();

    if (harvestDate) {
      const formatted = harvestDate.toISOString().split('T')[0];
      formDataToSend.append('commodity_crop[harvest_day]', formatted);
    }

    if (selectedReceivingPointId) {
      formDataToSend.append('commodity_crop[receiving_point_id]', selectedReceivingPointId);
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
      return true;
    } catch (error) {
      console.error('エラー:', error);
      alert('エラーが発生しました');
      return false;
    }
  };

  // 解析開始時にモーダルを開き、終了時は自動で閉じるモーダルのstateを準備
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // 簡単出品ボタンを押したときに呼ばれる関数(最初に選択した画像をAPIに送信し、取得した作物情報でフォームを自動入力)
  const handleSimpleListing = async () => {
    // 画像が1枚もない場合は何もしない
    if (images.length === 0) return;

    try {
      // 画像を解析時にモーダルを開く
      setIsAnalyzing(true);

      // APIに画像を送信し、解析データを取得
      const data = await simpleListing(images[0]);

      // 取得した作物名で<select>の作物名を自動選択
      setSelectedCrop(data.name);

      // 品種候補を配列化
      const candidates = (data.variety || '')
        .split(/[、,. ]/)
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 5);
      setVarietyCandidates(candidates);

      // 選択された作物名に対応する産地リストを取得&ソート
      const filteredOrigins = crops
        .filter((crop) => crop.name === data.name)
        .map((crop) => ({ id: crop.id, producing_area: crop.producing_area }))
        .sort((a, b) => a.producing_area.localeCompare(b.producing_area, 'ja'));

      setOrigins(filteredOrigins);

      // もし、取得できた産地リストがあれば1番目の産地を選択
      const firstOrigin = filteredOrigins[0];

      // 収穫日（YYYY-MM-DD）を Date に変換。無ければ今日にフォールバック。
      const yyyyMmDd =
        data.harvest_day && /^\d{4}-\d{2}-\d{2}$/.test(data.harvest_day)
          ? data.harvest_day
          : new Date().toISOString().split('T')[0];
      setHarvestDate(new Date(`${yyyyMmDd}T00:00:00`));

      // 受け取り所：未選択なら先頭を自動セット
      if (!selectedReceivingPointId && receivingPoints?.length > 0) {
        setSelectedReceivingPointId(String(receivingPoints[0].id));
      }

      // 既存のフォーム入力データをAI結果で上書き
      setFormData((prev) => ({
        ...prev, // 既存データを残す
        name: data.product_name ?? prev.name,
        variety: candidates[0] ?? prev.variety ?? '',
        price: data.price?.match(/\d+/)?.[0] ?? prev.price,
        description: data.description ?? prev.description,
        crop_id: firstOrigin?.id ?? prev.crop_id,
        capacity: data.capacity || prev.capacity || '1',
        grade: data.grade || prev.grade || 'A',
        condition: data.condition || prev.condition || (data.grade === 'B' ? '訳あり' : '秀品'),
      }));
    } catch (error) {
      // API呼び出しが失敗した場合エラーハンドリング
      alert('画像解析に失敗しました');
      console.error(error);
    } finally {
      // 画像の解析を終了時にモーダルを閉じる
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      <div className="content-area">
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
                <p className="text-stone-400 bg-[url('/placeholder.png')]">画像がまだ選択されていません</p>
              </div>
            )}
          </div>
        </div>
        {/* 画像を選択後、簡単出品ボタンが出てくるようにする */}
        {images.length > 0 && (
          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={handleSimpleListing}
              className="w-44 px-4 py-2 font-noto bg-sky-400 text-white rounded-lg hover:bg-sky-500 transition"
            >
              画像を解析する
            </button>
          </div>
        )}
        {/* 画像のエラーメッセージを表示 */}
        {errors && <p className="text-red-500 text-center mt-2">{errors.images}</p>}
        <div className="flex justify-center">
          <div className="flex justify-center pb-10 w-11/12 border-b border-gray-200">
            <label className="block w-44 mt-5 px-4 py-2 rounded-lg cursor-pointer text-center text-white bg-sprayGreen font-noto hover:bg-emerald-500 transition">
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
                value={formData.name}
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

                  // 選択された作物名に対応する産地リストを取得、作物名を五十音順にする
                  const filteredOrigins = crops
                    .filter((crop) => crop.name === e.target.value)
                    .map((crop) => ({ id: crop.id, producing_area: crop.producing_area }))
                    .sort((a, b) => a.producing_area.localeCompare(b.producing_area, 'ja'));
                  setOrigins(filteredOrigins);
                  // 産地リセット
                  setFormData({ ...formData, crop_id: '', origin: '' });
                }}
                // 三項演算子を使いフォーム内が入力され黒色に、入力されていない場合はプレースホルダーのグレー
                className={`font-roboto border p-3 rounded-md outline-none ${
                  selectedCrop ? 'text-black' : 'text-gray-400'
                }`}
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
                value={formData.variety}
                placeholder="品種名を入力してください"
                onChange={handleChange}
                className="font-roboto border p-3 rounded-md outline-none"
              />
              {/* AIからの候補を選択可能にする */}
              {varietyCandidates.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {varietyCandidates.map((v) => (
                    <button
                      type="button"
                      key={v}
                      onClick={() => setFormData((prev) => ({ ...prev, variety: v }))}
                      className="px-2 py-1 border rounded-md hover:bg-gray-50"
                      title="クリックで入力欄に反映"
                    >
                      {v}
                    </button>
                  ))}
                </div>
              )}
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
                className={`font-roboto border p-3 rounded-md outline-none ${
                  formData.crop_id ? 'text-black' : 'text-gray-400'
                }`}
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

            {/* 価格を入力 */}
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

            {/* 等級を入力 */}
            <div className="flex flex-col font-noto text-stone-700">
              <label>等級</label>
              <div className="space-x-2">
                <input
                  type="text"
                  name="grade"
                  value={formData.grade}
                  placeholder="入力してください"
                  onChange={handleChange}
                  className="font-roboto border p-3 rounded-md outline-none"
                />
                <span className="font-noto text-stone-700">品</span>
              </div>
              {/* 等級のエラーメッセージを表示 */}
              {errors && <p className="text-red-500 text-center mt-2">{errors.grade}</p>}
            </div>

            {/* 状態を入力 */}
            <div className="flex flex-col font-noto text-stone-700">
              <label>状態</label>
              <div className="space-x-2">
                <input
                  type="text"
                  name="condition"
                  value={formData.condition}
                  placeholder="入力してください"
                  onChange={handleChange}
                  className="font-roboto border p-3 rounded-md outline-none"
                />
              </div>
              {/* 状態のエラーメッセージを表示 */}
              {errors && <p className="text-red-500 text-center mt-2">{errors.condition}</p>}
            </div>

            {/* 受け取り所の選択 */}
            <div className="flex flex-col font-noto text-stone-700">
              <label>受け取り所</label>
              <select
                value={selectedReceivingPointId}
                onChange={(e) => setSelectedReceivingPointId(e.target.value)}
                className={`font-noto border p-3 rounded-md outline-none ${selectedReceivingPointId ? 'text-black' : 'text-gray-400'}`}
                required
              >
                <option value="">選択してください</option>
                {receivingPoints.map((rp) => (
                  <option key={rp.id} value={rp.id}>
                    {rp.name}({rp.address})
                  </option>
                ))}
              </select>
              {/* 受け取り所のエラーメッセージを表示 */}
              {errors && <p className="text-red-500 text-center mt-2">{errors.receiving_point_id}</p>}
            </div>

            {/* 説明文の入力 */}
            <div className="flex flex-col font-noto text-stone-700">
              <label>商品の説明</label>
              <textarea
                name="description"
                value={formData.description}
                placeholder="商品の説明を入力してください"
                onChange={handleChange}
                className="font-roboto border p-3 rounded-md outline-none resize-none h-60"
              />
              {/* 商品説明のエラーメッセージを表示 */}
              {errors && <p className="text-red-500 text-center mt-2">{errors.description}</p>}
            </div>
            <button
              onClick={async () => {
                const isSuccess = await handleSubmit();
                // 成功時のみ遷移
                if (isSuccess) {
                  setIsCreateModalOpen(true);
                }
              }}
              className="font-noto text-2xl leading-tight bg-honey text-white py-3 rounded-lg hover:bg-yellow-600 transition"
            >
              出品する
            </button>
          </div>
        </div>
      </div>

      {/* ナビゲーション */}
      <BottomNavigationBar />

      {/* 画像解析のモーダルを表示 */}
      {isAnalyzing && <AnalyzingModal />}

      {/* モーダルを表示 */}
      <CreateModalContent
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          resetForm();
        }}
        onGoDashboard={handleDashboard}
      />
    </>
  );
};

export default Page;
