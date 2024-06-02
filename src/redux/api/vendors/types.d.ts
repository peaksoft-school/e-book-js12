namespace VENDORS {
	type GetAllVendorsResponse = {
		totalElements: number;
		totalPages: number;
		first: boolean;
		last: boolean;
		size: number;
		content: [
			{
				id: number;
				fullName: string;
				email: string;
				phoneNumber: string;
				amountOfBook: number;
			}
		];
		number: number;
		sort: {
			empty: boolean;
			sorted: boolean;
			unsorted: boolean;
		};
		pageable: {
			offset: number;
			sort: {
				empty: boolean;
				sorted: boolean;
				unsorted: boolean;
			};
			pageNumber: number;
			pageSize: number;
			paged: boolean;
			unpaged: boolean;
		};
		numberOfElements: number;
		empty: boolean;
	};
	type GetAllVendorsRequest = void;

	type GetVendorByIdResponse = {
		vendorId: number;
		firstName: string;
		lastName: string;
		phoneNumber: string;
		email: string;
		dateOfRegistration: string;
	};
	type GetVendorByIdRequest = number;

	type DeleteVendorResponse = {
		httpStatus: string;
		message: string;
	}[];
	type DeleteVendorRequest = number;

	type DeleteVendorProfileResponse = {
		httpStatus: string;
		message: string;
	}[];
	type DeleteVendorProfileRequest = number;
}
