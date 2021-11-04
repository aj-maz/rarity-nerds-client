import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './common/Header'
import HomePage from './Home/HomePage'

const HelloWorld = () => <div>This is the hello world</div>;

const Router = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" >
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
