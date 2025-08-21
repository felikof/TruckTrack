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
            </Routes>
        </Router>
    );
}
export default App;

