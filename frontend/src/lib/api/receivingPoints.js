import apiClient from './apiClient';

// 全ての受け取り所を取得する公開API
export const fetchReceivingPoints = async () => {
  const response = await apiClient.get('/receiving_points');
  return response.data;
};

// 特定の受け取り所を取得
export const fetchReceivingPointById = async (id) => {
  const response = await apiClient.get(`/receiving_points/${id}`);
  return response.data;
};

// producerが受け取り所を新規作成するAPI
export const createReceivingPoint = async ({ name, address, latitude, longitude }, token) => {
  const response = await apiClient.post(
    '/receiving_points',
    {
      receiving_point: {
        name,
        address,
        latitude,
        longitude,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

// producerが受け取り所を削除するAPI
export const deleteReceivingPoint = async (id, token) => {
  const response = await apiClient.delete(`/receiving_points/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// producerが登録した受け取り所を取得
export const fetchMyReceivingPoints = async (token) => {
  const response = await apiClient.get('/receiving_points/my_list', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
