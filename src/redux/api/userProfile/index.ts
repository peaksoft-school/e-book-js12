import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		clientProfile: build.mutation<
			USERPROFILE.UserProfileResponse,
			USERPROFILE.UserProfileRequest
		>({
			query: (newData) => ({
				url: `/api/client/updateClient`,
				method: 'PUT',
				body: newData
			}),
			invalidatesTags: ['clientProfile']
		})
	})
});

export const { useClientProfileMutation } = api;
