import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		postRegistration: build.mutation<
			AUTHORIZATION.RegistrationResponse,
			AUTHORIZATION.RegistrationRequest
		>({
			query: (data) => ({
				url: '/api/auth/signUpForClient',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['me']
		}),
		postLogin: build.mutation<
			AUTHORIZATION.LoginResponse,
			AUTHORIZATION.LoginRequest
		>({
			query: (data) => ({
				url: '/api/auth/signIn',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['me']
		}),
		ConfirmEmail: build.mutation<
			AUTHORIZATION.ConfirmEmailResponse,
			AUTHORIZATION.ConfirmEmailRequest
		>({
			query: (newData) => ({
				url: '/api/auth/confirmEmail',
				method: 'POST',
				body: newData
			}),
			invalidatesTags: ['me']
		}),
		postWithGoogle: build.mutation({
			query: (data) => ({
				url: `/api/auth/authWithGoogle?Token=${data.idToken}`,
				method: 'POST'
			}),
			invalidatesTags: ['me']
		}),
		postVendorRegistration: build.mutation<
			AUTHORIZATION.VendorRegistrationResponse,
			AUTHORIZATION.VendorRegistrationRequest
		>({
			query: (data) => ({
				url: '/api/auth/signUpForVendor',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['me']
		}),
		SendEmailForgotPassword: build.mutation<
			AUTHORIZATION.SendEmailResponse,
			AUTHORIZATION.SendEmailRequest
		>({
			query: (email) => ({
				url: '/api/user/send/email',
				method: 'POST',
				params: {
					toEmail: email
				}
			}),
			invalidatesTags: ['me']
		}),
		ResetPassword: build.mutation({
			query: (newData) => ({
				url: '/api/user/reset/password',
				method: 'PUT',
				body: newData
			})
		})
	})
});

export const {
	usePostRegistrationMutation,
	usePostLoginMutation,
	usePostWithGoogleMutation,
	usePostVendorRegistrationMutation,
	useConfirmEmailMutation,
	useSendEmailForgotPasswordMutation,
	useResetPasswordMutation
} = api;
