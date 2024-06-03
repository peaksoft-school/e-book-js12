import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getAllUsers: build.query<
			USERS.GetAllUsersResponse,
			USERS.GetAllUsersRequest
		>({
			query: () => ({
				url: '/api/client/getAllClients',
				method: 'GET'
			}),
			providesTags: ['users']
		}),

		getUserProfile: build.query<
			USERS.GetUserProfileResponse,
			USERS.GetUserProfileRequest
		>({
			query: (userId) => ({
				url: `/api/client/getProfileById/${userId}`,
				method: 'GET'
			}),
			providesTags: ['users']
		}),

		deleteUserById: build.mutation<
			USERS.DeleteUserByIdResponse,
			USERS.DeleteUserByIdRequest
		>({
			query: (clientId) => ({
				url: `/api/client/removeClint/${clientId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['users']
		})
	})
});

export const {
	useGetAllUsersQuery,
	useGetUserProfileQuery,
	useDeleteUserByIdMutation
} = api;
