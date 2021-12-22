import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import './App.css';
import Footer from './components/Footer';
import 'antd/dist/antd.css';
import Dashboard from './components/pages/Dashboard';
import Rooms from './rooms/Rooms';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/dashboard' exact element={<Dashboard />} />
          <Route path='/rooms' exact element={<Rooms></Rooms>}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
