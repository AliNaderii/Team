// tools
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// styles && components
import './App.css';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Project from './pages/project/Project';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Dashboard /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/signup' element={ <Signup /> } />
          <Route path='/create' element={ <Create /> } />
          <Route path='/project/:id' element={ <Project /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
