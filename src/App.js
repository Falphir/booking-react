import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import './App.css';
import Footer from './components/Footer';
import 'antd/dist/antd.css';
import Dashboard from './components/pages/Dashboard';
import RoomDetails from './components/pages/RoomDetails';
import Rooms from './components/Tables/rooms/Rooms';
import RoomsForm from './components/Tables/rooms/add/RoomsForm';
import Login from './login/LoginForm';
import Users from './components/Tables/users/Users';
import Reserves from './components/Tables/reserves/Reserves';
import ReservesForm from './components/Tables/reserves/add/ReservesForm';
import AllRoomsList from './components/Cards/allRoomsList/Rooms';
import SearchRoomsList from './components/Cards/searchRoomsList/Rooms';
import Register from './register/RegisterForm';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/login' exact element={<Login />}></Route>
        <Route path='/register' exact element={<Register />}></Route>
        <Route path='/dashboard' exact element={<Dashboard />} />
        <Route path='/rooms' exact element={<Rooms />}></Route>
        <Route path='/rooms/:roomId' exact element={<RoomDetails />}></Route>
        <Route path='/rooms/search/:description' exact element={<SearchRoomsList />}></Route>
        <Route path='/users' exact element={<Users />}></Route>
        <Route path='/roomsform' exact element={<RoomsForm></RoomsForm>}></Route>
        <Route path='/reserves' exact element={<Reserves></Reserves>}></Route>
        <Route path='/reservesform' exact element={<ReservesForm></ReservesForm>}></Route>
        <Route path='/roomList' exact element={<AllRoomsList></AllRoomsList>}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
