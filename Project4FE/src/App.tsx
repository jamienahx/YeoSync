

import {Routes, Route} from 'react-router-dom';
import Dashboard from "./components/Dashboard/Dashboard";
import SignInForm from "./components/SignInForm/SignInForm";
import MemberPage from './components/MemberPage/MemberPage';


const App = () => {
return (
  <Routes>

    <Route path = "/" element={<SignInForm/>} />
    <Route path = "/dashboard" element = {<Dashboard />} />
    <Route path ="/members/:memberName" element={<MemberPage />}/>

  </Routes>

);

};

export default App;



