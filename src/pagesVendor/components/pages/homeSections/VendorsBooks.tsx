import { FC, useState } from 'react';
import scss from './VendorsBooks.module.scss';
import { IconInfoCircle, IconPencil, IconX } from '@tabler/icons-react';
import CustomAddBookButton from '@/src/ui/customButton/CustomAddBook';
import { useNavigate } from 'react-router-dom';
import bookImage from '../../../../assets/booksImg/harrry-potter.png';
import { IconWhiteLike } from '@/src/assets/icons';
import ThreeDotIcon from '@/src/assets/icons/icon-threeDot';
import { Modal, Tooltip } from 'antd';

interface Book {
	id: number;
	img: string;
	name: string;
	date: string;
	type: string;
	price: number;
	hearts?: number;
	inBasket?: number;
}

const VendorsBooks: FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const navigate = useNavigate();

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
		}
	];
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalSuccess, setModalSuccess] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};

	const openModalSuccess = () => {
		Modal.success({
			title: 'Промокод успешно создан!',
			closeIcon: true,
			closable: true,
			afterClose() {
				setTimeout(() => {
					setModalSuccess(false);
				}, 3000);
			}
		});
	};

	return (
		<section className={scss.VendorsBooks}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.books_header}>
						<div className={scss.promocode_button}>
							<button onClick={showModal}>Создать промокод</button>
							<Modal
								open={isModalOpen}
								footer={[
									<button
										key="submit"
										onClick={() => {
											handleOk();
											setModalSuccess(true);
											setTimeout(() => {
												modalSuccess ? openModalSuccess() : null;
											}, 300);
										}}
									>
										Создать
									</button>
								]}
							>
								<div className={scss.promocode}>
									<label>Промокод</label>
									<input
										className={scss.promocode_input}
										type="text"
										placeholder="Напишите промокод"
									/>
								</div>
								<div className={scss.inputs}>
									<div className={scss.input_x_label}>
										<label>Дата начала</label>

										<input type="date" />
									</div>
									<div className={scss.input_x_label}>
										<label>Дата завершения</label>
										<input type="date" />
									</div>
									<div className={scss.input_x_label}>
										<label>Процент скидки</label>
										<input type="text" placeholder="%" />
									</div>
								</div>
							</Modal>
							<Tooltip
								className={scss.info_hover}
								title="Промокод применится ко всем вашим книгам"
								color={'#f8f8f8'}
								placement="bottomLeft"
							>
								<span>
									<IconInfoCircle />
								</span>
							</Tooltip>
						</div>
						<div className={scss.add_book_button}>
							<CustomAddBookButton
								children="+ Добавить книгу"
								onClick={() => {
									navigate('/admin/book_adding');
								}}
							/>
						</div>
					</div>
					<div className={scss.books_quantity}>
						<p>Всего {books.length} книг</p>
						<div className={scss.all_books}>
							<p>Все</p>
						</div>
					</div>
					<hr />
					<div className={scss.books_content}>
						{books.map((book) => (
							<div key={book.id} className={scss.book}>
								<div className={scss.book_header}>
									<div className={scss.hearts}>
										<IconWhiteLike />
										<p>{book.hearts}</p>
									</div>
									<div className={scss.in_basket}>
										<p>В корзине ({book.inBasket})</p>
									</div>
								</div>
								<div className={scss.extra} onClick={() => setIsOpen(!isOpen)}>
									<ThreeDotIcon />
								</div>
								{isOpen && (
									<div className={scss.is_open}>
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
								)}
								<div className={scss.book_content}>
									<div className={scss.book_img}>
										<img src={book.img} alt={book.name} />
									</div>
									<div className={scss.info_book}>
										<h3>{book.name}</h3>
										<div className={scss.date_and_price}>
											<p>{book.date}</p>
											<p className={scss.price}>{book.price} с</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default VendorsBooks;
