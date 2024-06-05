import { useState } from 'react';
import ProfilePageHistory from '../profileHistory/ProfilePageHistory';
import ProfilePage from '../profilePage/ProfilePage';
import scss from './ProfilePageContainer.module.scss';
import { Link } from 'react-router-dom';

const ProfilePageContainer = () => {
	const [activeComponent, setActiveComponent] = useState('history');

	const handleComponentChange = (component: 'info' | 'history') => {
		setActiveComponent(component);
	};

	return (
		<section className={scss.ProfileSectionContainer}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.test}>
						<div className={scss.links}>
							<Link
								to={'/'}
								className={`${scss.link_to_home} ${location.pathname === '/' ? scss.link_to_home_active : ''}`}
							>
								Главная
							</Link>
							/
							<Link
								to={'/profile'}
								className={`${scss.link_to_basket} ${location.pathname === 'basket' ? scss.link_to_basket_active : ''}`}
							>
								Профиль
							</Link>
						</div>
						<div className={scss.profile_text}>
							<div className={scss.navigate_title}>
								<p
									className={
										activeComponent === 'info'
											? `${scss.text_one} ${scss.active}`
											: scss.text_one
									}
									onClick={() => handleComponentChange('info')}
								>
									Личная информация
								</p>
								<p
									className={
										activeComponent === 'history'
											? `${scss.text_two} ${scss.active}`
											: scss.text_two
									}
									onClick={() => handleComponentChange('history')}
								>
									История операций
								</p>
							</div>
						</div>
					</div>
					{activeComponent === 'info' ? (
						<ProfilePage />
					) : (
						<ProfilePageHistory />
					)}
				</div>
			</div>
		</section>
	);
};

export default ProfilePageContainer;
