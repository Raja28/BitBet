import { createSlice, } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const initialState = {
    isAuthenticated: localStorage.getItem("isAuthenticated") ? JSON.parse(localStorage.getItem("isAuthenticated")) : false,
    loading: false,
    user: localStorage.getItem("isAuthenticated") ? JSON.parse(localStorage.getItem("user")) : null,
    error: null,
};

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setLoading: (state, { payload }) => {
            state.loading = payload !== state.loading ? payload : true;
            state.error = state.error ? null : state.error;
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.error = null;
            state.isAuthenticated = true;
            state.loading = false;
        },

        logoutSuccess: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            state.loading = false;
        },
        authError: (state, action) => {
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
            state.error = action.payload;
        },
        removeFromFavoritesSuccess: (state, action) => {
            const favorites = state.user.favorites.filter((favorite) => favorite.match_id !== action.payload);
            state.user.favorites = favorites;
            localStorage.setItem('user', JSON.stringify(state.user));
        },
        addToFavoritesSuccess: (state, action) => {
            state.user.favorites = action.payload;
            localStorage.setItem('user', JSON.stringify(state.user));
        },
    }
})


export const login = (email, password) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.post(
            BASE_URL + `/api/auth/login`,
            { email, password },
            { withCredentials: true }
        );

        const { data } = response.data

        dispatch(loginSuccess(data));
        localStorage.setItem('isAuthenticated', "true");
        localStorage.setItem('user', JSON.stringify(data));
        // localStorage.setItem('favorites', JSON.stringify(data.favorites));
        return { success: true };
    } catch (err) {
        console.error("Login API call FAILED! Full error object:", err);
        const errorMessage = err.response?.data?.message || "Login failed.";
        localStorage.removeItem('jwtToken');
        dispatch(authError(errorMessage));
        return { success: false, error: errorMessage };
    }
};

export const register = (name, email, password, confirmPassword) => async (dispatch) => {
    dispatch(setLoading(true));
    console.log("🚀 Starting signup process...");

    try {
        await axios.post(BASE_URL + '/api/auth/register', { name, email, password, confirmPassword });

        await dispatch(login(email, password));

    } catch (err) {
        const errorMessage = err.response?.data?.message || "Signup failed. The user might already exist.";
        console.error("❌ Signup process failed:", errorMessage);
        dispatch(authError(errorMessage));
        return { success: false, error: errorMessage };
    }
};

export const logout = () => async (dispatch) => {
    console.log("✅ Running robust logout function.");

    return await (async () => {
        try {
            await axios.post(BASE_URL + '/api/auth/logout', {}, { withCredentials: true });
            console.log(" Successfully told backend to clear the token cookie.");
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('user');

        } catch (error) {
            console.error("Logout API call failed, but proceeding with frontend cleanup.", error);
        } finally {
            sessionStorage.removeItem('jwtToken');
            dispatch(logoutSuccess());
            console.log("✅ Cleared localStorage and Redux state.");
        }
    })();
};


export const { setLoading, loginSuccess, logoutSuccess, authError, removeFromFavoritesSuccess, addToFavoritesSuccess } = authSlice.actions;
export default authSlice.reducer;