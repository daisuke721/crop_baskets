import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエストのログ(デバッグ用)
apiClient.interceptors.request.use((config) => {
  // eslint-disable-next-line no-console
  console.log('Request:', config);
  return config;
});

// レスポンスのログ(デバッグ用)
apiClient.interceptors.response.use(
  (response) => {
    // eslint-disable-next-line no-console
    console.log('Response:', response);
    return response;
  },
  (error) => {
    // eslint-disable-next-line no-console
    console.error('API Error:', error);
    return Promise.reject(error);
  },
);

export default apiClient;
