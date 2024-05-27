import LatestBookSection from './homeSections/LatesBookSection';
import BestsellerSection from './homeSections/BestsellerSection';
import LastPublicationSection from './homeSections/LastPublicationSection';
import AudioBookSection from './homeSections/AudioBookSection';
// import EbookSection from './homeSections/EbookSection';
import SubscribeSection from './homeSections/SubscribeSection';

const HomePage = () => {
	return (
		<>
			<LatestBookSection />
			<BestsellerSection />
			<LastPublicationSection />
			<AudioBookSection />
			{/* <EbookSection /> */}
			<SubscribeSection />
		</>
	);
};

export default HomePage;
