import CustomGenreInput from '@/src/ui/customInpute/CustomGenreInput';
import scss from './Header.module.scss';
import { useEffect, useState } from 'react';
import { IconRedDot, IconTest } from '@/src/assets/icons';
import LogoeBook from '@/src/ui/logoeBook/LogoeBook';

import { IconUserCircle } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import ExitModal from '@/src/ui/customModals/ExitModal';

const Header = () => {
	const [headerScroll, setHeaderScroll] = useState<boolean>(false);
	const [isUser, setIsUser] = useState<boolean>(false);
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
				<div
					className={
						headerScroll ? `${scss.scroll} ${scss.active}` : `${scss.scroll}`
					}
				>
					<div className="container">
						<div className={scss.content}>
							<div className={scss.header_content}>
								<div className={scss.logo_content}>
									<LogoeBook />
								</div>
								<div className={scss.input_vontent}>
									<CustomGenreInput placeholder="Искать жанр, книги, авторов, издательства... " />
								</div>
								<div className={scss.right_content}>
									<div className={scss.notice_icon}>
										<span>
											<IconTest />
										</span>
										<span>
											<IconRedDot />
										</span>
									</div>
									<div
										onClick={() => setIsUser(!isUser)}
										className={scss.profile}
									>
										<p>
											<IconUserCircle />
										</p>
									</div>
									{
										<>
											<div
												className={`${isUser ? scss.user_drop : scss.user_down}`}
											>
												<ul>
													<li
														onClick={() => {
															navigate('/profile');
														}}
													>
														Профиль
													</li>
													<hr />
													<li onClick={() => setUserExit(!userExit)}>Выйти</li>
												</ul>
											</div>
										</>
									}
									{userExit ? (
										<>
											<ExitModal
												isOpen={userExit}
												onClose={() => setUserExit(false)}
												btnClose={() => {
													navigate('/auth/login');
												}}
											/>
										</>
									) : null}
								</div>
							</div>

							<div className={scss.search_input}>
								<CustomGenreInput placeholder="Искать жанр, книги, авторов, издательства... " />
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
