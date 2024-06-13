import scss from '../../pagesUser/components/pages/homeSections/LatestBooksSection.module.scss';

const iconBackgroundLine = () => {
	return (
		<>
			<svg
				className={scss.iconLine}
				width="100%"
				height="100%"
				viewBox="0 0 1255 720"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1254 0.5C963.833 29.3333 298 44.5 381.5 227C458.66 395.643 1184.56 281.811 1104 449.5C1036.5 590 340.5 691.333 -1 719.5"
					stroke="#4F4F4F"
					strokeOpacity="0.4"
				/>
			</svg>
		</>
	);
};

export default iconBackgroundLine;
