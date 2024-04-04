import { Route, Routes } from 'react-router';
import LayoutVender from './venderRole/components/layout/LayoutVender';
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
				<Route path="/vender/*" element={<LayoutVender />} />
			</Routes>
		</>
	);
};

export default App;
