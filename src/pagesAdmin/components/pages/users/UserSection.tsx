import DeleteIcon from '@/src/assets/icons/icon-delete';
import scss from './UsersSection.module.scss';
import { useNavigate } from 'react-router-dom';

const UserSection = () => {
	const navigate = useNavigate();

	const usersData = [
		{
			id: Math.random(),
			number: 1,
			fullName: 'Мыктыбек Мыктыбеков',
			gmail: 'myktybek@gmail.com'
		},
		{
			id: Math.random(),
			number: 2,
			fullName: 'Мыктыбек Мыктыбеков',
			gmail: 'myktybek@gmail.com'
		},
		{
			id: Math.random(),
			number: 3,
			fullName: 'Мыктыбек Мыктыбеков',
			gmail: 'myktybek@gmail.com'
		}
	];

	return (
		<section className={scss.UserSection}>
			<div className={scss.container}>
				<div className={scss.content}>
					<div className={scss.properties_container}>
						<div className={scss.properties}>
							<p className={scss.number_property}>№</p>
							<p className={scss.full_name_property}>ФИО</p>
							<p className={scss.gmail_property}>Почта</p>
						</div>
					</div>
					{usersData.map((item) => (
						<div key={item.id} className={scss.user_data_container}>
							<div
								className={scss.user_data}
								onClick={() => navigate(`/admin/users_page`)}
							>
								<p className={scss.number}>{item.number}</p>
								<div className={scss.data_user}>
									<p className={scss.full_name}>{item.fullName}</p>
									<p className={scss.gmail}>{item.gmail}</p>
								</div>
							</div>
							<button className={scss.delete_button}>
								<DeleteIcon />
							</button>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default UserSection;
