import { useState } from 'react';
import { Modal } from 'antd';
import scss from './AboutVendorsBooks.module.scss';
import bookImage from '../../../../assets/booksImg/harrry-potter.png';
import ThreeDotIcon from '@/src/assets/icons/icon-threeDot';
import UpIcon from '@/src/assets/icons/icon-upIcon';
import { IconArrowBottom, IconWhiteLike } from '@/src/assets/icons';
import { IconPencil, IconX } from '@tabler/icons-react';

interface Book {
	id: number;
	img: string;
	name: string;
	date: string;
	price: number;
	type?: string;
	hearts?: number;
	inBasket?: number;
}

interface Vendor {}

const AboutVendorsBooks = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isOpenBooksType, setIsOpenBooksType] = useState(false);
	const [selectedType, setSelectedType] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

	const books: Book[] = [
		{
			id: 1,
			img: bookImage,
			name: 'История книги 1',
			date: '20 Feb 2021',
			price: 350,
			type: 'Электронные книги',
			hearts: 12,
			inBasket: 3
		},
		{
			id: 2,
			img: bookImage,
			name: 'История книги 2',
			date: '20 Feb 2021',
			price: 350,
			type: 'Бумажные книги',
			hearts: 12,
			inBasket: 3
		},
		{
			id: 2,
			img: bookImage,
			name: 'История книги 2',
			date: '20 Feb 2021',
			price: 350,
			type: 'Бумажные книги',
			hearts: 12,
			inBasket: 3
		},
		{
			id: 2,
			img: bookImage,
			name: 'История книги 2',
			date: '20 Feb 2021',
			price: 350,
			type: 'Бумажные книги',
			hearts: 12,
			inBasket: 3
		},
		{
			id: 2,
			img: bookImage,
			name: 'История книги 2',
			date: '20 Feb 2021',
			price: 350,
			type: 'Бумажные книги',
			hearts: 12,
			inBasket: 3
		},
		{
			id: 2,
			img: bookImage,
			name: 'История книги 2',
			date: '20 Feb 2021',
			price: 350,
			type: 'Бумажные книги',
			hearts: 12,
			inBasket: 3
		},
		{
			id: 2,
			img: bookImage,
			name: 'История книги 2',
			date: '20 Feb 2021',
			price: 350,
			type: 'Бумажные книги'
		},
		{
			id: 2,
			img: bookImage,
			name: 'История книги 2',
			date: '20 Feb 2021',
			price: 350,
			type: 'Бумажные книги',
			hearts: 12,
			inBasket: 3
		}
	];

	const showModal = (vendor: Vendor) => {
		setSelectedVendor(vendor);
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
		setSelectedVendor(null);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setSelectedVendor(null);
	};

	const toggleTypeList = (): void => {
		setIsOpenBooksType(!isOpenBooksType);
	};

	const handleGenreSelect = (type: string | null): void => {
		setSelectedType(type);
		setIsOpenBooksType(false);
	};

	const bookTypeText = selectedType ? selectedType : 'Все';

	const filteredBooks: Book[] = selectedType
		? books.filter((book) => book.type === selectedType)
		: books;

	return (
		<section className={scss.AboutVendorsBooks}>
			<div className={scss.container}>
				<div className={scss.total_quantity}>
					<p>Всего: {filteredBooks.length} книг</p>
					<div className={scss.click}>
						<p onClick={toggleTypeList}>
							<span onClick={() => handleGenreSelect(null)}>
								{bookTypeText}
							</span>
							{isOpenBooksType ? <UpIcon /> : <IconArrowBottom />}
						</p>

						<div
							className={`${isOpenBooksType ? scss.type_list : scss.none_books_type}`}
						>
							<p onClick={() => handleGenreSelect('В избранном')}>
								В избранном
							</p>
							<hr />
							<p onClick={() => handleGenreSelect('В корзине')}>В корзине</p>
							<hr />
							<p onClick={() => handleGenreSelect('	Со скидками')}>
								Со скидками
							</p>
							<hr />
							<p onClick={() => handleGenreSelect('Проданы')}>Проданы</p>
						</div>
					</div>
				</div>
				<hr />
				<div className={scss.content}>
					{filteredBooks.map((book) => (
						<div key={book.id} className={scss.book}>
							<div className={scss.book_header}>
								<div className={scss.hearts}>
									<IconWhiteLike />
									<p>{book.hearts}</p>
								</div>
								<div className={scss.in_basket}>
									<p>В карзине ({book.inBasket})</p>
								</div>
							</div>
							<div className={scss.extra} onClick={() => setIsOpen(!isOpen)}>
								<ThreeDotIcon />
							</div>
							{
								<div className={isOpen ? scss.is_open : scss.on_close}>
									<ul>
										<li>
											<span>
												<IconPencil />
											</span>
											Редактировать
										</li>
										<hr />
										<li onClick={() => setIsOpen(false)}>
											<span>
												<IconX />
											</span>
											Отклонить
										</li>
									</ul>
								</div>
							}
							<div className={scss.book_content}>
								<div className={scss.book_img}>
									<img src={book.img} alt="" />
								</div>
								<div className={scss.info_book}>
									<h3>{book.name}</h3>
									<div className={scss.date_and_price}>
										<p>{book.date}</p>
										<p className={scss.price}>{book.price} c</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className={scss.div_delete}>
					<button
						className={scss.delete_profile}
						onClick={() => showModal(selectedVendor!)}
					>
						Удалить профиль
					</button>
				</div>
				<Modal
					visible={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
					okText="Удалить"
					cancelText="Отменить"
				>
					<p>Вы уверены, что хотите удалить профиль?</p>
				</Modal>
			</div>
		</section>
	);
};

export default AboutVendorsBooks;
