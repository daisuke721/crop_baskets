import apiClient from './apiClient';

export const fetchCrops = () => apiClient.get('/crops');
