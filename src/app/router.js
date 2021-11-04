import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './common/Header';
import HomePage from './Home/HomePage';

import AdminPage from './Admin/AdminPage';
import AddCollection from './Admin/CollectionControl/AddCollection';

const Router = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/">
					<Route index element={<HomePage />} />
				</Route>
				<Route path="/admin" >
					<Route index element={<AdminPage />} />
					<Route path="add-collection" element={<AddCollection />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
