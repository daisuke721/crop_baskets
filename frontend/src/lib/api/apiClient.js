import axios from 'axios';

const baseURL =
  typeof window === 'undefined'
    ? process.env.INTERNAL_API_BASE_URL // SSR用
    : process.env.NEXT_PUBLIC_API_BASE_URL; // ブラウザ用

const apiClient = axios.create({
  baseURL,
  withCredentials: true,
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
