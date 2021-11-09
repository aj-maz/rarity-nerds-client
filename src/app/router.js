import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './common/Header';
import HomePage from './Home/HomePage';

import CollectionPage from './Collection/CollectionPage'

import AdminPage from './Admin/AdminPage';
import AddCollection from './Admin/CollectionManager/AddCollection';
import CollectionDetails from './Admin/CollectionManager/CollectionDetails';

const Router = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/">
				<Route index element={<HomePage />} />
				<Route path="collection/:_id" element={<CollectionPage />} />
				</Route>
				{/*<Route path="/admin" >
					<Route index element={<AdminPage />} />
					<Route path="add-collection" element={<AddCollection />} />
					<Route path="collection/:_id" element={<CollectionDetails />} />
	</Route>*/}
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
