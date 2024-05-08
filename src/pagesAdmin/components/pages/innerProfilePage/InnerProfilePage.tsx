import scss from './InnerProfilePage.module.scss';
import { useState } from 'react';
import ProfileHistory from '../profileHistory/ProfileHistory';
import InnerPage from '../innerPage/InnerPage';

const InnerProfilePage = () => {
	const [activeComponent, setActiveComponent] = useState('info');

	const handleComponentChange = (component: 'info' | 'history') => {
		setActiveComponent(component);
	};

	return (
		<div className={scss.inner_profile_page_container}>
			<div className="container">
				<div className={scss.inner_test}>
					<p className={scss.inner_head_text}>
						<span>Пользователи / </span> Мыктыбек Мыктыбеков
					</p>
					<div className={scss.inner_profile_text}>
						<p
							className={
								activeComponent === 'info'
									? `${scss.inner_text_one} ${scss.active}`
									: scss.inner_text_one
							}
							onClick={() => handleComponentChange('info')}
						>
							Личная информация
						</p>
						<p
							className={
								activeComponent === 'history'
									? `${scss.inner_text_two} ${scss.active}`
									: scss.inner_text_two
							}
							onClick={() => handleComponentChange('history')}
						>
							История операций
						</p>
					</div>
				</div>
				{activeComponent === 'info' ? <InnerPage /> : <ProfileHistory />}
			</div>
		</div>
	);
};

export default InnerProfilePage;
