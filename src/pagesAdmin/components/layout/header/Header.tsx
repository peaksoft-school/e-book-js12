import CustomGenreInput from '@/src/ui/customInpute/CustomGenreInput';
import scss from './Header.module.scss';
import { useEffect, useRef, useState } from 'react';
import { IconUserCircle } from '@tabler/icons-react';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSearchBooksQuery } from '@/src/redux/api/search';

const Header = () => {
	const [, setHeaderScroll] = useState<boolean>(false);
	const [isProfile, setIsProfile] = useState(false);
	const [userExit, setUserExit] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [showResults, setShowResults] = useState<boolean>(false);
	const { data: searchResults, refetch } = useSearchBooksQuery(
		{ searchTerm },
		{ skip: !searchTerm }
	);
	const navigate = useNavigate();
	const searchResultsRef = useRef<HTMLDivElement>(null);

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

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				searchResultsRef.current &&
				!searchResultsRef.current.contains(event.target as Node)
			) {
				setShowResults(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleExitAdmin = () => {
		localStorage.removeItem('token');
		localStorage.setItem('client', 'false');
		localStorage.setItem('vendor', 'false');
		localStorage.setItem('admin', 'false');
		localStorage.setItem(
			'EBOOK',
			JSON.stringify({
				role: 'GUEST',
				email: '',
				firstName: '',
				id: 0,
				token: ''
			})
		);
		navigate('/');
	};

	const handleBookClick = (id: number) => {
		navigate(`/admin/books/${id}`);
		setShowResults(false);
		setSearchTerm('');
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchTerm(value);
		setShowResults(!!value);
		refetch();
	};

	return (
		<>
			<header className={scss.Header}>
				<div className={scss.container}>
					<div className={scss.content}>
						<div className={scss.searchResults}>
							<div className={scss.search}>
								<CustomGenreInput
									onChange={handleSearchChange}
									value={searchTerm}
									placeholder="Искать жанр, книги, авторов, издательства..."
								/>
							</div>
							<div className={scss.lii}>
								{showResults && searchResults && (
									<div className={scss.searchResultsLi}>
										<ul>
											{searchResults.map((book) => (
												<li
													onClick={() => handleBookClick(book.id)}
													key={book.id}
												>
													<div>
														<p>{book.title}</p>
													</div>
												</li>
											))}
										</ul>
									</div>
								)}
							</div>
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
											handleExitAdmin();
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
