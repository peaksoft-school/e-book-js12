import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		updateProfile: build.mutation<
			PROFILE.UpdateProfileResponse,
			PROFILE.UpdateProfileRequest
		>({
			query: (data) => ({
				url: `/api/user/updateVendorProfile`,
				method: 'PUT',
				body: data
			}),
			invalidatesTags: ['update']
		})
	})
});

export const { useUpdateProfileMutation } = api;
