import { FC } from 'react';
import scss from './Welcome.module.scss';
import InformationBook from '../informationBook/InformationBook';
import AudioBooks from '../audioBooks/AudioBooks';

const Welcome: FC = () => {
	return (
		<>
			<section className={scss.Welcome}>
				<div className="container">
					<div className={scss.content}>
						<h1>Welcome, User!</h1>
						<AudioBooks />
						<InformationBook />
					</div>
				</div>
			</section>
		</>
	);
};
export default Welcome;
