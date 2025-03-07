import apiClient from './apiClient';

// 商品作物を新規作成
export const createCommodityCrop = (data) =>
  apiClient.post('/commodity_crops', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// 商品一覧を取得
export const fetchCommodityCrops = async () => {
  const response = await apiClient.get('/commodity_crops');
  return response.data;
};

// 商品詳細を取得
export const fetchCommodityCropById = async (id) => {
  const response = await apiClient.get(`/commodity_crops/${id}`);
  return response.data;
};
