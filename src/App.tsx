import { Route, Routes } from 'react-router-dom';
import LayoutVendor from './vendorRole/components/layout/LayoutVendor';
import LayoutUser from './userRole/components/layout/LayoutUser';
import LayoutAdmin from './adminRole/components/layout/LayoutAdmin';
import LayoutAuth from './authRole/components/layout/LayoutAuth';

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
