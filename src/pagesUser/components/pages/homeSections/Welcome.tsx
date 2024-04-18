import { FC } from 'react';
import scss from './Welcome.module.scss';
import Ebooks from '../eBooks/Ebooks';

const Welcome: FC = () => {
	return (
		<>
			<section className={scss.Welcome}>
				<div className="container">
					<div className={scss.content}>
						<h1>Welcome, User!</h1>
						<Ebooks />
					</div>
				</div>
			</section>
		</>
	);
};
export default Welcome;
