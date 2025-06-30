import apiClient from './apiClient';

// 新規登録
export const registerConsumer = async ({ email, password, passwordConfirmation }) => {
  const response = await apiClient.post('/consumers', {
    email,
    password,
    password_confirmation: passwordConfirmation,
  });

  return response;
};

// ログイン
export const loginConsumer = async ({ email, password }) => {
  const response = await apiClient.post('/consumers/sign_in', {
    email,
    password,
  });

  return response;
};
