import {
	useDeleteNotificationMutation,
	useGetNotificationQuery
} from '@/src/redux/api/notification';
import { Link, useLocation } from 'react-router-dom';
import { IconSuccess } from '@/src/assets/icons';
import scss from './NotificationPage.module.scss';
import { IconError404 } from '@tabler/icons-react';

const NotificationPage = () => {
	const { data: notifications, isLoading, error } = useGetNotificationQuery();

	const [deleteNotification] = useDeleteNotificationMutation();

	const location = useLocation();

	const handleDeleteNotification = (notificationId: number) => {
		deleteNotification({ notificationId });
	};

	const handleDeleteAllNotification = () => {
		notifications?.forEach((notification) => {
			handleDeleteNotification(notification.id);
		});
	};

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error loading notifications</p>;

	return (
		<div className={scss.NotificationPage}>
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
				<div className={scss.handleDeleteAllNotification}>
					<button onClick={handleDeleteAllNotification}>Удалить все</button>
				</div>
				{notifications!.length > 0 ? (
					<ul>
						{notifications!.map((notification) => (
							<li key={notification.id}>
								<p>{notification.message}</p>
								<p>{new Date(notification.createdAt).toLocaleString()}</p>
								<span>
									{notification.notificationType === 'APPROVE' ? (
										<IconSuccess />
									) : (
										<IconError404 />
									)}
								</span>
								<button
									onClick={() => handleDeleteNotification(notification.id)}
								>
									Удалить
								</button>
							</li>
						))}
					</ul>
				) : (
					<p>Нет доступных уведомлений</p>
				)}
			</div>
		</div>
	);
};

export default NotificationPage;
