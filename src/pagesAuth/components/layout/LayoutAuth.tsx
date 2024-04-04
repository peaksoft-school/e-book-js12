import scss from './LayoutAuth.module.scss';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';

const LayoutAuth = () => {
	return (
		<>
			<div className={scss.layout}>
				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
					</Routes>
				</main>
			</div>
		</>
	);
};
export default LayoutAuth;
