import { useClientProfileHistoryQuery } from '@/src/redux/api/userHistory';
import scss from './Test.module.scss';
interface GetResponse {
	data: UserHistory[];
}

interface UserHistory {
	id: number;
	title: string;
	authorsFullName: string;
	imageUrl: string;
	quantity: number;
	discount: number;
	discountFromPromoCode: number;
	historyStatus: string;
	price: number;
	priceWithDiscount: number;
	createdAt: string;
	urlFile: string | null;
	bookType: string;
}
const TestPage = () => {
	const { data } = useClientProfileHistoryQuery<GetResponse>();

	const handleFilterTypeBook = () => {
		const test = data.find((item) => item.bookType);

		if (test?.bookType === 'AUDIO_BOOK') {
			return (
				<div className={scss.audio}>
					<audio id="audioPlayer" controls>
						{test.urlFile && <source src={test.urlFile} type="audio/mpeg" />}
					</audio>
				</div>
			);
		} else if (test?.bookType === 'ONLINE_BOOK') {
			return (
				<div className={scss.online}>
					<iframe src={test.urlFile}></iframe>
				</div>
			);
		}
	};
	return <div className={scss.content}>{handleFilterTypeBook()}</div>;
};

export default TestPage;
