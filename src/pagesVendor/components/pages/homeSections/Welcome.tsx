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
		description:
			'В целом, конечно, экономическая повестка сегодняшнего дня прекрасно подходит для реализации переосмысления внешнеэкономических политик.'
	},
	{
		image:
			'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEggTu7DsNwN06djRJalUksB-4Ev7Od5gqiLK3tGUianJl7nbaRoUcOpxpOSlfVMmt4l2bBQejcsUfEqP_AJp0j_fZDzXftR7fz_wZ2-SBFA1NaaFVBSVQAyMZR6NJO14iRApHY7mW5NYbg/w1200-h630-p-k-no-nu/Library.png',
		description:
			'В целом, конечно, экономическая повестка сегодняшнего дня прекрасно подходит для реализации переосмысления внешнеэкономических политик.'
	},
	{
		image:
			'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEggTu7DsNwN06djRJalUksB-4Ev7Od5gqiLK3tGUianJl7nbaRoUcOpxpOSlfVMmt4l2bBQejcsUfEqP_AJp0j_fZDzXftR7fz_wZ2-SBFA1NaaFVBSVQAyMZR6NJO14iRApHY7mW5NYbg/w1200-h630-p-k-no-nu/Library.png',
		description:
			'В целом, конечно, экономическая повестка сегодняшнего дня прекрасно подходит для реализации переосмысления внешнеэкономических политик.'
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
	return (
		<>
			<section className={scss.Welcome}>
				<div className="container">
					<header>
						<div>
							<LogoeBook />
						</div>
						<div className={scss.button_content}>
							<CustomPersonalAreaButton
								children="Личный кабинет"
								onClick={() => navigate('/vendor/profile')}
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
											navigate('/auth/vendor/registration');
										}}
									>
										Стать продавцом
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
									navigate('/auth/vendor/registration');
								}}
							>
								Стать продавцом
							</button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
export default Welcome;
