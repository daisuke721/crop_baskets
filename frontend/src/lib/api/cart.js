import apiClient from './apiClient';

// カートの商品一覧を取得
export const fetchCartItems = async () => {
  try {
    const response = await apiClient.get('/cart_items');
    return response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }
};

// 商品をカートに追加
export const addToCart = async (commodityCropId, totalPrice) => {
  try {
    const response = await apiClient.post('/cart_items', {
      consumer_id: null, // 一旦null
      commodity_crop_id: commodityCropId,
      total_price: totalPrice,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return null;
  }
};

// 商品を削除
export const removeCartItem = async (itemId) => {
  try {
    await apiClient.delete(`/cart_items/${itemId}`);
    return true;
  } catch (error) {
    console.error('Error removing cart item:', error);
    return false;
  }
};
