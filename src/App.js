import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import './App.css';
import Footer from './components/Footer';
import 'antd/dist/antd.css';
import Dashboard from './components/pages/Dashboard';
import Rooms from './components/Tables/rooms/Rooms';
import RoomsForm from './components/Tables/rooms/add/RoomsForm';
import Login from './login/LoginForm';
import Users from './components/Tables/users/Users';
import Reserves from './components/Tables/reserves/Reserves';
import ReservesForm from './components/Tables/reserves/add/ReservesForm';

function App() {
  return (
    <>
      {/* <Router> */}
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/login' exact element={<Login />}></Route>
        <Route path='/dashboard' exact element={<Dashboard />} />
        <Route path='/rooms' exact element={<Rooms />}></Route>
        <Route path='/rooms/room/:id' exact element={<Rooms/>}></Route>
        <Route path='/users' exact element={<Users />}></Route>
        <Route path='/roomsform' exact element={<RoomsForm></RoomsForm>}></Route>
        <Route path='/reserves' exact element={<Reserves></Reserves>}></Route>
        <Route path='/reservesform' exact element={<ReservesForm></ReservesForm>}></Route>
      </Routes>
      <Footer />
      {/* </Router> */}
    </>
  );
}

export default App;
