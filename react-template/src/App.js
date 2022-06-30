import { BrowserRouter, Routes, Route } from "react-router-dom";
import {routesList} from './routes/routes-list';
import "./assets/css/style.css";
// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {routesList.map((route,index)=>{
            return <Route
              key={index} 
              path={route.path}
              element={route.element}/>
          })}
        </Routes>
      </BrowserRouter>
      {/* <ToastContainer /> */}
    </>
  );
}

export default App;