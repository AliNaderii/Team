// tools
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// styles && components
import './App.css';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Project from './pages/project/Project';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      { authIsReady && (
        <BrowserRouter>
          { user && <Sidebar /> }
          <div className='container'>
            <Navbar />
            <Routes>
              <Route path='/' element={ user ? <Dashboard /> : <Login /> } />
              <Route path='/login' element={ !user ? <Login /> : <Dashboard /> } />
              <Route path='/signup' element={ !user ? <Signup /> : <Dashboard /> } />
              <Route path='/create' element={ user ? <Create /> : <Login /> } />
              <Route path='/project/:id' element={ user ? <Project /> : <Login /> } />
            </Routes>
          </div>
        </BrowserRouter>
      ) }
    </div>
  );
}

export default App;
