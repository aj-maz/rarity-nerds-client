import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './common/Header';
import HomePage from './Home/HomePage';

import CollectionPage from './Collection/CollectionPage'

import AdminPage from './Admin/AdminPage';
import AddCollection from './Admin/CollectionControl/AddCollection';
import CollectionDetails from './Admin/CollectionControl/CollectionDetails';

const Router = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/">
				<Route index element={<HomePage />} />
				<Route path="collection/:id" element={<CollectionPage />} />
				</Route>
				<Route path="/admin" >
					<Route index element={<AdminPage />} />
					<Route path="add-collection" element={<AddCollection />} />
					<Route path="collection/:_id" element={<CollectionDetails />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
