import "./App.css";
import AdminNavbar from "./components/AdminNavbar";
import UserDashboard from "./pages/UserDashboard";
import Dashboard from "./pages/dashboard";

function App() {
    return (
        <div className="App">
            <header className="navbar">
                {/* <AdminNavbar/> */}
                <UserDashboard/>
            </header>
            {/* <main className="container">
                <UserDashboard />
            </main> */}
        </div>
    );
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import UserDashboard from './pages/UserDashboard';

// function App() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/user" element={<UserDashboard />} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;