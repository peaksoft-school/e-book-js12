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
