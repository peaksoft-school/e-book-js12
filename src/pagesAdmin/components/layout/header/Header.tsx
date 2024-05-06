import CustomGenreInput from '@/src/ui/customInpute/CustomGenreInput';
import scss from './Header.module.scss';
import { useEffect, useState } from 'react';
import { IconUserCircle } from '@tabler/icons-react';
import ExitModal from '@/src/ui/customModals/ExitModal';

const Header = () => {
	const [, setHeaderScroll] = useState<boolean>(false);
	const [isProfile, setIsProfile] = useState(false);
	const [userExit, setUserExit] = useState<boolean>(false);

	useEffect(() => {
		const changeHeader = () => {
			if (window.scrollY >= 10) {
				setHeaderScroll(true);
			} else {
				setHeaderScroll(false);
			}
		};

		changeHeader();
		window.addEventListener('scroll', changeHeader);

		return () => {
			window.removeEventListener('scroll', changeHeader);
		};
	}, []);

	return (
		<>
			<header className={scss.Header}>
				<div className={scss.container}>
					<div className={scss.content}>
						<div className={scss.search}>
							<CustomGenreInput
								placeholder={'Искать жанр, книги, авторов, издательства... '}
							/>
						</div>
						<button
							className={scss.user}
							onClick={() => setIsProfile(!isProfile)}
						>
							<IconUserCircle />
							<span>Администратор</span>
						</button>
						<div className={`${isProfile ? scss.adminProfile : scss.none}`}>
							<ul>
								<li onClick={() => setUserExit(!userExit)}>Выйти</li>
							</ul>
						</div>
						{userExit ? (
							<>
								<ExitModal
									btnClose={() => {}}
									isOpen={userExit}
									onClose={() => {
										setUserExit(false);
										setIsProfile(false);
									}}
								/>
							</>
						) : null}
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
