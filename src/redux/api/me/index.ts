import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		postRegistration: build.mutation({
			query: (data) => ({
				url: '/api/auth/signUpForClient',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['me']
		}),
		postLogin: build.mutation({
			query: (data) => ({
				url: '/api/auth/signIn',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['me']
		}),
		postWithGoogle: build.mutation({
			query: (tokenGoogle) => (
				console.log(tokenGoogle, 'test'),
				{
					url: '/api/auth/authWithGoogle',
					method: 'POST',
					body: tokenGoogle
				}
			),
			invalidatesTags: ['me']
		})
	})
});

export const {
	usePostRegistrationMutation,
	usePostLoginMutation,
	usePostWithGoogleMutation
} = api;
