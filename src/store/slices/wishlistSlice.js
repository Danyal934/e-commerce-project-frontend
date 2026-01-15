import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosConfig';

export const getWishlist = createAsyncThunk(
    'wishlist/getWishlist',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/users/wishlist');
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const toggleWishlist = createAsyncThunk(
    'wishlist/toggleWishlist',
    async (productId, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/users/wishlist', { productId });
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        wishlistItems: [],
        loading: false,
        error: null
    },
    reducers: {
        clearWishlist: (state) => {
            state.wishlistItems = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlistItems = action.payload;
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(toggleWishlist.fulfilled, (state, action) => {
                state.wishlistItems = action.payload;
            });
    }
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
