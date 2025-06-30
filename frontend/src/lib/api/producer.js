import apiClient from './apiClient';

// 新規登録
export const registerProducer = async ({ email, password, passwordConfirmation }) => {
  const response = await apiClient.post('/producers', {
    email,
    password,
    password_confirmation: passwordConfirmation,
  });

  return response;
};

// ログイン
export const loginProducer = async ({ email, password }) => {
  const response = await apiClient.post('/producers/sign_in', {
    email,
    password,
  });

  return response;
};
