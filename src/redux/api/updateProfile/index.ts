import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		updateProfile: build.mutation<
			PROFILE.UpdateProfileResponse,
			PROFILE.UpdateProfileRequest
		>({
			query: (newData) => ({
				url: '/api/user/updateVendorProfile',
				method: 'PUT',
				body: newData
			}),
			invalidatesTags: ['update']
		}),
		getProfile: build.query<INFO.UpdateInfoProfileResponse, void>({
			query: () => ({
				url: '/api/user/getProfile',
				method: 'GET'
			}),
			providesTags: ['update']
		}),
		updatePassword: build.mutation<
			PASSWORD.UpdatePasswordResponse,
			PASSWORD.UpdatePasswordRequest
		>({
			query: (passwordData) => ({
				url: '/api/user/updatePassword',
				method: 'PUT',
				body: passwordData
			}),
			invalidatesTags: ['update']
		})
	})
});

export const {
	useUpdateProfileMutation,
	useGetProfileQuery,
	useUpdatePasswordMutation
} = api;
