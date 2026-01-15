import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getAuthConfig = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo?.token}`
    }
  };
};

export const getCartItems = createAsyncThunk(
  'cart/getCart',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        'http://localhost:5000/api/cart',
        getAuthConfig()
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/cart',
        { productId, quantity },
        getAuthConfig()
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/cart/${productId}`,
        getAuthConfig()
      );
      return productId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  'cart/updateCartQuantity',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/cart/${productId}`,
        { quantity },
        getAuthConfig()
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    loading: false,
    error: null
  },
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    // Add to reducers object:
    updateCartQuantityLocal: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemIndex = state.cartItems.findIndex(item => item.product?._id === productId);
      if (itemIndex > -1) {
        state.cartItems[itemIndex].quantity = quantity;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(
          item => item.product?._id !== action.payload
        );
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        // Update the specific item in cart
        const updatedItem = action.payload;
        const itemIndex = state.cartItems.findIndex(
          item => item.product?._id === updatedItem.product?._id
        );
        if (itemIndex > -1) {
          state.cartItems[itemIndex] = updatedItem;
        }
      });
  }
});

export const { clearCart, updateCartQuantityLocal } = cartSlice.actions;
export default cartSlice.reducer;
