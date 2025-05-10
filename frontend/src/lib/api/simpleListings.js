import apiClient from './apiClient';

/**
 * 簡単出品APIを呼び出す関数
 * - 画像1枚をAPIに送信して、ChatGPTに解析させる
 * - サーバーから作物名・商品名・価格・商品説明などの情報を取得
 *
 * @param {File} image 送信する画像ファイル
 * @returns {Promise<Object>} サーバーから返される解析結果
 */

export const simpleListing = async (image) => {
  // 画像をmultipart/form-dataで送るためFormDataを作成
  const formData = new FormData();
  formData.append('image', image);

  // axiosでPOSTリクエスト送信
  const response = await apiClient.post('/simple_listings', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};
