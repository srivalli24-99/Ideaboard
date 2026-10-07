import {Routes, Route}  from 'react-router-dom';
import './pages/Dashboard/Dashboard.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Login from './pages/Login/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import IdeaDetails from './pages/IdeaDetails/IdeaDetails.jsx';
import Ideas from './pages/Ideas/Ideas.jsx';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element = {<Login />} />
        <Route path='/login' element = {<Login />} />
        <Route path='/dashboard' element = {
                          <ProtectedRoute>
                             <Dashboard />
                          </ProtectedRoute>} />
        <Route path='/ideas' element = {
                          <ProtectedRoute>
                             <Ideas/>
                          </ProtectedRoute>} />
        <Route path='/ideas/:id' element = {
                          <ProtectedRoute>
                             <IdeaDetails/>
                          </ProtectedRoute>} />
                                            
      </Routes>
    </div>
  );
}

export default App;
