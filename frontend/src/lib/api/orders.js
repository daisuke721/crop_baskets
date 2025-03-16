import apiClient from './apiClient';

export const fetchOrderData = async (consumerId) => {
  try {
    const response = await apiClient.get(`/orders/new`);
    return response.data;
  } catch (error) {
    console.error('注文データの取得に失敗しました', error);
    return null;
  }
};

export const createOrder = async () => {
  try {
    const response = await apiClient.post('/orders', {});
    return response.data;
  } catch (error) {
    console.error('注文処理に失敗しました', error);
    throw error;
  }
};
