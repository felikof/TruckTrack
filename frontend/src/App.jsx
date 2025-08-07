import "./App.css";
// import AdminNavbar from "./components/AdminNavbar";
// import SignUp from "./components/SignUp";
// import UserNavbar from "./components/UserNavbar";
// import UserDashboard from "./pages/UserDashboard";
// import Dashboard from "./pages/dashboard";

// function App() {
//     return (
//         <div className="App">
//             <header className="navbar">
//                 {/* <UserNavbar/> */}
//                 {/* <AdminNavbar/> */}
//                 {/* <UserDashboard/> */}
//             </header>
//             <main className="container">
//                 <SignUp />
//                 {/* <UserDashboard /> */}
//             </main>
//         </div>
//     );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from '/src/components/SignUp';
import SignIn from '/src/components/SignIn';
import UserDashboard from '/src/pages/UserDashboard';
import PageAcceuil from "./pages/PageAcceuil";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PageAcceuil />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/UserDashboard" element={<UserDashboard />} />
            </Routes>
        </Router>
    );
}
export default App;

