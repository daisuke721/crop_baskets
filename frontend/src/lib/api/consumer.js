import apiClient from './apiClient';

// 新規登録
export const signUpConsumer = async ({ email, password, passwordConfirmation }) => {
  const response = await apiClient.post('/consumers', {
    consumer: {
      email,
      password,
      password_confirmation: passwordConfirmation,
    },
  });

  return response;
};

// ログイン
export const signInConsumer = async ({ email, password }) => {
  const response = await apiClient.post('/consumers/sign_in', {
    email,
    password,
  });

  return response;
};
