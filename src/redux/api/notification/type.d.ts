/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NOTIFICATION {
	type GetNotificationRequest = void;
	type GetNotificationResponse = {
		isNew: boolean;
		id: number;
		createdAt: number;
		vendorId: number;
		bookId: number;
		message: string;
		notificationType: string;
	}[];

	type DeleteNotificationResponse = {
		httpStatus: string;
		message: string;
	};
	type DeleteNotificationRequest = { notificationId: number };
}
