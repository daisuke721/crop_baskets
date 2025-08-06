import apiClient from './apiClient';

// 商品作物を新規作成
export const createCommodityCrop = (data) =>
  apiClient.post('/commodity_crops', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// 商品一覧を取得
export const fetchCommodityCrops = async () => {
  try {
    const response = await apiClient.get('/commodity_crops');
    return response.data;
  } catch (error) {
    console.error('APIリクエスト失敗');
    console.error('Request URL:', apiClient.defaults.baseURL + '/commodity_crops');
    console.error('Error details:', error);
    throw error;
  }
};

// 商品詳細を取得
export const fetchCommodityCropById = async (id) => {
  const response = await apiClient.get(`/commodity_crops/${id}`);
  return response.data;
};

// 商品作物の削除
export const deleteCommodityCrop = async (id) => {
  try {
    await apiClient.delete(`/commodity_crops/${id}`);
  } catch (error) {
    console.error('商品作物の削除に失敗しました');
    console.error('Request URL:', apiClient.defaults.baseURL + `/commodity_crops/${id}`);
    console.error('Error details:', error);
    throw error;
  }
};

// 生産者ごとの出品作物一覧を取得
export const fetchMyCommodityCrops = async () => {
  const response = await apiClient.get('/commodity_crops/my_list');
  return response.data;
};

// 商品作物の編集
export const updateCommodityCrop = async (id, formData) => {
  const response = await apiClient.patch(`/commodity_crops/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};
