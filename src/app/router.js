import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './common/Header'
import HomePage from './Home/HomePage'
import AdminPage from "./Admin/AdminPage";


const Router = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" >
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/admin" element={<AdminPage />}>

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
