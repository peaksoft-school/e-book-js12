import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getChange: build.query<PROFILE.UpdateProfileResponse, void>({
			query: () => ({
				url: '/api/user/updateVendorProfile',
				method: 'GET'
			}),
			providesTags: ['change']
		}),
		postChangeBook: build.mutation<PROFILE.UpdateProfileResponse, PROFILE.UpdateProfileRequest>({
			query: (newData) => ({
				url: '/api/user/updateVendorProfile',
				method: 'POST',
				body: newData
			}),
			invalidatesTags: ['change']
		}),
		updateUserProfile: build.mutation<PROFILE.UpdateProfileResponse, PROFILE.UpdateProfileRequest>({
			query: (profileData) => ({
				url: '/api/user/updateVendorProfile',
				method: 'PUT',
				body: profileData
			}),
			invalidatesTags: ['change']
		})
	})
});

export const { useGetChangeQuery, usePostChangeBookMutation, useUpdateUserProfileMutation } = api;
