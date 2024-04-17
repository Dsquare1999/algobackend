"use client"
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
}
const initialState = {
	isAuthenticated: false,
	isLoading: true,
} as AuthState;

if (typeof window !== 'undefined') {
	let accessToken: string | null = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : null;
	initialState.isAuthenticated = !!accessToken
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: state => {
			state.isAuthenticated = true;
		},
		logout: state => {
			state.isAuthenticated = false;
			localStorage.removeItem('token')
			localStorage.removeItem('refresh_token')
			localStorage.removeItem('user')
		},
		finishInitialLoad: state => {
			state.isLoading = false;
		},
	},
});

export const { setAuth, logout, finishInitialLoad } = authSlice.actions;
export default authSlice.reducer;