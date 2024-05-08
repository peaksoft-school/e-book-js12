import { FC } from 'react';
import scss from './VendorsBooks.module.scss';
import { IconInfoCircle } from '@tabler/icons-react';
import CustomAddBookButton from '@/src/ui/customButton/CustomAddBook';
import { useNavigate } from 'react-router-dom';

const VendorsBooks: FC = () => {
	const navigate = useNavigate();
	return (
		<>
			<section className={scss.VendorsBooks}>
				<div className="container">
					<div className={scss.content}>
						<div className={scss.books_header}>
							<div className={scss.promocode_button}>
								<button> Создать промокод</button>
								<IconInfoCircle />
							</div>
							<div>
								<CustomAddBookButton
									children="+  Добавить книгу"
									onClick={() => {
										navigate('/admin/book_adding');
									}}
								/>
							</div>
						</div>
						<div className={scss.books_quantity}>
							<p>Всего 23 книг</p>
							<div className={scss.all_books}>
								<p>Все</p>
							</div>
						</div>
						<hr />
					</div>
				</div>
			</section>
		</>
	);
};
export default VendorsBooks;
