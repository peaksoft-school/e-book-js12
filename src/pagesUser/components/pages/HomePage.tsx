import LatestBookSection from './homeSections/LatesBookSection';
import BestsellerSection from './homeSections/BestsellerSection';
import LastPublicationSection from './homeSections/LastPublicationSection';
import AudioBookSection from './homeSections/AudioBookSection';
import SubscribeSection from './homeSections/SubscribeSection';
import SecondSlider from './homeSections/SecondSlider';

const HomePage = () => {
	return (
		<>
			<LatestBookSection />
			<BestsellerSection />
			<LastPublicationSection />
			<AudioBookSection />
			<SecondSlider />
			<SubscribeSection />
		</>
	);
};

export default HomePage;
