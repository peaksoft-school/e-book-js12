import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import scss from './CustomAddPhoto.module.scss';
import { IconAddPhoto } from '@/src/assets/icons';

interface CustomAddPhotoProps {
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	label: string;
	setDelPhoto: React.Dispatch<React.SetStateAction<boolean>>;
	delPhoto: boolean;
}

const CustomAddPhoto: React.FC<CustomAddPhotoProps> = ({
	onChange,
	label,
	setDelPhoto,
	delPhoto
}) => {
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
					setDelPhoto(true);
				}
			};
			reader.readAsDataURL(file);
			onChange(event);
		}
	};

	useEffect(() => {
		if (!delPhoto) {
			setImage('');
		}
	}, [delPhoto]);

	return (
		<div
			onClick={handleButtonClick}
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
					<div className={scss.img_container}>
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
