import CustomGenreInput from '@/src/ui/customInpute/CustomGenreInput';
import scss from './Header.module.scss';
import { useEffect, useState } from 'react';
import { IconUserCircle } from '@tabler/icons-react';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

const Header = () => {
	const [, setHeaderScroll] = useState<boolean>(false);
	const [isProfile, setIsProfile] = useState(false);
	const [userExit, setUserExit] = useState<boolean>(false);
	const navigate = useNavigate();

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
								onChange={() => {}}
								value=""
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
						<Modal
							open={userExit}
							footer={false}
							onCancel={() => {
								setUserExit(false);
							}}
						>
							<div className={scss.modal_exit_content}>
								<div className={scss.modal_text}>
									<p>Вы уверены, что хотите выйти?</p>
								</div>
								<div className={scss.modal_btn}>
									<button
										onClick={() => {
											setUserExit(!userExit);
										}}
									>
										Отменить
									</button>
									<button
										onClick={() => {
											navigate('/auth/login');
										}}
									>
										Выйти
									</button>
								</div>
							</div>
						</Modal>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
