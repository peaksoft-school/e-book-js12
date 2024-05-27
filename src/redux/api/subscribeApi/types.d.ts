/* eslint-disable @typescript-eslint/no-unused-vars */

namespace SUBSCRIBE {
	type SubscribeResponse = {
		success: boolean;
		message: string;
	}[];

	type SubscribeRequest = {
		clientEmail: string;
	};
}
