import { FC } from 'react';
import scss from './Welcome.module.scss';
import text_img from '../../../../assets/img/textPortal.png';
import girl_img from '../../../../assets/img/Knowledgecuate.png';
import { useNavigate } from 'react-router-dom';
import LogoeBook from '@/src/ui/logoeBook/LogoeBook';
import CustomPersonalAreaButton from '@/src/ui/customButton/CustomPersonalArea';
const firstData = [
	{
		image:
			'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEggTu7DsNwN06djRJalUksB-4Ev7Od5gqiLK3tGUianJl7nbaRoUcOpxpOSlfVMmt4l2bBQejcsUfEqP_AJp0j_fZDzXftR7fz_wZ2-SBFA1NaaFVBSVQAyMZR6NJO14iRApHY7mW5NYbg/w1200-h630-p-k-no-nu/Library.png',
		description: `Добро пожаловать на Ebook!
			Мы рады приветствовать вас на нашей инновационной платформе, предназначенной для покупки и продажи книг в различных форматах.
			На Ebook вы можете приобрести книги в следующих форматах:
			1.Печатная книга — для любителей классического чтения и бумажных изданий.
			2.Аудиокнига — для тех, кто предпочитает слушать книги в любое удобное время.
		3.Электронная книга — для ценителей удобства и мобильности цифрового чтения.
			Чтобы начать продавать свои книги на Ebook, вам нужно пройти быструю и простую регистрацию для продавцов. Это позволит вам незамедлительно начать делиться своими изданиями с широкой аудиторией.
			Присоединяйтесь к нашему сообществу и откройте новые возможности для распространения и приобретения книг!
			Ebook — ваш надежный партнёр в мире книг.
			`
	},
	{
		image:
			'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEggTu7DsNwN06djRJalUksB-4Ev7Od5gqiLK3tGUianJl7nbaRoUcOpxpOSlfVMmt4l2bBQejcsUfEqP_AJp0j_fZDzXftR7fz_wZ2-SBFA1NaaFVBSVQAyMZR6NJO14iRApHY7mW5NYbg/w1200-h630-p-k-no-nu/Library.png',
		description: `Чтобы начать продавать свои книги на Ebook, вам нужно пройти быструю и простую регистрацию для продавцов. Это позволит вам незамедлительно начать делиться своими изданиями с широкой аудиторией.
			Присоединяйтесь к нашему сообществу и откройте новые возможности для распространения и приобретения книг!
			Ebook — ваш надежный партнёр в мире книг.
			`
	},
	{
		image:
			'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEggTu7DsNwN06djRJalUksB-4Ev7Od5gqiLK3tGUianJl7nbaRoUcOpxpOSlfVMmt4l2bBQejcsUfEqP_AJp0j_fZDzXftR7fz_wZ2-SBFA1NaaFVBSVQAyMZR6NJO14iRApHY7mW5NYbg/w1200-h630-p-k-no-nu/Library.png',
		description: `После успешной регистрации вам потребуется разместить книгу на продажу.

			Вы можете разместить книгу в одном из трех форматов:
			
			1. Печатная книга
			
			2. Аудиокнига
			
			3. Электронная книга
			
			Для этого необходимо:
			
			1.  Загрузить три фотографии вашей книги.
			
			2. Выбрать формат книги.
			
			3. Заполнить оставшиеся поля с информацией о книге, включая
			описание, цену и категорию.
			
			Убедитесь, что все предоставленные данные точны и привлекательны для потенциальных покупателей. Привлекательные фотографии и подробное описание помогут вашей книге найти своего читателя быстрее.
			
			Ebook предоставляет все инструменты для успешной продажи ваших книг. Присоединяйтесь к нашему сообществу авторов и читайте, слушайте и продавайте книги с удовольствием!			 
			`
	}
];

const secondData = [
	{
		iamge:
			'https://idsb.tmgrup.com.tr/ly/uploads/images/2020/03/29/thumbs/800x531/27574.jpg',
		description:
			'В целом, конечно, экономическая повестка сегодняшнего дня прекрасно подходит для реализации переосмысления внешнеэкономических политик.'
	},
	{
		iamge:
			'https://idsb.tmgrup.com.tr/ly/uploads/images/2020/03/29/thumbs/800x531/27574.jpg',
		description:
			'В целом, конечно, экономическая повестка сегодняшнего дня прекрасно подходит для реализации переосмысления внешнеэкономических политик.'
	},
	{
		iamge:
			'https://idsb.tmgrup.com.tr/ly/uploads/images/2020/03/29/thumbs/800x531/27574.jpg',
		description:
			'В целом, конечно, экономическая повестка сегодняшнего дня прекрасно подходит для реализации переосмысления внешнеэкономических политик.'
	}
];

const Welcome: FC = () => {
	const navigate = useNavigate();
	const handelChangeProfile = () => {
		const vendor = localStorage.getItem('vendor');

		if (vendor === 'true') {
			navigate('/vendor/profile');
		} else {
			navigate('/auth/vendor/registration');
		}
	};

	return (
		<>
			<section id="headerVendor" className={scss.Welcome}>
				<div className="container">
					<header>
						<div>
							<LogoeBook
								navigateToHome={() => {
									if (localStorage.getItem('vendor') === 'true') {
										navigate('/vendor/home');
									}
									navigate('/vendor');
								}}
							/>
						</div>
						<div className={scss.button_content}>
							<CustomPersonalAreaButton
								children="Личный кабинет"
								onClick={() => {
									handelChangeProfile();
								}}
								nameClass={scss.custom_button_personal}
							/>
						</div>
					</header>
					<div className={scss.content}>
						<div className={scss.section_title}>
							<div className={scss.left_content}>
								<img src={text_img} alt="" />
								<div className={scss.text}>
									<p>Начните продавать свои книги на eBook</p>
									<button
										onClick={() => {
											navigate('/vendor/home');
										}}
									>
										Начать продовать
									</button>
								</div>
							</div>
							<div className={scss.right_content}>
								<div className={scss.bg_circle}>
									<img src={girl_img} alt="" />
								</div>
							</div>
						</div>
						<div className={scss.condition_content}>
							<div className={scss.first_container}>
								<p>Как начать продавать на eBook?</p>
								<div className={scss.card_container}>
									{firstData.map((card, index) => (
										<>
											<div className={scss.card} key={index}>
												<img src={card.image} alt="" />
												<p>{card.description}</p>
											</div>
										</>
									))}
								</div>
							</div>
							<div className={scss.second_container}>
								<p>Условия</p>
								<div className={scss.card_container}>
									{secondData.map((card, index) => (
										<>
											<div className={scss.card} key={index}>
												<img src={card.iamge} alt="" />
												<p>{card.description}</p>
											</div>
										</>
									))}
								</div>
							</div>
						</div>
						<div className={scss.text}>
							<button
								onClick={() => {
									navigate('/vendor/hoem');
								}}
							>
								Начать продовать
							</button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
export default Welcome;
