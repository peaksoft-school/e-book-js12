import React, { ChangeEvent, useRef, useState } from 'react';
import scss from './CustomAddPhoto.module.scss';
import { IconAddPhoto } from '@/src/assets/icons';

interface CustomAddPhotoProps {
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	label: string;
}

const CustomAddPhoto: React.FC<CustomAddPhotoProps> = ({ onChange, label }) => {
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
			onChange(event);
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
					<p>{label}</p>
				</>
			)}
		</div>
	);
};

export default CustomAddPhoto;
