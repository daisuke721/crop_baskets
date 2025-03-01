import apiClient from './apiClient';

export const fetchCrops = async () => {
  const response = await apiClient.get('/crops');
  return response.data;
};
