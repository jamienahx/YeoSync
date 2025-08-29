

import {Routes, Route} from 'react-router-dom';
import Dashboard from "./components/Dashboard/Dashboard";
import SignInForm from "./components/SignInForm/SignInForm";
import MemberPage from './components/MemberPage/MemberPage';
import Priority from './components/Priority/Priority';
import Artiste from './components/Artiste/Artiste';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';



const App = () => {
return (
  <Routes>

    <Route path = "/" element={<SignInForm/>} />

    
    {/* <Route path = "/dashboard" element = {<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path ="/members/:memberName" element={<ProtectedRoute><MemberPage /></ProtectedRoute>}/>
  <Route path ="/Priority" element={<ProtectedRoute><Priority /></ProtectedRoute>}/>
  <Route path ="/Artiste" element={<ProtectedRoute><Artiste /></ProtectedRoute>}/> */}

   <Route path = "/dashboard" element = {<Dashboard />} />
    <Route path ="/members/:memberName" element={<MemberPage />} />
  <Route path ="/Priority" element={<Priority />} />
  <Route path ="/Artiste" element={<Artiste />}/>

  </Routes>

);

};

export default App;



