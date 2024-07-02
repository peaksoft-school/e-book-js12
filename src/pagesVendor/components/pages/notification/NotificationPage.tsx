import {
	useDeleteNotificationMutation,
	useGetNotificationQuery
} from '@/src/redux/api/notification';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CircleXIcon, IconBuyed, IconSuccess } from '@/src/assets/icons';
import scss from './NotificationPage.module.scss';
import { useEffect } from 'react';

const NotificationPage = () => {
	const {
		data: notifications,
		isLoading,
		error,
		refetch
	} = useGetNotificationQuery();
	const [deleteNotification] = useDeleteNotificationMutation();
	const location = useLocation();
	const navigate = useNavigate();

	const handleDeleteNotification = (notificationId: number) => {
		deleteNotification({ notificationId });
	};

	const handleDeleteAllNotifications = () => {
		notifications?.forEach((notification) => {
			handleDeleteNotification(notification.id);
		});
	};

	useEffect(() => {
		refetch();
	}, [location, notifications?.length]);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error loading notifications</p>;

	return (
		<div className={scss.NotificationPage}>
			<div className="container">
				<div>
					<div className={scss.links}>
						<Link
							to="/vendor/home"
							className={`${scss.link_to_home} ${location.pathname === '/vendor/home' ? scss.link_to_home_active : ''}`}
						>
							Главная
						</Link>
						/
						<Link
							to="/vendor/vendor/notification"
							className={`${scss.link_to_addBook} ${location.pathname === '/vendor/vendor/notification' ? scss.link_to_addBook_active : ''}`}
						>
							Уведомление
						</Link>
					</div>
					<div className={scss.content}>
						{notifications && notifications.length >= 2 && (
							<div className={scss.handleDeleteAllNotification}>
								<button onClick={handleDeleteAllNotifications}>
									Удалить все уведомления
								</button>
							</div>
						)}

						{notifications!.length > 0 ? (
							<ul>
								{notifications!.map((notification) => (
									<li
										className={
											notification.notificationType === 'REJECT'
												? `${scss.li} ${scss.liNoticReject}`
												: scss.li
										}
										key={notification.id}
									>
										<div className={scss.test}>
											<div
												className={scss.createdAt}
												onClick={() => navigate(`${notification.bookId}`)}
											>
												<div className={scss.message}>
													<p>
														{notification.notificationType === 'REJECT'
															? 'Админ отклонил ваш запрос!'
															: notification.message}
													</p>
													<p>
														{new Date(notification.createdAt).toLocaleString()}
													</p>
												</div>
												<span>
													{notification.notificationType === 'APPROVE' ? (
														<IconSuccess />
													) : notification.notificationType === 'BUY' ? (
														<IconBuyed />
													) : notification.notificationType === 'REJECT' ? (
														<CircleXIcon />
													) : null}
												</span>
											</div>
											<button
												onClick={() =>
													handleDeleteNotification(notification.id)
												}
											>
												Удалить
											</button>
										</div>
									</li>
								))}
							</ul>
						) : (
							<div className={scss.emptyNotificationContainer}>
								<h1 className={scss.emptyNotification}>
									Нет доступных уведомлений!
								</h1>
								<img
									src="https://static.vecteezy.com/system/resources/previews/004/968/451/original/turn-off-no-message-notification-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-vector.jpg"
									alt="Нет уведомлений"
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotificationPage;
