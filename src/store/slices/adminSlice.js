import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Helper to get token
const getConfig = (getState) => {
    const { auth: { userInfo } } = getState();
    return {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    };
};

export const fetchDashboardStats = createAsyncThunk(
    'admin/fetchStats',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${API_URL}/admin/dashboard/stats`, getConfig(getState));
            return data;
        } catch (error) {
            // Mock data if backend fails/not implemented fully
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchUsers = createAsyncThunk(
    'admin/fetchUsers',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${API_URL}/admin/users`, getConfig(getState));
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async (id, { getState, rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/admin/users/${id}`, getConfig(getState));
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchAdminProducts = createAsyncThunk(
    'admin/fetchProducts',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${API_URL}/products`); // Products are public usually, but for admin we might want separate endpoint if needed. Using public for now.
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const createProduct = createAsyncThunk(
    'admin/createProduct',
    async (productData, { getState, rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${API_URL}/products`, productData, getConfig(getState));
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const updateProduct = createAsyncThunk(
    'admin/updateProduct',
    async ({ id, productData }, { getState, rejectWithValue }) => {
        try {
            const { data } = await axios.put(`${API_URL}/admin/products/${id}`, productData, getConfig(getState));
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'admin/deleteProduct',
    async (id, { getState, rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/admin/products/${id}`, getConfig(getState));
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        users: [],
        products: [],
        orders: [],
        stats: null,
        loading: false,
        error: null,
        success: false
    },
    reducers: {
        resetStatus: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Users
            .addCase(fetchUsers.pending, (state) => { state.loading = true; })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users; // Fixed: Extract users array
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete User
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user._id !== action.payload);
            })
            // Fetch Products
            .addCase(fetchAdminProducts.pending, (state) => { state.loading = true; })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            // Create Product
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
                state.success = true;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Update Product
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
                state.success = true;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Delete Product
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(p => p._id !== action.payload);
            })
            // Stats
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                state.stats = action.payload;
            });
    }
});

export const { resetStatus } = adminSlice.actions;
export default adminSlice.reducer;
