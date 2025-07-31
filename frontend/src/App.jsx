import "./App.css";
import AdminNavbar from "./components/AdminNavbar";
import UserFormulaire from "./components/UserFormulaire";
import UserNavbar from "./components/UserNavbar";
import UserDashboard from "./pages/UserDashboard";
import Dashboard from "./pages/dashboard";

function App() {
    return (
        <div className="App">
            <header className="navbar">
                {/* <UserNavbar/> */}
                {/* <AdminNavbar/> */}
                {/* <UserDashboard/> */}
            </header>
            <main className="container">
                <UserFormulaire />
                {/* <UserDashboard /> */}
            </main>
        </div>
    );
}

export default App;

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard.jsx";
// import UserDashboard from "./pages/UserDashboard.jsx";

// function App() {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/dashboard" element={<Dashboard />} />
//                 <Route path="/userDashboard" element={<UserDashboard />} />
//             </Routes>
//         </BrowserRouter>
//     );
// }

// export default App;

