import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from '/src/components/SignUp';
import SignIn from '/src/components/SignIn';
import UserDashboard from '/src/pages/UserDashboard';
import PageAcceuil from "./pages/PageAcceuil";
import Dashboard from "./pages/Dashboard";
import TimeSlot from "./pages/TimeSlot";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PageAcceuil />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/UserDashboard" element={<UserDashboard />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/TimeSlot" element={<TimeSlot />}/>
            </Routes>
        </Router>
    );
}
export default App;

