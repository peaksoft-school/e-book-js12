import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import scss from './CustomAddPhoto.module.scss';
import { IconAddPhoto } from '@/src/assets/icons';

interface CustomAddPhotoProps {
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	label: string;
	setDelPhoto: React.Dispatch<React.SetStateAction<boolean>>;
	delPhoto: boolean;
	initialState: string;
	editPhoto: string;
}

const CustomAddPhoto: React.FC<CustomAddPhotoProps> = ({
	onChange,
	label,
	setDelPhoto,
	delPhoto,
	initialState,
	editPhoto
}) => {
	const [image, setImage] = useState<string>('');
	const fileInputRef = useRef<HTMLInputElement>(null);
	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		console.log(event);

		const file = event.target.files?.[0];
		if (file && file.type.startsWith('image/')) {
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
		if (initialState !== '') {
			setImage(initialState);
		}
		if (editPhoto !== '') {
			setImage(editPhoto);
		}
	}, [delPhoto, initialState, image, editPhoto]);

	return (
		<div
			onClick={() => {
				if (image === '' || image === null) {
					handleButtonClick();
				}
			}}
			className={scss.input_container}
			style={{ backgroundImage: `url(${image})` }}
		>
			<input
				type="file"
				ref={fileInputRef}
				style={{ display: 'none' }}
				accept="image/*"
				onChange={(e) => {
					handleFileChange(e);
				}}
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
