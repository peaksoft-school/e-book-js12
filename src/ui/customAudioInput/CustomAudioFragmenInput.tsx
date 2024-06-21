import { FC, ChangeEvent, useRef } from 'react';
import scss from './CustomAudioDownloadInput.module.scss';
import { IconDownload, IconDownloaded } from '@/src/assets/icons';

interface CustomAudioDownloadInputProps {
	accept: string;
	onChange: (file: File) => void;
	setDuration: React.Dispatch<React.SetStateAction<number>>;
	isFileUploaded: boolean;
}

const CustomAudioFragmentInput: FC<CustomAudioDownloadInputProps> = ({
	accept,
	onChange,
	setDuration,
	isFileUploaded
}) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];
		if (file) {
			const audio = new Audio(URL.createObjectURL(file));
			audio.addEventListener('loadedmetadata', () => {
				setDuration(audio.duration);
			});
		}
		if (file) {
			onChange(file);
		}
	};

	return (
		<>
			<div
				className={`${scss.download_input} ${isFileUploaded ? scss.uploaded : ''}`}
			>
				<input
					ref={inputRef}
					type="file"
					id="audio-upload"
					accept={accept}
					onChange={handleFileChange}
					disabled={isFileUploaded}
					style={{ display: 'none' }}
				/>
				{isFileUploaded ? <IconDownloaded /> : <IconDownload />}
				<p
					className={
						isFileUploaded ? scss.uploaded_text : scss.un_uploaded_text
					}
				>
					{isFileUploaded ? 'Аудиозапись загружена' : 'Загрузите аудиозапись'}
				</p>
			</div>
		</>
	);
};

export default CustomAudioFragmentInput;
