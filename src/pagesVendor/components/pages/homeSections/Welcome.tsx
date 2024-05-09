import { FC } from 'react';
import scss from './Welcome.module.scss';
import text_img from '../../../../assets/img/textPortal.png';
import girl_img from '../../../../assets/img/Knowledgecuate.png';

const Welcome: FC = () => {
	return (
		<>
			<section className={scss.Welcome}>
				<div className="container">
					<div className={scss.content}>
						<div className={scss.section_title}>
							<div className={scss.left_content}>
								<img src={text_img} alt="" />
								<div className={scss.text}>
									<p>Начните продавать свои книги на eBook</p>
									<button>Стать продавцом</button>
								</div>
							</div>
							<div className={scss.right_content}>
								<div className={scss.bg_circle}>
									<img src={girl_img} alt="" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
export default Welcome;
