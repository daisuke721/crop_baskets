import apiClient from './apiClient';

export const createCommodityCrop = (data) =>
  apiClient.post('/commodity_crops', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
