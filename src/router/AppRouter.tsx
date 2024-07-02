import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import PrivateRouter from './PrivateRouter';
import LayoutUser from '../pagesUser/components/layout/LayoutUser';
import LayoutAdmin from '../pagesAdmin/components/layout/LayoutAdmin';
import LayoutAuth from '../pagesAuth/components/layout/LayoutAuth';
import LayoutVendor from '../pagesVendor/components/layout/LayoutVendor';

const AppRouter = () => {
	const [userInfo, setUserInfo] = useState<UserInfo>();
	const { pathname } = useLocation();
	useEffect(() => {
		const storageData = localStorage.getItem('EBOOK');
		if (storageData) {
			setUserInfo(JSON.parse(storageData));
		} else {
			setUserInfo({
				role: 'GUEST',
				email: '',
				firstName: '',
				id: 0,
				token: ''
			});
		}
	}, [pathname]);

	if (!userInfo) return;
	return (
		<Routes>
			<Route
				path="/*"
				element={
					<PrivateRouter
						component={<LayoutUser />}
						fallbackPath={userInfo.role === 'ADMIN' ? '/admin' : '/vendor'}
						role={userInfo?.role}
						allowedRoles={['CLIENT', 'GUEST']}
					/>
				}
			/>
			<Route
				path="/admin/*"
				element={
					<PrivateRouter
						component={<LayoutAdmin />}
						fallbackPath="/"
						role={userInfo?.role}
						allowedRoles={['ADMIN']}
					/>
				}
			/>
			<Route
				path="/auth/*"
				element={
					<PrivateRouter
						component={<LayoutAuth />}
						fallbackPath="/vendor"
						role={userInfo.role}
						allowedRoles={['GUEST']}
					/>
				}
			/>
			<Route
				path="/vendor/*"
				element={
					<PrivateRouter
						component={<LayoutVendor />}
						fallbackPath="/"
						role={userInfo?.role}
						allowedRoles={['VENDOR']}
					/>
				}
			/>
		</Routes>
	);
};

export default AppRouter;
