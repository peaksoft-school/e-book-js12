/* eslint-disable @typescript-eslint/no-unused-vars */

namespace SUBSCRIBE {
	type SubscribeResponse = {
		data?: {
			success: boolean;
			message: string;
		};
		error: {
			data: {
				success: boolean;
				message: string;
			};
		};
	};

	type SubscribeRequest = {
		clientEmail: string;
	};
}
