

import {Routes, Route} from 'react-router-dom';
import Dashboard from "./components/Dashboard/Dashboard";
import SignInForm from "./components/SignInForm/SignInForm";


const App = () => {
return (
  <Routes>

    <Route path = "/" element={<SignInForm/>} />
    <Route path = "/dashboard" element = {<Dashboard />} />

  </Routes>

);

};

export default App;



