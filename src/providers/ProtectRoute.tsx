import { FC, ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface ProtectRouteProps {
	children: ReactNode;
}

export const ProtectRoute: FC<ProtectRouteProps> = ({ children }) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const isAuth = Boolean(localStorage.getItem('client'));
	useEffect(() => {
		// switch (pathname) {
		// 	case '/auth/login':
		// 	case '/auth/registration':
		// 	case '/auth/vendorRegistration':
		// 		if (isAuth) {
		// 			navigate('/');
		// 		}
		// 		break;
		// 	case '/':
		// 	case '/search_book':
		// 		if (!isAuth) {
		// 			navigate('/auth/login');
		// 		}
		// 		break;
		// 	default:
		// 		break;
		// }
	}, [isAuth, pathname, navigate]);
	return children;
};

// switch (pathname) {
// 	case '/login':
// 	case '/registration':
// 		if (isAuth) {
// 			navigate('/');
// 		}
// 		break;
// 	case '/':
// 	case '/product':
// 		if (!isAuth) {
// 			navigate('/auth/login');
// 		}
// 		break;
// 	default:
// 		break;
// }
