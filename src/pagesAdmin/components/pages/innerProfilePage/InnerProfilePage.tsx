import scss from './InnerProfilePage.module.scss'
import { useState } from 'react';
import ProfileHistory from '../profileHistory/ProfileHistory';
import InnerPage from '../innerPage/InnerPage';

const InnerProfilePage = () => {

  const [activeComponent, setActiveComponent] = useState('history');

	const handleComponentChange = (component: 'info' | 'history') => {
		setActiveComponent(component);
	};

  return (
    <div className={scss.profile_page_container}>
    <div className="container">
      <div className={scss.test}>
        <p className={scss.head_text}>
          <span>Пользователи / </span>  Мыктыбек Мыктыбеков
        </p>
        <div className={scss.profile_text}>
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
      {activeComponent === 'info' ? <InnerPage /> : <ProfileHistory />}
    </div>
  </div>
  )
}

export default InnerProfilePage