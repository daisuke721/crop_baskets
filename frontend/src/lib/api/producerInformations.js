import apiClient from './apiClient';

// 生産者情報を取得
export const fetchMyProducerInformation = async () => {
  const response = await apiClient.get('/producer_informations/my_information');
  return response.data?.producer_information ?? response.data ?? null;
};

// 生産者情報を作成
export const createProducerInformation = async (formData) => {
  const response = await apiClient.post('/producer_informations', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// 生産者情報を削除
export const deleteProducerInformation = async () => {
  const response = await apiClient.delete('/producer_informations');
  return response.data;
};
