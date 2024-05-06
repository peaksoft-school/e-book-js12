import React, { ChangeEvent, useRef, useState } from 'react';
import scss from './CustomAddPhoto.module.scss';
import { IconAddPhoto } from '@/src/assets/icons';

const CustomAddPhoto: React.FC = () => {
	const [image, setImage] = useState<string>('');
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target) {
					setImage(e.target.result as string);
				}
			};
			reader.readAsDataURL(file);
		}
	};
	return (
		<div
			className={scss.input_container}
			style={{ backgroundImage: `url(${image})` }}
		>
			<input
				type="file"
				ref={fileInputRef}
				style={{ display: 'none' }}
				onChange={handleFileChange}
			/>
			{image ? null : (
				<>
					<div className={scss.img_container} onClick={handleButtonClick}>
						<IconAddPhoto />
					</div>
				</>
			)}
			{image ? (
				<div className={scss.btn_container}>
					<button onClick={handleButtonClick}>Изменить</button>
					<button
						onClick={() => {
							setImage('');
						}}
					>
						Удалить
					</button>
				</div>
			) : (
				<>
					<p>Нажмите на иконку чтобы загрузить или перетащите фото</p>
				</>
			)}
		</div>
	);
};

export default CustomAddPhoto;
