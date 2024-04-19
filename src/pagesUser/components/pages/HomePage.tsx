import AudioBooks from './audioBooks/AudioBooks';
import Ebooks from './eBooks/Ebooks';
import Welcome from './homeSections/Welcome';

const HomePage = () => {
	return (
		<>
			<Welcome />
			<AudioBooks />
			<Ebooks />
		</>
	);
};

export default HomePage;
