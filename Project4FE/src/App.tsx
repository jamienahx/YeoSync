

import {Routes, Route} from 'react-router-dom';
import Dashboard from "./components/Dashboard/Dashboard";
import SignInForm from "./components/SignInForm/SignInForm";
import MemberPage from './components/MemberPage/MemberPage';
import Priority from './components/Priority/Priority';


const App = () => {
return (
  <Routes>

    <Route path = "/" element={<SignInForm/>} />
    <Route path = "/dashboard" element = {<Dashboard />} />
    <Route path ="/members/:memberName" element={<MemberPage />}/>
  <Route path ="/Priority" element={<Priority />}/>
  </Routes>

);

};

export default App;



