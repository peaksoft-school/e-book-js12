import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		postSignUp: build.mutation({
			query: (data) => {
				console.log('asd0');
				console.log(data,'checkout');
				return {
					url: '/api/auth/signUpForClient',
					method: 'POST',
					body: data
				};
			},
			invalidatesTags: ['me']
		})
	})
});

export const { usePostSignUpMutation } = api;
