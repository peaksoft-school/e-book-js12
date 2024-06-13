import { FC, ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface ProtectRouteProps {
	children: ReactNode;
}

export const ProtectRoute: FC<ProtectRouteProps> = ({ children }) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const isAuth = Boolean(localStorage.getItem('auth_token'));
	useEffect(() => {
		switch (pathname) {
			case '/login':
			case '/registration':
				if (isAuth) {
					navigate('/');
				}
				break;
			case '/':
			case '/product':
				if (!isAuth) {
					navigate('/login');
				}
				break;
			default:
				break;
		}
	}, [isAuth, pathname, navigate]);
	return children;
};
