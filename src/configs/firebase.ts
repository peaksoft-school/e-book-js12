import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDW5IAP6Ta8ukSPFKcN5Ao9BIvG2cv5LEs',
	authDomain: 'ebook1-4f229.firebaseapp.com',
	projectId: 'ebook1-4f229',
	storageBucket: 'ebook1-4f229.appspot.com',
	messagingSenderId: '322504941245',
	appId: '1:322504941245:web:00ddd6211ea9889ec221d4',
	measurementId: 'G-S1Y96J26C3'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider, app };
