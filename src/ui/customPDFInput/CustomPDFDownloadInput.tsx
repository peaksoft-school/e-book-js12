import { FC, ChangeEvent, useRef, useState } from 'react';
import scss from './CustomPDFDownload.module.scss';
import { Download, DownloadedIcon } from '../../assets/icons';

interface CustomAudioDownloadInputProps {
	accept: string;
	onChange: (file: File) => void;
}

const CustomPDFDownloadInput: FC<CustomAudioDownloadInputProps> = ({
	accept,
	onChange
}) => {
	const [isFileUploaded, setIsFileUploaded] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];
		if (file) {
			onChange(file);
			setIsFileUploaded(true);
		}
	};

	const handleDivClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	return (
		<>
			<p className={scss.paragraph}>
				{isFileUploaded ? 'PDF загружена' : 'Загрузите PDF'}
			</p>
			<div
				className={`${scss.DownLoadInput} ${isFileUploaded ? scss.uploaded : ''}`}
				onClick={handleDivClick}
			>
				<input
					ref={inputRef}
					type="file"
					id="PDF-upload"
					accept={accept}
					onChange={handleFileChange}
					disabled={isFileUploaded}
					style={{ display: 'none' }}
				/>
				{isFileUploaded ? <DownloadedIcon /> : <Download />}
				<p className={isFileUploaded ? scss.uploadedText : scss.unUploadedText}>
					{isFileUploaded ? 'PDF загружена' : 'Загрузите PDF'}
				</p>
			</div>
		</>
	);
};

export default CustomPDFDownloadInput;
