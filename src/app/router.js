import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './common/Header'

const HelloWorld = () => <div>This is the hello world</div>;

const Router = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<HelloWorld />}>
          <Route index element={<HelloWorld />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
