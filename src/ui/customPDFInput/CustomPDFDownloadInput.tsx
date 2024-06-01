import { FC, ChangeEvent, useRef, useState } from 'react';
import scss from './CustomPDFDownload.module.scss';
import { IconDownload, IconDownloaded } from '@/src/assets/icons';

interface CustomPDFDownloadInputProps {
	accept: string;
	onChange: (file: File) => void;
}

const CustomPDFDownloadInput: FC<CustomPDFDownloadInputProps> = ({
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
			<div
				className={`${scss.download_input} ${isFileUploaded ? scss.uploaded : ''}`}
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
				{isFileUploaded ? <IconDownloaded /> : <IconDownload />}
				<p
					className={isFileUploaded ? scss.uploaded_text : scss.unUploadedText}
				>
					{isFileUploaded ? 'PDF загружена' : 'Загрузите PDF'}
				</p>
			</div>
		</>
	);
};

export default CustomPDFDownloadInput;
