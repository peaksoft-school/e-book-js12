import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getAllVendors: build.query<
			VENDORS.GetAllVendorsResponse,
			VENDORS.GetAllVendorsRequest
		>({
			query: () => ({
				url: '/api/user/vendors',
				method: 'GET'
			}),
			providesTags: ['vendors']
		}),

		getVendorById: build.query<
			VENDORS.GetVendorByIdResponse,
			VENDORS.GetVendorByIdRequest
		>({
			query: (vendorId) => ({
				url: `/api/user/getVendorById/${vendorId}`,
				method: 'GET'
			}),
			providesTags: ['vendors']
		}),

		deleteVendor: build.mutation<
			VENDORS.DeleteVendorResponse,
			VENDORS.DeleteVendorRequest
		>({
			query: (id) => ({
				url: `/api/user/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['vendors']
		}),

		deleteVendorProfile: build.mutation<
			VENDORS.DeleteVendorProfileResponse,
			VENDORS.DeleteVendorProfileRequest
		>({
			query: (vendorID) => ({
				url: `/api/user/${vendorID}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['vendors']
		})
	})
});

export const {
	useGetAllVendorsQuery,
	useGetVendorByIdQuery,
	useDeleteVendorMutation,
	useDeleteVendorProfileMutation
} = api;
