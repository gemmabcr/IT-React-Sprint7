import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "../pages/Home";
import Pressupost from "../pages/Pressupost";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/pressupost' element={<Pressupost/>}/>
      <Route path='*' element={<div>404</div>}/>
    </Routes>
  </BrowserRouter>
)

export default Router;
