import { Route, Routes } from 'react-router';
import LayoutUser from './pagesUser/components/layout/LayoutUser';
import LayoutAdmin from './pagesAdmin/components/layout/LayoutAdmin';
import LayoutAuth from './pagesAuth/components/layout/LayoutAuth';

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/*" element={<LayoutUser />} />
				<Route path="/admin/*" element={<LayoutAdmin />} />
				<Route path="/auth/*" element={<LayoutAuth />} />
			</Routes>
		</>
	);
};

export default App;
