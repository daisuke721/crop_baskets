import apiClient from './apiClient';

// 新規登録
export const signUpProducer = async ({ email, password, passwordConfirmation }) => {
  const response = await apiClient.post('/producers', {
    producer: {
      email,
      password,
      password_confirmation: passwordConfirmation,
    },
  });

  return response;
};

// ログイン
export const signInProducer = async ({ email, password }) => {
  const response = await apiClient.post('/producers/sign_in', {
    producer: {
      email,
      password,
    },
  });

  return response;
};
