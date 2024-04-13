import { FC } from 'react';
import scss from './Welcome.module.scss';
import AudioBooks from '../audioBooks/AudioBooks';

const Welcome: FC = () => {
	return (
		<>
			<section className={scss.Welcome}>
				<div className="container">
					<div className={scss.content}>
						<h1>Welcome, User!</h1>
						<AudioBooks />
					</div>
				</div>
			</section>
		</>
	);
};
export default Welcome;
