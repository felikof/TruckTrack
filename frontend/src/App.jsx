import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from '/src/components/SignUp';
import SignIn from '/src/components/SignIn';
import UserDashboard from '/src/pages/UserDashboard';
import PageAcceuil from "./pages/PageAcceuil";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Booking from "./pages/Booking";
import Book from "./pages/Book";
import AdminSlotCreation from './components/AdminSlotCreation';
import SlotReservation from './components/SlotReservation';
import TruckRegistration from './components/TruckRegistration';
import CarrierRegistration from './components/CarrierRegistration';
import DriverRegistration from './components/DriverRegistration';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/UserDashboard" element={<UserDashboard />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Acceuil" element={<PageAcceuil />} />
                <Route path="/Booking" element={<Booking />} />
                <Route path="/Book.jsx" element={<Book />} />
                <Route path="/Creneau" element={<AdminSlotCreation />} />
                <Route path="/Reserv" element={<SlotReservation />} />
                <Route path="/Truck" element={<TruckRegistration />} />
                <Route path="/Trans" element={<CarrierRegistration />} />
                <Route path="/Driver" element={<DriverRegistration/>}/>
            </Routes>
        </Router>
    );
}
export default App;

