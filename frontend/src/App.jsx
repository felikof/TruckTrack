import "./App.css";
// import AdminNavbar from "./components/AdminNavbar";
// import UserFormulaire from "./components/UserFormulaire";
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
//                 <UserFormulaire />
//                 {/* <UserDashboard /> */}
//             </main>
//         </div>
//     );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserFormulaire from '/src/components/UserFormulaire';
import UserDashboard from '/src/pages/UserDashboard';
import PageAcceuil from "./pages/PageAcceuil";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PageAcceuil />} />
                <Route path="/UserDashboard" element={<UserDashboard />} />
            </Routes>
        </Router>
    );
}
export default App;

