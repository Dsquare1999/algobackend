import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { setAuth, logout } from '../features/authSlice';
import { Mutex } from 'async-mutex';

import { jwtDecode } from 'jwt-decode';
import dayjs from "dayjs";
import axios from 'axios';

const mutex = new Mutex();
const baseURL = `${process.env.NEXT_PUBLIC_HOST}/api/v1`

const baseQuery = fetchBaseQuery({ 
    baseUrl: baseURL,
	credentials: 'include',
    prepareHeaders: async (headers) => {
		if (typeof window !== 'undefined') {
			let accessToken: string | null = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : "";
			let refresh_token: string | null = localStorage.getItem('refresh_token') ? JSON.parse(localStorage.getItem('refresh_token')!) : "";

			headers.set('Authorization', localStorage.getItem('token') ? `Bearer ${accessToken}` : "" )

			if (accessToken) {
				console.log("Refresh Token", refresh_token)

				headers.set('Authorization', localStorage.getItem('token') ? `Bearer ${accessToken}` : "")
				const user: { exp: number } = jwtDecode(accessToken);
				const isExpired: boolean = dayjs.unix(user.exp).diff(dayjs()) < 1;
				headers.set('Authorization', 'Bearer ' + accessToken)
				if (!isExpired) return headers;
				try {
					const resp = await axios.post(`${baseURL}/auth/token/refresh/`, { refresh: refresh_token });
					localStorage.setItem('token', JSON.stringify(resp.data.access));
					headers.set('Authorization', `Bearer ${resp.data.access}`)

				} catch (error) {
					console.error('Error refreshing token:', error);
				}
			} else {
				headers.set('Authorization', localStorage.getItem('token') ? `Bearer ${JSON.parse(localStorage.getItem('token')!)}` : "")
			}
		}
      
	  return headers;
    },
  })
const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	await mutex.waitForUnlock();
	let result = await baseQuery(args, api, extraOptions);

	if (result.error && result.error.status === 401) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
			try {

				const refreshResult = await baseQuery(
					{
						url: '/auth/token/refresh/',
						method: 'POST',
					},
					api,
					extraOptions
				);
				if (refreshResult.data) {
					api.dispatch(setAuth());

					result = await baseQuery(args, api, extraOptions);
				} else {
					api.dispatch(logout());
				}
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await baseQuery(args, api, extraOptions);
		}
	}
	return result;
};

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithReauth,
	endpoints: builder => ({}),
});