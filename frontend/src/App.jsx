import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from '/src/components/SignUp';
import SignIn from '/src/components/SignIn';
import UserDashboard from '/src/pages/UserDashboard';
import PageAcceuil from "./pages/PageAcceuil";
import Dashboard from "./pages/Dashboard";
import TimeSlot from "./pages/TimeSlot";
import Landing from "./pages/Landing";
import Booking from "./pages/Booking";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/UserDashboard" element={<UserDashboard />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/TimeSlot" element={<TimeSlot />}/>
                <Route path="/Acceuil" element={<PageAcceuil />} />
                <Route path="/Booking" element={<Booking />} />
            </Routes>
        </Router>
    );
}
export default App;

