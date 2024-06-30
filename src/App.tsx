import { Route, Routes } from 'react-router-dom';
import LayoutUser from './pagesUser/components/layout/LayoutUser';
import LayoutAdmin from './pagesAdmin/components/layout/LayoutAdmin';
import LayoutAuth from './pagesAuth/components/layout/LayoutAuth';
import LayoutVendor from './pagesVendor/components/layout/LayoutVendor';

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/*" element={<LayoutUser />} />
				<Route path="/admin/*" element={<LayoutAdmin />} />
				<Route path="/auth/*" element={<LayoutAuth />} />
				<Route path="/vendor/*" element={<LayoutVendor />} />
			</Routes>
		</>
	);
};

export default App;

// import { Route, Routes } from 'react-router-dom';
// import LayoutUser from './pagesUser/components/layout/LayoutUser';
// import LayoutAdmin from './pagesAdmin/components/layout/LayoutAdmin';
// import LayoutAuth from './pagesAuth/components/layout/LayoutAuth';
// import LayoutVendor from './pagesVendor/components/layout/LayoutVendor';
// import PrivateRouter from './router/PrivateRouter';
// import { useEffect, useState } from 'react';

// const App = () => {
// 	const [userInfo, setUserInfo] = useState({
// 		role: 'GUEST',
// 		email: '',
// 		firstName: '',
// 		id: 0,
// 		token: ''
// 	});

// 	useEffect(() => {
// 		const storageData = localStorage.getItem('EBOOK');

// 		if (storageData) {
// 			const parsedData = JSON.parse(storageData);
// 			setUserInfo(parsedData);
// 		} else {
// 			setUserInfo({
// 				role: 'GUEST',
// 				email: '',
// 				firstName: '',
// 				id: 0,
// 				token: ''
// 			});
// 		}
// 	}, []);

// 	return (
// 		<>
// 			<Routes>
// 				<Route
// 					path="/*"
// 					element={
// 						<PrivateRouter
// 							component={<LayoutUser />}
// 							fallbackPath="/auth/login"
// 							role={userInfo?.role}
// 							allowedRoles={['CLIENT', 'GUEST']}
// 						/>
// 					}
// 				/>
// 				<Route
// 					path="/admin/*"
// 					element={
// 						<PrivateRouter
// 							component={<LayoutAdmin />}
// 							fallbackPath="/auth/login"
// 							role={userInfo?.role}
// 							allowedRoles={['ADMIN']}
// 						/>
// 					}
// 				/>
// 				<Route
// 					path="/auth/*"
// 					element={
// 						<PrivateRouter
// 							component={<LayoutAuth />}
// 							fallbackPath="/"
// 							role={userInfo?.role}
// 							allowedRoles={['GUEST']}
// 						/>
// 					}
// 				/>
// 				<Route
// 					path="/vendor/*"
// 					element={
// 						<PrivateRouter
// 							component={<LayoutVendor />}
// 							fallbackPath="/auth/login"
// 							role={userInfo?.role}
// 							allowedRoles={['VENDOR']}
// 						/>
// 					}
// 				/>
// 			</Routes>
// 		</>
// 	);
// };

// export default App;
