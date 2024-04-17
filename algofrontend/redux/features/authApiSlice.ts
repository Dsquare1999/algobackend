import { LoginSchema, RegisterSchema } from '@/schemas';
import { apiSlice } from '../services/apiSlice';
import { z } from 'zod';

interface User {
	first_name: string;
	last_name: string;
	email: string;
}

interface SocialAuthArgs {
	provider: string;
	state: string;
	code: string;
}

interface CreateUserResponse {
	success: boolean;
	user: User;
}

let refresh_token: string | null = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') ? JSON.parse(localStorage.getItem('refresh_token')!) : "": "";

const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		retrieveUser: builder.query<User, void>({
			query: () => '/auth/users/me/',
		}),
		socialAuthenticate: builder.mutation<CreateUserResponse,SocialAuthArgs>({
			query: ({ provider, state, code }) => ({
				url: `/o/${provider}/?state=${encodeURIComponent(
					state
				)}&code=${encodeURIComponent(code)}&redirect_uri=
				${encodeURIComponent('http://localhost:3000/auth/google/')}`,
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			}),
		}),
		login: builder.mutation({
			query: ({ email, password } : z.infer<typeof LoginSchema>) => ({
				url: '/auth/login/',
				method: 'POST',
				body: { email, password },
			}),
		}),
		register: builder.mutation({
			query: ({
				first_name,
				last_name,
				email,
				password,
				password2,
			} : z.infer<typeof RegisterSchema>) => ({
				url: '/auth/register/',
				method: 'POST',
				body: { first_name, last_name, email, password, password2 },
			}),
		}),
		verify: builder.mutation({
			query: () => ({
				url: '/auth/jwt/verify/',
				method: 'POST',
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: '/auth/logout/',
				method: 'POST',
				body : { refresh_token }
			}),
		}),
		activation: builder.mutation({
			query: ({ uid, token }) => ({
				url: '/auth/users/activation/',
				method: 'POST',
				body: { uid, token },
			}),
		}),
		resetPassword: builder.mutation({
			query: email => ({
				url: '/auth/users/reset_password/',
				method: 'POST',
				body: { email },
			}),
		}),
		resetPasswordConfirm: builder.mutation({
			query: ({ uid, token, new_password, re_new_password }) => ({
				url: '/auth/users/reset_password_confirm/',
				method: 'POST',
				body: { uid, token, new_password, re_new_password },
			}),
		}),
	}),
});

export const {
	useRetrieveUserQuery,
	useSocialAuthenticateMutation,
	useLoginMutation,
	useRegisterMutation,
	useVerifyMutation,
	useLogoutMutation,
	useActivationMutation,
	useResetPasswordMutation,
	useResetPasswordConfirmMutation,
} = authApiSlice;