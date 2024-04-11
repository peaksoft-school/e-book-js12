import { FC } from 'react';
import scss from './Welcome.module.scss';
import AudioBooks from '../audioBooks/AudioBooks';
import SubscribePage from '../subscribePage/SubscribePage';

const Welcome: FC = () => {
	return (
		<>
			<section className={scss.Welcome}>
				<div className="container">
					<div className={scss.content}>
						<h1>Welcome, User!</h1>
						<AudioBooks />
						<SubscribePage />
					</div>
				</div>
			</section>
		</>
	);
};
export default Welcome;
